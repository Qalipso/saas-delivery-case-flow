# Roadmap — SaaS Delivery Case Flow

## Phase 0 — Foundations (this repo)
**Outcome:** Product is legible on paper.

- [x] Product brief, personas, JTBD
- [x] Data model, system diagram
- [x] Default stage flow defined (7 stages)
- [x] UI mock of the case board
- [x] Mock cases, blockers, and a sample handoff payload
- [x] Acceptance criteria for Phase 1 features
- [x] Case study

## Phase 1 — Single-tenant MVP (5 weeks)
**Outcome:** One company can run their full implementation in the tool.

- Cases CRUD + assigned IM
- Default 7-stage flow (not yet configurable)
- Structured handoff forms per stage (required to advance)
- Blocker log with owner + tag (no SLA timers yet)
- Internal notes
- Audit log

**Exit criteria:** Pilot company has 3+ active cases in the tool; 100% of stage advances pass through a handoff form.

## Phase 2 — Multi-tenant + configurable flows (4 weeks)
**Outcome:** Sell to multiple companies, each with a tailored stage flow.

- Tenant onboarding flow
- WorkOS SSO
- Stage flow template editor (constrained — add/remove stages, edit SLAs, extend forms)
- Tenant-scoped blocker tag dictionary

**Exit criteria:** 3 paying tenants with non-default flows.

## Phase 3 — SLAs, health score, portfolio dashboard, digest (5 weeks)
**Outcome:** Risk is visible before it becomes churn.

- SLA timers per stage
- Health score (green/yellow/red) with reason text
- VP-facing portfolio dashboard sorted by risk
- Weekly auto-digest per case (Slack + email)
- Slack alerts on breach / new red case

**Exit criteria:** Median time-to-live in pilot tenants improves by ≥ 15%.

## Phase 4 — Engineering blocker sync + customer read-only portal (5 weeks)
**Outcome:** Cross-system blockers stay synced; customers see what's happening.

- Linear + Jira two-way blocker linking
- Customer-facing read-only portal (signed share link per case)
- Customer can comment on blockers and confirm UAT sign-off

**Exit criteria:** 50% of engineering-tagged blockers have a linked Linear/Jira ticket; one tenant activates the customer portal.

## Phase 5 — AI augmentations (4 weeks)
**Outcome:** IMs get back 30+ min/day on routine writeup work.

- Call-transcript ingestion (paste or auto-pull from Gong/Fathom)
- AI auto-tags blockers from transcript
- AI drafts a customer-update email per case (IM reviews and edits)
- AI summarizes a stalled case ("here's why this case has been in Configuration for 3 weeks")

**Exit criteria:** Auto-tag precision > 85%; IM adoption of "draft update" feature > 60%.

## Phase 6 — QBR exports + historical analytics (3 weeks)
**Outcome:** Leadership gets the QBR narrative for free.

- PDF QBR pack: cohort time-to-live, top blocker types, escalation count, NRR predictor inputs
- Blocker pattern library (cross-tenant anonymized; opt-in)

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Stage flow customization explodes scope | Constrain customization upfront; ship strong default; resist a flow-builder UI |
| Buyer-vs-user mismatch | Recruit IM design partners alongside VP buyers from day one |
| AI features adopted before accuracy is high | Don't ship Phase 5 until evals show ≥85% auto-tag precision |
| CRM sync edge cases | Start with one CRM (HubSpot likely) and harden it before adding the second |
