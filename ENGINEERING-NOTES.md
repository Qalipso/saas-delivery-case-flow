# Engineering Notes — SaaS Delivery Case Flow

Key technical decisions, trade-offs, and architectural reasoning. Intended for technical interviews and engineering review.

---

## Stack

| Layer | Choice | Alternatives considered |
|-------|--------|------------------------|
| Framework | Next.js 15 App Router | Remix |
| Language | TypeScript 5 | — |
| Data | Static JSON mock-data | Postgres |
| Styling | Inline styles (no CSS framework) | Tailwind |
| Deployment | Vercel | — |
| Pages | 18 static (generateStaticParams) | SSR |

---

## Key Technical Decisions

### 1. Static generation for all 18 routes

**Decision:** All routes use `generateStaticParams` + static data loading. No server-rendered routes, no API calls at runtime.

**Rationale:** Mock data is fixed at build time. Pre-rendering every page as a static HTML + JS chunk eliminates cold starts and makes the demo load in < 100ms anywhere in the world. The cases list, case detail, pipeline kanban, stage drill-down, and QBR report are all read-only views over static data — there is no reason to involve a server per request.

**`generateStaticParams` pattern:**
```typescript
// app/cases/[id]/page.tsx
export async function generateStaticParams() {
  const { allCases } = require("../../lib/data");
  return allCases.map((c: { id: string }) => ({ id: c.id }));
}
```

**Note:** `require()` was used instead of `import` because `generateStaticParams` runs in the Node.js static analysis phase before module resolution is complete for ESM imports in some Next.js 15 edge cases. `require()` is synchronous and always available in Node.js. This is a known workaround, not a pattern to copy into new code.

