# Product Brief — SaaS Delivery Case Flow

## Vision

Make B2B SaaS implementation a measured, predictable, narrate-able phase of the customer lifecycle. Replace the "spreadsheet + Slack pings + tribal memory" status quo with a system of record that surfaces risk before it becomes churn.

## Problem Statement

For most B2B SaaS companies in the $5M–$100M ARR range, the implementation phase between contract-signed and go-live is the highest-risk, lowest-instrumented part of the customer journey.

Three specific failures repeat across companies:

1. **Silent slippage.** A case stalls in "Configuration" for three weeks because the customer's DevOps team is unresponsive. Nobody pages anyone. The go-live date slips by a month.
2. **Lossy handoffs.** Sales told the customer X. Solutions Engineering scoped Y. Implementation built Z. Nobody documents the deltas. The customer notices at UAT and feels lied to.
3. **No portfolio view.** The VP of CS can name the three messiest cases this week, but cannot answer "what's our median time-to-live?" or "what blocker types account for 80% of slippage?"

These are not new problems. They are unsolved because Notion, Jira, Asana, and HubSpot are general tools and the implementation phase is a specific shape.

## Personas

### Dani — Implementation Manager
- 8–15 active cases simultaneously
- Day starts with Slack chaos, ends with status updates
- Pain: spends 90 minutes daily reconstructing case status from threads
- Win: a single board where she can see all 12 of her cases ranked by risk

### Mateo — VP of Customer Success
- Owns delivery + post-go-live success across 4 IMs
- Reports time-to-live, escalations, and renewal risk to the CEO
- Pain: needs to produce a narrative for QBR and it comes from intuition + scattered docs
- Win: portfolio dashboard + auto-generated digest

### Sofia — Customer Success Manager
- Receives accounts at "Handoff to CSM" stage
- Pain: inherits accounts with zero implementation history, repeats questions the customer already answered
- Win: structured handoff payload she can read in 10 minutes

## Jobs to Be Done

| When… | I want to… | So I can… |
|-------|-----------|-----------|
| I open my morning portfolio | see which of my 12 cases need attention today | not be reactive to whoever screams loudest |
| Sales hands me a new deal | get a structured discovery payload | not start from a blank page |
| I report to leadership weekly | auto-generate a digest per customer | not rebuild it manually every Friday |
| A blocker recurs across customers | tag it consistently | identify systemic issues to feed Engineering |
| Time comes to hand off to CSM | hand over structured history | not lose the customer's trust at the seam |

## Differentiation

| Tool | What it does | Why it doesn't solve this |
|------|-------------|---------------------------|
| Notion / Confluence | Free-form docs | No SLA, no health score, no portfolio view |
| Asana / Linear / Jira | Generic project management | Not modeled around customer cases, no handoff fields, no health score |
| HubSpot / Salesforce | CRM pipelines | Sales-shaped, not implementation-shaped; weak on operational detail |
| Custom internal spreadsheet | Cheap, flexible | Reflects, doesn't drive; no automation, no SLAs |
| Tools like Rocketlane / OnRamp | Closest competition; legitimate alternatives | Differentiation lies in opinionated handoffs + AI augmentations in Phase 5+ |

## Success Metrics

| Metric | Target (90 days post-launch) |
|--------|------------------------------|
| Median time-to-live reduction | -20% vs pre-tool baseline |
| % cases hitting target go-live date | +25 pp |
| Blocker mean-age before resolution | -30% |
| IMs reporting "I know my risk daily" (survey) | ≥ 80% |
| QBR prep time for VP | from 2 days → 2 hours |

## Non-Goals

- **Not** a CRM — integrates with Salesforce / HubSpot
- **Not** an engineering ticket system — syncs with Linear / Jira
- **Not** a customer-facing portal in v1 — IMs first
- **Not** a billing system

## Risks & Open Questions

- **Buyer is the VP, daily user is the IM.** Need both happy or adoption fails. Resist VP-only "reporting" features that don't help the IM.
- **Configurable stage flows are a slippery slope.** Each tenant will want a custom flow. Need a strong default and a constrained customization model, not a flow-builder.
- **AI augmentations in Phase 5 must be measurable.** Auto-tagging blockers from call transcripts is only useful if accuracy is >85%; below that, IMs stop trusting it.
