# SaaS Delivery Case Flow

> An operational system for B2B SaaS implementation teams. Tracks each customer's journey from contract-signed to go-live as a structured "case" with stages, SLA timers, handoffs, blockers, and a health score.

---

## Project Overview

SaaS Delivery Case Flow is a vertical project-management product built specifically for the gap between Sales and Customer Success: **implementation, onboarding, and go-live**. It models every customer's onboarding as a "case" that progresses through a defined stage flow, with per-stage SLAs, structured blockers, and explicit handoff moments between Sales, Solutions Engineering, Implementation, and CSM.

Most B2B SaaS companies run this critical phase in Notion, Asana, Jira, or a Google Sheet with carefully colored cells. None of these tools model SLAs, none of them detect when a handoff has stalled, and none of them produce the deliverability narrative that leadership actually needs at QBR.

This product is the system of record for that phase — the operational layer where contracts become revenue.

## Problem

When a B2B SaaS contract is signed, three things start happening at once:

1. **The customer's clock starts.** They expect the value they were sold, on the timeline they were promised.
2. **The internal handoff begins.** Sales transfers context to Solutions; Solutions transfers to Implementation; Implementation transfers to CSM. Each handoff is a place where context is lost.
3. **The Implementation Manager (IM) has no good tool.** They juggle 8–15 active cases, each in a different stage, each with its own blockers, each with its own customer stakeholders.

The result is the universal B2B SaaS pattern:

- Go-live dates slip silently. Nobody knows until the customer escalates.
- A specific class of blockers (the customer's IT team is unresponsive, the customer's data is dirty, a third-party integration is unstable) recurs across every implementation. Nobody captures the pattern.
- At QBR, leadership asks "what's the average time-to-live?" and the answer comes from someone's memory and a half-finished spreadsheet.

## Target Users

- **Implementation Managers (IM)** — own the case end-to-end; primary daily user
- **VP of Customer Success / Head of Delivery** — owns the portfolio view, reports to the CEO
- **Solutions Engineers** — feed structured context at handoff and answer technical blockers
- **Customer Success Managers (CSM)** — receive the case at go-live with full history intact
- **Sales / AE** — secondary user, gets visibility into "is my customer happy" without disrupting the IM

## Core Features

| Feature | Description |
|---------|-------------|
| Case Board | Kanban-style stage flow per customer (Kickoff → Discovery → Configuration → UAT → Go-Live → Hypercare → Handoff to CSM) |
| Stage SLAs | Configurable per-stage SLA; system surfaces breaches in real time, not at end-of-quarter |
| Structured Handoffs | A case can only advance when the previous stage's handoff form is complete (no free-form "looks good") |
| Blocker Log | Every blocker has owner (us / customer / third-party), root cause tag, and age |
| Health Score | Green / Yellow / Red computed from SLA progress + blocker age + customer engagement signals |
| Portfolio Dashboard | All active cases for a delivery manager or VP, sorted by risk |
| Weekly Digest | Auto-generated narrative per customer: stage, blockers, SLA status, what's next |
| QBR Report Export | One-click PDF of historical time-to-live, blocker patterns, and outcome metrics |

## Technical / Product Scope

**Stack (intended):**
- Next.js 15 + tRPC + Prisma + Postgres
- Inngest for SLA timer jobs + digest scheduling
- Resend for transactional emails to customers
- Slack + email integrations for blocker notifications
- Linear and Jira sync for engineering-side blockers

**Product scope decisions:**
- Stages and handoff fields are **per-tenant configurable**. Every SaaS company has a slightly different flow.
- The product is **opinionated about structure** — free-form notes exist, but cannot replace stage handoff data.
- Customer-facing: the product is internal-first. A read-only customer portal is a Phase 4 nice-to-have, not the core.

## Portfolio Value

This project demonstrates expertise across three roles that often blur together at growing SaaS companies:

- **SaaS Delivery Manager** — operational understanding of how implementations actually fail
- **Technical PM for an internal-tool surface** — comfortable scoping a system of record, not just a feature
- **AI Product Builder for B2B operations** — clear thesis for where AI augments the IM (auto-summarize calls, auto-tag blockers, draft customer updates) without replacing the IM's judgement

## What This Project Proves

- I can model an end-to-end business process as a structured product, not a free-form workflow.
- I understand the operational reality of B2B SaaS — that the "implementation" stage is where churn risk is forged.
- I can scope an opinionated product (structured handoffs, mandatory blocker tags) without lapsing into Notion-style flexibility.
- I can plan a clear AI layer (Phase 5+) that augments humans on real, measurable tasks instead of being decorative.

## Future Roadmap

| Phase | Outcome |
|-------|---------|
| 0 | Schema, stage flow, UI mock (current state in this repo) |
| 1 | Single-tenant MVP: cases + stages + handoffs + blockers (manual entry) |
| 2 | Multi-tenant + configurable stage flow per company |
| 3 | SLA timers, health score, portfolio dashboard, weekly digest |
| 4 | Engineering blocker sync (Linear/Jira); customer-facing read-only portal |
| 5 | AI augmentations: auto-tag blockers from call transcripts, draft customer-update emails |
| 6 | QBR exports + historical analytics (cohort time-to-live, blocker pattern library) |

## Repository Layout

```
saas-delivery-case-flow/
├── README.md
├── product-brief.md
├── architecture.md
├── roadmap.md
├── acceptance-criteria.md
├── docs/
│   └── case-study.md
├── mock-data/
├── ui/
├── screens/
└── diagrams/
```
