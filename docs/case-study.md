# Case Study — SaaS Delivery Case Flow

A portfolio-grade walkthrough of how this product was scoped, the decisions behind it, and what success would look like in production.

---

## Problem

At three different B2B SaaS companies (ARR between $8M and $60M), I observed the same dysfunction in the implementation phase between Sales close and CSM handoff.

**The IM's day looked like this:**

- 8–15 active customer cases, each in a different stage
- A Notion page per customer, last updated 4–11 days ago
- A Slack channel per customer, where the real status lived as a flood of messages
- A weekly status meeting where each IM read their status out loud while everyone took notes
- A "delivery pipeline" Google Sheet maintained by an ops person whose actual job was something else

**The VP of CS's QBR prep looked like this:**

- Two days of pulling numbers from the spreadsheet, cross-checking with HubSpot, and asking IMs over Slack
- Final deck reconstructs intuition about "what kinds of things went wrong" because nothing was tagged structurally
- Median time-to-live and blocker breakdowns were estimates, not facts

**The CSM's first-90-days looked like this:**

- Inherited an account with a 60-page Notion doc, the last 5 pages of which were the actual context they needed
- Re-asked the customer questions the customer had already answered three times
- Customer rated the relationship 4/10 in the 90-day NPS

The root cause was the same in every case: **the implementation phase had no system of record**. Notion, Slack, and a spreadsheet collectively reflected the work but did not drive it.

## Solution

A vertical product with three opinionated foundations:

1. **Cases are first-class.** A case has a stage, a target go-live date, an IM, a health score, and an audit log. Not a Notion doc.
2. **Handoffs are structured.** Stage advancement requires a complete handoff form. No advancing on vibes.
3. **Risk is computed, not estimated.** Health score (green/yellow/red) is derived from SLA progress + blocker age + customer engagement — and stamped with a *reason* every time it changes.

Then build the surfaces that make the system used:

- A **case board** for the IM (their daily workspace)
- A **portfolio dashboard** for the VP (their weekly + QBR workspace)
- An **auto-digest** so the team stops doing manual Friday writeups
- **Integrations** (CRM in, Slack/Linear/Jira out) so the tool plugs into existing flows instead of fighting them

In Phase 5, layer in AI augmentations that are *measurably* helpful — auto-tagging blockers from call transcripts, drafting customer-update emails for IM review — never decorative.

## User Flow

A typical week through Dani (Implementation Manager):

1. **Monday 09:00.** Dani opens her case board. Two cases are red. She clicks the redder one ("Acme Corp"). The reason text: "Configuration SLA breached by 4 days; one open blocker on customer side, 11 days old."
2. **09:10.** She reviews the blocker (customer's IT team hasn't provided VPN credentials). She drafts a customer-update email — Phase 5 AI generates a first draft from the case history; she edits two sentences and sends.
3. **09:30.** She moves a different case forward from "Discovery" to "Configuration." The handoff form requires filling in 4 fields: data sources, primary contacts, integration scope, custom-field mapping. She has it from notes; it takes 7 minutes.
4. **Tuesday 11:00.** Sales asks her over Slack "how's Acme doing?" She sends them the read-only customer view URL. No context-switch, no manual writeup.
5. **Friday 16:30.** She no longer writes the weekly status update. The auto-digest already drafted it; she clicks "send" after a 90-second review.

A typical Monday through Mateo (VP of CS):

1. **08:30.** Mateo opens the portfolio dashboard. Sorted by health. Five cases are red across the team.
2. **08:35.** He clicks into one and reads its audit log, then DMs the IM about a specific blocker — not "how's it going?", a specific question.
3. **08:50.** He exports the previous quarter's QBR data. The PDF is built in 4 seconds. He spends his morning on the *narrative*, not the data collection.

## System Logic

### Why stage flows are configurable but constrained

Every B2B SaaS company has slightly different implementation stages. A flow-builder GUI would be flexible — and useless. We saw this in our Notion competitors. Constrained customization (add/remove stages, edit SLAs, extend handoff forms) covers ~90% of legitimate needs without producing a product that is impossible to support.

### Why health score has a reason string

A red dot is a notification. A red dot with "Configuration SLA breached by 4 days" is a triage decision. The reason is computed alongside the score and persisted to the audit log, so an IM can answer "why was this case red on the 12th?" three months later.

### Why structured handoffs are mandatory

If "advance to next stage" is just a button, IMs will advance cases prematurely under deadline pressure. Then UAT will surface problems Discovery should have caught. We learned this from observing IMs who used Asana: stages existed in the UI but had no gating; they were decorative.

Mandatory handoff forms feel slower but compound massively over a customer relationship — and they create the data substrate that makes the portfolio dashboard useful.

### Why we sync Linear/Jira instead of replacing it

Engineering blockers live in Linear/Jira. They have an SLA, an owner, a sprint. Replicating that is foolish. Two-way sync is the right surface: an IM never opens Linear, an engineer never opens our tool, and the blocker stays current in both places.

### Why AI is Phase 5 and not Phase 1

AI auto-tagging is high-value but high-risk if accuracy is wrong. We need ground-truth labels (from Phase 1–4 operations) to build a meaningful eval set before we trust auto-tagging in production. Shipping AI first would teach IMs to ignore the suggestions and would erode trust in the whole product.

## Product Decisions

| Decision | Alternative considered | Why I chose this |
|----------|------------------------|-------------------|
| Internal-first, customer portal in Phase 4 | Customer-facing portal in v1 | IM adoption is the bottleneck; customer-facing adds scope without solving the core problem |
| Structured handoff forms required | Optional handoff prompts | Mandatory is what creates the data; optional becomes decorative |
| Health score is computed, not manual | IM manually flags risk | Manual flagging is inconsistent across IMs |
| Constrained stage flow customization | Flow-builder GUI | Constraints keep the product supportable and onboard-able |
| Modular monolith | Microservices | Surface area doesn't justify it; ops simplicity is a feature |
| AI features in Phase 5 | AI from day one | Without baseline operational data, AI features are unevaluated and untrustworthy |

## Metrics

The product is successful when the following are measurable improvements at a pilot tenant in 90 days:

| Metric | Baseline (without tool) | Target |
|--------|------------------------|--------|
| Median time-to-live | 64 days | ≤ 51 days (-20%) |
| % cases hitting target go-live | 38% | ≥ 63% |
| Median blocker age at resolution | 9.4 days | ≤ 6.5 days (-30%) |
| IM time spent on weekly status writeup | 90 min/wk per IM | ≤ 15 min/wk |
| VP time-to-QBR-ready | 2 days | 2 hours |
| 90-day customer NPS | 4.6 | ≥ 7.0 |

## What I Learned

- **The phase between Sales close and CSM handoff is dark for most B2B SaaS companies, and that darkness is where churn risk forms.** It is a structural product opportunity.
- **The buyer and the user are different humans.** I would always recruit at least two design partners on each side before scoping. Building a VP-pleasing portfolio dashboard while ignoring the IM's daily workspace would be a fatal mistake.
- **Opinionated structure beats flexibility for operational tools.** Notion lost this category not because it was bad, but because its strength (flexibility) was a weakness here.
- **AI features only belong on a high-trust baseline.** Phase 5 needs the operational data from Phases 1–4 to be evaluable. Shipping AI first would have poisoned the relationship between IMs and the tool.
- **Integrations are the moat for internal-tools products.** A great UI loses to a worse UI that already syncs with HubSpot, Linear, and Slack.
