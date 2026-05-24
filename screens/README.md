# Screen Specs — SaaS Delivery Case Flow

---

## 1. Portfolio Dashboard (VP)

**Purpose:** Tells the VP where attention is needed across all active cases.

**Key elements:**
- 4 KPI cards: active cases, contract value at risk, SLA breaches, blockers > 7d
- Cases table sorted by health (red → yellow → green), grouped by IM optional
- Each row shows health dot + reason text inline (not just color)

**Primary action:** Click a case row → Case Detail.

See `../ui/index.html`.

---

## 2. Case Board (IM)

**Purpose:** The IM's daily workspace.

**Key elements:**
- Columns by stage (Kickoff → Discovery → ... → Handoff to CSM)
- Each card: customer name, days-in-stage, health dot, open-blocker count
- Filter: my cases / all cases / by health

**Primary action:** Drag-drop is **disabled**; advancement requires the handoff form.

---

## 3. Case Detail

**Purpose:** Single source of truth for a customer's implementation.

**Key elements:**
- Header: customer, IM, contract value, target go-live, current stage, health + reason
- Tabs: Timeline · Blockers · Notes · Handoffs · Customer Communications · Audit Log
- Right rail: next milestone, projected SLA, share-with-customer button

**Primary action:** Open a blocker / send customer update / advance stage.

---

## 4. Stage Advance Modal

**Purpose:** Enforce the structured handoff.

**Key elements:**
- Renders the handoff form schema for the current stage
- Required fields marked; incomplete fields prevent submission
- Preview pane shows the JSON that will be persisted

**Primary action:** Submit → creates immutable `StageProgress` record.

---

## 5. Blocker Detail

**Purpose:** Track and communicate a single blocker.

**Key elements:**
- Owner (us/customer/third-party), tag, age, description
- Linked Linear/Jira ticket (Phase 4)
- Comments thread (IM + customer if portal enabled)
- Resolution form

**Primary action:** Resolve / re-assign / link ticket.

---

## 6. Customer Read-only Portal (Phase 4)

**Purpose:** A read-only URL the IM can share with the customer.

**Key elements:**
- Current stage + projected go-live
- Open blockers (owner = customer or third-party only; internal blockers hidden)
- Next milestone

**Primary action:** Customer comments on a blocker.

---

## 7. Tenant Admin — Stage Flow Editor (Phase 2)

**Purpose:** Customize the implementation flow per company.

**Key elements:**
- Stages list (reorderable for new flows; locked for in-flight cases)
- Edit SLAs per stage
- Edit handoff form schemas (JSON Schema editor with visual preview)
- Test mode: validate against an active case

**Primary action:** Publish a new stage-flow template version.

---

## 8. QBR Export (Phase 6)

**Purpose:** One-click leadership deliverable.

**Key elements:**
- Cohort time-to-live histogram for selected quarter
- Top 5 blocker tags by total age
- Escalation count + customer NPS for cohort
- Renewal-risk predictor (rules-based v1)

**Primary action:** Download PDF.

---

## Mobile

- Read-only portfolio (VP can scan from a phone)
- Case Detail in read mode with "send Slack message to IM" button
- No authoring on mobile in v1
