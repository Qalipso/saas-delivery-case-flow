# Acceptance Criteria — SaaS Delivery Case Flow

Gherkin-style. Phase tags map to `roadmap.md`.

---

## Feature: Case Creation [Phase 1–2]

```gherkin
Scenario: Auto-create case from CRM Closed-Won
  Given a HubSpot opportunity transitions to "Closed-Won"
  And a webhook subscription is configured for our tenant
  When the webhook fires
  Then a Case is created with status "draft"
  And the assigned IM is set to the user mapped to the HubSpot owner
  And the assigned IM is notified in Slack to complete kickoff

Scenario: Cannot create case without target go-live date
  Given I am the IM completing the kickoff form
  When I leave "target_go_live_date" empty and submit
  Then submission fails
  And the form highlights "target_go_live_date is required"
```

---

## Feature: Structured Handoff [Phase 1]

```gherkin
Scenario: Advance stage requires complete handoff form
  Given a case is in "Discovery" stage
  And the discovery handoff form has 6 required fields
  When the IM marks the case as ready to advance and 1 field is empty
  Then advancement is blocked
  And the empty field is highlighted
  And no StageProgress transition is created

Scenario: Stage advance creates an immutable handoff record
  Given a case is in "Configuration" stage
  And all handoff fields are complete
  When the IM advances the case to "UAT"
  Then a StageProgress row is finalized for "Configuration"
  And its handoff_form_json is persisted and cannot be edited afterward
```

---

## Feature: Blocker Log [Phase 1]

```gherkin
Scenario: Open a blocker with owner and tag
  Given I am on a case detail page
  When I open a new blocker with owner="customer", tag="data-not-provided", description="ERP export pending"
  Then the blocker appears in the case's open blockers list
  And the case's open_blocker_count increments

Scenario: Reject blocker with no tag
  When I attempt to open a blocker without selecting a tag
  Then submission fails
  And the form says "blocker tag is required"
```

---

## Feature: SLA Timers and Health Score [Phase 3]

```gherkin
Scenario: SLA breach turns case yellow then red
  Given the "Configuration" stage has SLA = 14 days
  And a case has been in "Configuration" for 11 days with no resolution in sight
  When the health-score job runs
  Then the case is set to yellow
  And the reason is "Configuration SLA projected to breach in 3 days"

Scenario: Resolved blocker improves health
  Given a case is yellow because of a 6-day-old open blocker
  When the blocker is resolved
  And the next health-score job runs
  Then the case is set back to green if no other risk factors exist
  And an audit event records the score change with the reason
```

---

## Feature: Portfolio Dashboard [Phase 3]

```gherkin
Scenario: VP filters by IM and risk
  Given I am a VP user
  When I open the portfolio dashboard
  And I filter by IM="Dani" and health="red"
  Then I see only red cases assigned to Dani
  And the URL preserves the filter state

Scenario: Default sort is by risk descending
  Given the portfolio has cases of all health colors
  When the VP opens the portfolio
  Then red cases appear first
  Then yellow cases
  Then green cases
  And cases of equal health are sorted by oldest unresolved blocker
```

---

## Feature: Weekly Digest [Phase 3]

```gherkin
Scenario: Weekly digest per case is posted Mondays 09:00
  Given digest is enabled for my tenant
  When Monday 09:00 local time arrives
  Then the assigned IM receives a Slack DM with a digest for each of their active cases
  And the digest includes: stage, days-in-stage, open blockers, projected SLA, next milestone

Scenario: Digest skips finalized cases
  Given a case is in stage "Handoff to CSM" with no open blockers
  And the case is older than 30 days post go-live
  When the digest job runs
  Then this case is excluded from the IM's digest
```

---

## Feature: Customer Portal (read-only) [Phase 4]

```gherkin
Scenario: Generate a customer share link
  Given I am the IM on case "Acme Corp"
  When I click "Share with customer"
  Then a signed URL is generated with a 60-day TTL
  And the URL renders a read-only view: current stage, open blockers (owner-filtered), next milestone

Scenario: Customer comments on a blocker
  Given a customer is viewing the read-only portal for their case
  When they leave a comment on a blocker
  Then the comment is appended (not editing the blocker)
  And the IM is notified in Slack
  And an audit event is created
```

---

## Feature: AI Auto-Tag Blockers from Transcript [Phase 5]

```gherkin
Scenario: Tag suggestions from call transcript
  Given an IM uploads a call transcript to a case
  When the AI service processes it
  Then suggested blockers are surfaced with:
    - description (verbatim quote or summary)
    - suggested tag (from tenant dictionary)
    - confidence score
  And the IM must accept or reject each suggestion before it becomes a real blocker

Scenario: Reject low-confidence suggestions
  Given the AI suggests a blocker with confidence < 0.6
  When the suggestion is rendered
  Then it is visually de-emphasized
  And it is excluded from any auto-acceptance flow if the tenant enables one
```

---

## Non-Functional Acceptance

- **Performance:** Portfolio dashboard loads in <600ms p95 with up to 500 active cases per tenant.
- **Auditability:** Every state-changing action writes an immutable AuditEvent (actor, action, before/after, timestamp).
- **Security:** Customer share links use signed URLs with TTL; revocable by the IM at any time.
- **Recoverability:** Soft-delete on cases with 30-day grace period; admin can restore.
- **Multi-tenancy:** No cross-tenant data exposure verified by integration test suite running on every PR.
