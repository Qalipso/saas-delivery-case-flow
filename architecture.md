# Architecture — SaaS Delivery Case Flow

## System Overview

```
   ┌──────────────────┐
   │  Salesforce /    │──┐
   │  HubSpot (CRM)   │  │ webhook on Closed-Won
   └──────────────────┘  │
                         ▼
                  ┌──────────────┐
                  │   Web App    │
                  │  Next.js +   │◀── IM, VP, CSM users
                  │     tRPC     │
                  └──────┬───────┘
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
 ┌──────────┐    ┌───────────────┐   ┌──────────┐
 │ Postgres │    │ Inngest jobs  │   │ Resend   │
 └──────────┘    │ (SLA timers,  │   │ (email)  │
                 │  digests)     │   └──────────┘
                 └───────┬───────┘
                         │
              ┌──────────┼───────────┐
              ▼          ▼           ▼
        ┌────────┐ ┌──────────┐ ┌──────────┐
        │ Slack  │ │ Linear / │ │  AI Svc  │
        │ alerts │ │   Jira   │ │ (Phase 5)│
        └────────┘ └──────────┘ └──────────┘
```

## Components

| Component | Responsibility |
|-----------|---------------|
| Web app | Case board, case detail, portfolio, settings |
| Postgres | Cases, stages, handoffs, blockers, users, tenants, audit log |
| Inngest | Scheduled SLA checks, weekly digests, blocker-age escalations |
| Resend | Customer-facing email (when IM clicks "send customer update") |
| Slack | Internal notifications: SLA breach, new blocker, stage advance |
| CRM sync | Inbound: contract signed → auto-create case; outbound: case status → CRM custom field |
| Linear/Jira sync | Two-way blocker linking when blocker is engineering-side |
| AI service (Phase 5) | Call-transcript ingestion → auto-tag blockers + draft customer update |

## Data Model

```
Tenant ──< User
Tenant ──< StageFlowTemplate ──< StageDefinition
Tenant ──< BlockerTagDictionary
Tenant ──< Case
  Case.crm_opportunity_id          → external ref
  Case.customer_company             → display name
  Case.contract_value_usd
  Case.target_go_live_date
  Case.actual_go_live_date          (nullable)
  Case.current_stage_id             → StageDefinition
  Case.health_score                 → enum {green, yellow, red}
  Case.assigned_im_id               → User

Case ──< StageProgress              (one per stage the case has entered)
  StageProgress.entered_at
  StageProgress.exited_at           (nullable)
  StageProgress.sla_breached        boolean
  StageProgress.handoff_form_json   JSONB

Case ──< Blocker
  Blocker.owner                     → enum {us, customer, third_party}
  Blocker.tag                       → from BlockerTagDictionary
  Blocker.opened_at, resolved_at
  Blocker.linked_ticket_url         (Linear/Jira)
  Blocker.description

Case ──< CustomerUpdate             (emails sent to the customer)
Case ──< InternalNote
Case ──< AuditEvent                 (immutable log)
```

### Stage flow template

A stage flow template is the per-tenant configurable shape of the journey. The default template has 7 stages, each with:
- `name` (e.g., "Configuration")
- `sla_days` (e.g., 14)
- `handoff_form_schema` (JSON Schema describing required fields to advance)
- `required_role` (who can advance the case from this stage)

A tenant can add stages, remove stages, change SLAs, and extend handoff forms — but cannot reorder default stages without re-validating in-flight cases. This constraint is intentional.

### Health score logic

A case's `health_score` is computed every 30 minutes by an Inngest job:

```
green:  no open blockers > 5 days old AND no SLA breach in current stage
yellow: any blocker > 5 days old OR projected SLA breach within 3 days
red:    SLA breached OR blocker > 14 days old OR customer non-response > 10 days
```

The thresholds are tenant-configurable. The job writes the score + the *reason* (so the UI shows "Red because Configuration SLA breached by 4 days," not just "Red").

## Service Boundaries

Modular monolith. Three logical layers:

- **Case layer** — pure CRUD on cases, stages, handoffs, blockers
- **Automation layer** — Inngest jobs, integrations, AI service
- **Reporting layer** — read-only views over the case layer for the VP dashboard and QBR exports

The automation layer never mutates state directly; it always goes through the case-layer API. This keeps audit logs consistent.

## Integrations

### CRM webhook (Salesforce + HubSpot)

A `Closed-Won` opportunity webhook creates a draft case with `crm_opportunity_id` and basic fields. The IM completes the kickoff form before the case becomes "active."

### Linear / Jira (Phase 4)

When a blocker is tagged `engineering-issue`, the IM can optionally link/create a Linear or Jira ticket. The integration keeps status in sync. Closing the ticket auto-resolves the blocker if the IM enables that policy per tenant.

### Slack (always-on)

- DM the IM on SLA breach
- Post to a tenant-configurable channel on stage advance / case red

## Multi-Tenancy

- WorkOS SSO + tenant scoping
- Every queryable row carries `tenant_id`
- Prisma middleware injects `tenant_id` from the session
- Audit log retention: 18 months (compliance default)

## What Is Deliberately Simple

- No microservices
- No graph DB
- No real-time presence (Phase 6 if requested)
- No flow-builder GUI; stage flows are managed via tenant admin form with constrained customization

## Observability

- Sentry on the web layer
- Inngest job dashboards for the automation layer
- Audit log is queryable by tenant admins via the UI (not just Postgres)