**Trade-off:** Any new case requires a rebuild. Acceptable for a static portfolio demo. The production version would use ISR (revalidate on demand after a write) or full SSR for the case board (the IM's primary workspace, which changes many times a day).

---

### 2. Mock data structure mirrors the production domain model

**Decision:** `lib/data.ts` defines typed interfaces (`Case`, `Blocker`, `Stage`, `StageFlow`) and accessor functions (`getCase`, `getBlockersForCase`, `getCasesInStage`). JSON files in `mock-data/` follow these exact types.

**Rationale:** Demonstrating a case management product requires demonstrating the data complexity: health scores with reason strings, blockers with owner attribution and age tracking, stages with SLA definitions and handoff schemas. Flattening this to "simple mock data" would obscure the product's core value. The typed interfaces are also the design document — they specify what the production data model looks like.

**Accessor function example:**
```typescript
export function getCase(id: string): Case | undefined {
  return allCases.find((c) => c.id === id);
}

export function getCasesInStage(stageName: string): Case[] {
  return allCases.filter((c) => c.current_stage === stageName);
}
```

Accessor functions are pure, composable, and directly replaceable with database queries. The page components call `getCase(params.id)` — the same call would work against a real `CaseRepository`.

---

### 3. Computed health color from health score (no magic strings in components)

**Decision:** `healthColor(score: HealthScore)` and `healthBg(score: HealthScore)` utility functions in `lib/data.ts` map `"green" | "yellow" | "red"` to hex color strings. Components call these functions, never hardcode colors.

**Rationale:** Health color is a business rule: `green = on track`, `yellow = at risk`, `red = breached`. If colors are hardcoded as strings in components, changing the yellow threshold from 80% to 70% SLA requires finding every JSX element that renders a yellow badge. Centralizing the mapping means changing business rules in one place.

**Production extension:** In production, health score would be computed server-side (or via a DB trigger) from `(days_in_stage / sla_days, open_blocker_age, last_customer_contact_age)` and stored with a `health_reason` string. The same `healthColor` function applies.

---

### 4. No CSS framework — inline styles throughout

**Decision:** All styling uses React's `style` prop with inline objects. No Tailwind, no CSS Modules, no styled-components.

**Rationale:** This is a portfolio case management UI, not a design system showcase. Inline styles are self-contained, immediately readable, and require no build step. For a reviewer reading the source, every component's appearance is visible without consulting a stylesheet or a utility class dictionary.

**Trade-off:** Inline styles do not support pseudo-classes (`:hover`, `:focus`), media queries, or CSS animations. For the current portfolio scope (no interactive hover states, no responsive breakpoints needed), this is acceptable. The production version would use Tailwind for utilities and a component library (shadcn/ui) for accessible interactive elements.

---

### 5. Pipeline view as sorted column groups, not a database query

**Decision:** The pipeline kanban view groups cases by `current_stage` and sorts by `health_score` (red first). This is done in-memory from `allCases`, not from a database GROUP BY.

**Implementation:**
```typescript
const byStage = stageFlow.stages.reduce((acc, stage) => {
  acc[stage.name] = getCasesInStage(stage.name).sort((a, b) =>
    stageIndex(b.health_score) - stageIndex(a.health_score)
  );
  return acc;
}, {} as Record<string, Case[]>);
```

**Rationale:** With 10 mock cases, in-memory grouping is instantaneous. The logic is easier to read and test than a complex SQL GROUP BY + ORDER BY.

**Production equivalent:**
```sql
SELECT * FROM cases
WHERE tenant_id = $1
ORDER BY
  CASE current_stage WHEN 'Discovery' THEN 0 ... END,
  CASE health_score WHEN 'red' THEN 0 WHEN 'yellow' THEN 1 WHEN 'green' THEN 2 END;
```

The `stageIndex` TypeScript function maps to the same ORDER BY CASE expression.

---

### 6. Vercel project isolation fix

**Problem:** Multiple Next.js projects in the same monorepo (each under `project-name/app/`) were all linking to the same Vercel project ("app") because each `app/` directory previously had a `.vercel/project.json` pointing to the same project ID.

**Fix:** Deleted `.vercel/` from each `app/` directory. Ran `vercel --name project-name` from each `app/` directory. Vercel created a new project per tool.

**Lesson:** `vercel link` writes `project.json` to the current directory. If multiple directories were previously linked to the same project (e.g., from a single initial deploy), you must delete `.vercel/` before re-linking to create a new project. The `--name` flag is deprecated but still causes Vercel to search for an existing project by name — delete `.vercel/` first to force creation of a new project.

---

## Domain Model Highlights

### Health score is not a number, it is a categorical label with a reason

```typescript
type HealthScore = "green" | "yellow" | "red";

type Case = {
  health_score: HealthScore;
  health_reason: string;  // e.g., "Configuration SLA breached by 4 days; 2 open blockers"
};
```

The reason is what makes the health score actionable. A red dot with no reason is a notification. A red dot with "SLA breached by 4 days" is a triage decision.

### Blockers are owned and aged

```typescript
type Blocker = {
  owner: "customer" | "us";
  tag: BlockerTag;           // "technical" | "data" | "approval" | "resourcing" | "other"
  age_days: number;
  resolved_at: string | null;
};
```

`owner` enables the QBR breakdown: "of our open blockers, 60% are waiting on the customer and 40% are internal." `age_days` enables SLA tracking: blockers older than the stage SLA are highlighted in red.

---

## What I Would Add for Production

1. **Real-time updates.** Case health recalculates when a blocker's `age_days` crosses the stage SLA. Use a Postgres trigger + Supabase Realtime to push updates to the UI without polling.
2. **Stage advancement gating.** The handoff form schema in `Stage.handoff_form_schema` defines required fields. The "advance" button is disabled until the form is complete. This is the structural change that makes the product opinionated rather than decorative.
3. **Audit log per case.** Every stage change, health change, and blocker event is an immutable row in `case_events`. The case detail page shows a timeline.
4. **Linear/Jira sync.** Blockers tagged `technical` sync to Linear issues via webhook. Two-way: resolving in Linear marks the blocker resolved here. IMs never need to open Linear.
5. **Auto-digest.** Weekly job: for each case, generate a status summary from the audit log using Claude. IM reviews + edits + sends. 7-minute task instead of 90-minute task.
