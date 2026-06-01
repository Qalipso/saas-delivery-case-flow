/**
 * Single source of truth for the B2B Underwriting Portal case study page.
 * All copy, metrics, and Mermaid diagram strings live here so the page/components
 * stay declarative. Anonymized ("Wonderland Inc.") per the source brief.
 *
 * Wording guardrail: architecture is "influenced/advocated"; delivery & config are
 * "owned"; people work is "coordinated". Do not overclaim architecture ownership.
 *
 * Confidential gaps are marked {/* TODO: real metric *\/} at the usage site.
 */

import { asset } from "@/lib/base";

export type Metric = {
  value: string;
  label: string;
  note?: string;
};

export type NavItem = { id: string; label: string };

export type OwnershipBucket = {
  key: string;
  title: string;
  tone: "owned" | "coordinated" | "influence" | "delegated";
  blurb: string;
  items: string[];
};

export type TimelineStage = {
  n: string;
  title: string;
  desc: string;
  detail: string;
};

export type Persona = {
  persona: string;
  who: string;
  authority: string;
};

export type JourneyStep = {
  step: string;
  goal: string;
  friction: string;
  response: string;
};

export const nav: NavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "ownership", label: "Role & ownership" },
  { id: "decision", label: "Key decision" },
  { id: "process", label: "Delivery process" },
  { id: "architecture", label: "Architecture" },
  { id: "userflow", label: "User flow" },
  { id: "people", label: "People" },
  { id: "outcomes", label: "Outcomes" },
  { id: "onboarding", label: "Onboarding hub" },
  { id: "deck", label: "Deck appendix" },
  { id: "resources", label: "Resources" },
];

export const hero = {
  kicker: "B2B Case Study · Fintech / Underwriting",
  title: "B2B Underwriting Portal Platform",
  subtitle:
    "Legacy migration, delivery leadership, and parent/child portal build for an insurance underwriting platform.",
  trajectory: "Developer → Senior Team Lead",
  tags: [
    "Legacy migration",
    "Delivery leadership",
    "Insurance / underwriting",
    "Configuration ownership",
    "Kubernetes platform",
    "$100M+ risk portfolio",
  ],
  meta: "Wonderland Inc. (anonymized) · built from zero · ownership moved to a child company",
};

export const metrics: Metric[] = [
  { value: "3 → 10+", label: "Config team size", note: "grown and led" },
  { value: "~30", label: "Cross-functional contributors", note: "coordinated" },
  { value: "~4 mo", label: "3 portals to production", note: "vs ~6 estimated" },
  { value: "20+", label: "Candidates interviewed", note: "multinational" },
  { value: "1", label: "Interactive onboarding hub", note: "built for self-serve ramp" },
];

export const context = {
  lede:
    "Legacy underwriting monolith, migrated and re-architected while ownership transferred to a child company. New platform built from zero against a parent reference. Configuration and development run as separate disciplines.",
  requirements: [
    {
      title: "Risk workflow",
      desc: "Digitize the insurance-record (risk) lifecycle end to end.",
    },
    {
      title: "Documents",
      desc: "Generate and print policy and supporting documents.",
    },
    { title: "Billing & reports", desc: "Handle bank billing and reporting." },
    {
      title: "Secure storage",
      desc: "Store data securely under compliance constraints.",
    },
    { title: "Fast deploy", desc: "Repeatable, predictable deployment." },
  ],
  constraints: [
    { label: "Legacy system", value: "monolith to migrate and re-platform" },
    { label: "Compliance", value: "regulated insurance data" },
    { label: "Ownership transfer", value: "platform moving to a child company" },
  ],
};

export const ownership: OwnershipBucket[] = [
  {
    key: "direct",
    title: "Direct ownership",
    tone: "owned",
    blurb: "What I ran outright.",
    items: [
      "Config team",
      "Delivery flow",
      "Blockers",
      "Onboarding",
      "Config quality",
      "Estimates",
      "Sprint planning",
    ],
  },
  {
    key: "coordinated",
    title: "Cross-functional coordination",
    tone: "coordinated",
    blurb: "Aligned and unblocked without managing as direct reports.",
    items: ["QA", "BA", "Dev", "DevOps", "PM", "Client stakeholders"],
  },
  {
    key: "influence",
    title: "Influence, not ownership",
    tone: "influence",
    blurb: "Advocated and shaped; the final calls were not solely mine.",
    items: ["Architecture (define phase)", "Dev timeline", "Release planning", "UX / product"],
  },
  {
    key: "delegated",
    title: "Delegated",
    tone: "delegated",
    blurb: "Owned by others, by design.",
    items: ["Backlog creation (BA)", "Schedule + team billing (PM)", "Notifications / reports (PM)"],
  },
];

export const decision = {
  headline: "Parent/child parallel build",
  classification: "Owned — delivery decision",
  body: [
    "Late request to build three portals. Sequential delivery was scoped at ~6 months.",
    "Two of the three were structurally the same product. Restructured as a parent plus one independent portal first, then built the child on the parent's base.",
    "All three kept in a single discussion thread so QA, BA, dev, and management concentrated on shared components rather than three separate tracks.",
  ],
  result: "~4 months to production instead of an estimated ~6.",
  contrast: { estimated: "~6 months", delivered: "~4 months" },
  estimateSource: "PM, QA, and original project plan estimates.",
  codeFreeze: "3 months",
};

export const timeline: TimelineStage[] = [
  {
    n: "1",
    title: "Stakeholder alignment",
    desc: "scope · estimates · budget · resources",
    detail: "Day-1 scope locked only on client + management approval.",
  },
  {
    n: "2",
    title: "Team definition",
    desc: "current state, then best-fit setup",
    detail: "Ramp order: BA + Architect → DevOps → Dev → QA.",
  },
  {
    n: "3",
    title: "Backlog & sprint planning",
    desc: "2 sprints planned + dependencies mapped",
    detail: "Estimate review and approval; dependencies identified up front.",
  },
  {
    n: "4",
    title: "Sprint loop · 2–4 weeks",
    desc: "Refined → In Progress → QA → UAT → Done",
    detail: "Last sprint tested in parallel while the new one runs; branch lock on sign-off.",
  },
  {
    n: "5",
    title: "Deploy",
    desc: "runbook · smoke test · confirmation",
    detail: "Ordered tasks with responsible + accountable owners, then live.",
  },
];

export const buildOrder: string[] = [
  "Core: schemas · workflow · attachments",
  "Key features",
  "Bugs & showstoppers",
  "Cosmetic UX / UI",
];

export const buildOrderNote =
  "Front-load the risky, dependency-heavy work; let low-risk polish be the thing that can safely slip.";

// Mermaid C4 container view — kept verbatim from C4-Architecture-Underwriting-Portal.md.
export const mermaidC4 = `flowchart TB
    RU["Regular user<br/><i>underwriter / broker</i><br/>[Person]"]
    PA["Portal admin<br/><i>Leads, BA</i><br/>[Person]"]
    SAdm["Super admin<br/><i>PM, Senior DevOps, Lead</i><br/>[Person]"]

    subgraph BND["Underwriting Portal Platform — Kubernetes"]
        SPA["Web SPA<br/>[Container: TypeScript]<br/>portal UI · risk submission · dashboards"]
        API["Application / API service<br/>[Container: C# / .NET]<br/>risk workflow · pricing · decisions"]
        DOC["Document generation<br/>[Container: .NET]<br/>policy &amp; print documents"]
        BILL["Billing integration<br/>[Container: .NET]<br/>bank billing &amp; invoicing"]
        REP["Reporting<br/>[Container: .NET]<br/>reports &amp; analytics export"]
        SEC["Admin &amp; Security service<br/>[Container: ISOLATED · multi-env]<br/>roles · permissions · security settings"]
        DB[("Data store<br/>[Azure-managed SQL / storage]<br/>risk records · documents · secure data")]
    end

    BANK["Bank / billing provider<br/>[External system]"]
    LEG["Legacy system<br/>[External — migration source]"]

    RU -->|HTTPS| SPA
    PA -->|HTTPS| SPA
    SAdm -->|manage roles &amp; env security| SEC
    SPA -->|JSON / HTTPS| API
    API -->|authorization check| SEC
    API -->|read / write risk records| DB
    API -->|generate docs| DOC
    API -->|trigger billing| BILL
    API -->|build reports| REP
    SEC -->|owns isolated security schema| DB
    BILL -->|settlement / invoicing| BANK
    LEG -.->|data migration| API

    classDef person fill:#1f6feb,stroke:#0d419d,color:#ffffff;
    classDef container fill:#e8f0fe,stroke:#1f6feb,color:#0b2447;
    classDef secure fill:#fde7e9,stroke:#d1242f,color:#5c0011,stroke-width:2px;
    classDef store fill:#fff8e1,stroke:#b08800,color:#5c4400;
    classDef ext fill:#eef1f4,stroke:#6e7781,color:#24292f;

    class RU,PA,SAdm person;
    class SPA,API,DOC,BILL,REP container;
    class SEC secure;
    class DB store;
    class BANK,LEG ext;`;

// Level 1 — System Context (from Architecture-Appendix-C4.md).
export const mermaidC4Context = `flowchart TB
    RU["Regular user<br/><i>underwriter / broker</i>"]
    PA["Portal admin<br/><i>Leads, BA</i>"]
    SA["Super admin<br/><i>PM, Senior DevOps, Lead</i>"]

    SYS["<b>Underwriting Portal Platform</b><br/>[Software System]<br/>risk submission to bound policy<br/>documents · billing · reporting"]

    BANK["Bank / billing provider<br/>[External system]"]
    LEG["Legacy system<br/>[External · migration source]"]

    RU --> SYS
    PA --> SYS
    SA --> SYS
    SYS -->|billing &amp; settlement| BANK
    LEG -.->|one-way data migration| SYS

    classDef person fill:#1f6feb,stroke:#0d419d,color:#fff;
    classDef sys fill:#16365C,stroke:#0F2742,color:#fff;
    classDef ext fill:#eef1f4,stroke:#6e7781,color:#24292f;
    class RU,PA,SA person;
    class SYS sys;
    class BANK,LEG ext;`;

// Level 3 — Component zoom on the isolated Admin & Security service.
export const mermaidC4Component = `flowchart TB
    API["Application / API service<br/>[Container]"]
    SADM["Super admin<br/>[Person]"]

    subgraph SEC["Admin &amp; Security service — isolated container"]
        AUTHZ["Authorization API<br/>[Component: .NET]<br/>per-request permission checks"]
        ROLE["Role &amp; permission manager<br/>[Component: .NET]<br/>roles, permission sets, approval thresholds"]
        ENVR["Environment config resolver<br/>[Component: .NET]<br/>per-environment security settings"]
        AUDIT["Audit logger<br/>[Component: .NET]<br/>access &amp; change trail"]
        SSTORE[("Security schema<br/>[isolated store]<br/>roles · permissions · env config")]
    end

    API -->|"authz check (every request)"| AUTHZ
    SADM -->|manage roles &amp; env security| ROLE
    AUTHZ -->|resolve scope| ENVR
    AUTHZ -->|read permissions| SSTORE
    ROLE -->|read / write| SSTORE
    ENVR -->|read settings| SSTORE
    AUTHZ -->|log decision| AUDIT
    ROLE -->|log change| AUDIT

    classDef person fill:#1f6feb,stroke:#0d419d,color:#fff;
    classDef ext fill:#e8f0fe,stroke:#1f6feb,color:#0b2447;
    classDef comp fill:#fde7e9,stroke:#d1242f,color:#5c0011;
    classDef store fill:#fff8e1,stroke:#b08800,color:#5c4400;
    class SADM person;
    class API ext;
    class AUTHZ,ROLE,ENVR,AUDIT comp;
    class SSTORE store;`;

// Factual descriptions per C4 level.
export const c4Levels = [
  {
    id: "context",
    label: "L1 · Context",
    caption: "Level 1 — System Context",
    note: "3 personas, 2 external edges: settlement with the bank, one-way migration from the legacy system.",
  },
  {
    id: "containers",
    label: "L2 · Containers",
    caption: "Level 2 — Containers (Kubernetes)",
    note: "API service is the hub. Doc gen, billing, reporting are focused containers. Admin & Security is isolated; every API request authorizes against it.",
  },
  {
    id: "components",
    label: "L3 · Components",
    caption: "Level 3 — Admin & Security service",
    note: "Authorization API is the single entry point. Role manager is the only writer. Env resolver applies per-environment settings. Isolated security schema holds all access state.",
  },
];

export const architecture = {
  decisionLine:
    "Decision class: influence (advocated during the define phase). Payoff: manage access across environments without touching the full database — smaller blast radius.",
  reading: [
    "Three personas, three authority levels. Regular users and portal admins reach the platform through the Web SPA; the super admin operates directly against the security service.",
    "The Admin & Security service is deliberately isolated. Every API request runs an authorization check against it, and it owns its own security schema inside the data store.",
    "The .NET application service is the hub — it orchestrates the risk workflow and delegates to focused containers for document generation, billing, and reporting.",
    "External edges are the bank/billing provider (settlement) and the legacy system (one-directional migration source).",
  ],
};

// Mermaid risk-record lifecycle — adapted from B2B-Case-Study §6.
export const mermaidUserFlow = `flowchart TD
    subgraph U["Regular user · broker / underwriter"]
        S1["Start risk submission"] --> S2["Enter insured details and exposures"]
        S2 --> S3["Upload supporting documents"]
    end
    S3 --> V["System: validate · store securely · issue reference"]
    V --> T["Triage and assign to underwriter"]
    T --> AS["Underwriting assessment<br/>review exposures, pull data"]
    AS --> Q{"Information complete?"}
    Q -- no --> RI["Request more info"]
    RI --> AS
    Q -- yes --> PR["Pricing / rating"]
    PR --> DEC{"Decision"}
    DEC -- decline --> DC["Notify and close record"]
    DEC -- approve / refer --> AP

    subgraph A["Portal admin · approver"]
        AP{"High value or referral?"}
        AP -- yes --> SO["Senior sign-off"]
        AP -- no --> AUTO["Auto-authority bind"]
    end
    SO --> BIND["Bind / issue policy"]
    AUTO --> BIND
    BIND --> DG["Generate policy documents"]
    DG --> BILL["Configure bank billing"]
    BILL --> REP["Reporting and secure storage"]

    subgraph SA["Super admin · security and environments"]
        CFG["Roles, permissions, security settings<br/>isolated container, multi-environment"]
    end
    CFG -. governs access .-> U
    CFG -. governs access .-> A`;

export const personas: Persona[] = [
  {
    persona: "Regular user",
    who: "underwriter / broker",
    authority: "submit and view own risk records",
  },
  {
    persona: "Portal admin",
    who: "Leads, BA",
    authority: "approve referrals & high-value risks, configure workflow",
  },
  {
    persona: "Super admin",
    who: "PM, Senior DevOps, Lead (me)",
    authority: "cross-portal config, security settings, environments",
  },
];

export const journey: JourneyStep[] = [
  {
    step: "Submit",
    goal: "get a risk into the system fast",
    friction: "re-keying data from other systems",
    response: "inline validation, auto-reference",
  },
  {
    step: "Wait for assessment",
    goal: "know it's moving",
    friction: "silence = anxiety",
    response: "status + ETA visibility",
  },
  {
    step: "Respond to info request",
    goal: "clear the blocker",
    friction: "unclear what's missing",
    response: "specific, itemized request",
  },
  {
    step: "Decision",
    goal: "get a yes",
    friction: "a decline with no reason",
    response: "reason codes + next steps",
  },
  {
    step: "Bind & docs",
    goal: "issue the policy",
    friction: "manual document chasing",
    response: "one-click generation + billing setup",
  },
];

export const northStar = {
  metric: "Time-to-first-bound-policy",
  blurb:
    "Each step emits an event (risk_submitted → policy_bound) laddering up to activation and adoption — including % of config changes self-served by admins with no dev ticket, which ties directly to the isolated-admin-container decision.",
};

export const people = {
  hiring: {
    headline: "20+ interviewed · multinational",
    stages: [
      "HR interview",
      "Technical — cognitive, reasoning, language, quiz, adaptive task",
      "Candidate review & calibration",
    ],
  },
  onboarding: {
    items: [
      "Basics documentation & Wiki",
      "Responsibilities (RACI) matrix",
      "AI-built interactive guide (sectioned, icon-based) for self-serve ramp",
    ],
    goal: "First PR in week one — we measure time-to-first-PR, not lines of code.",
  },
  cadence: [
    { ritual: "Sprint length", note: "2 weeks — tighter feedback than 4-week" },
    { ritual: "Backlog refinement", note: "mid-sprint — keeps planning short" },
    { ritual: "Daily", note: "async board update + 15-min blocker-only call" },
    { ritual: "Review / demo", note: "end of sprint — management's proof of progress" },
    { ritual: "Retrospective", note: "every sprint — where improvements come from" },
    { ritual: "Scrum-of-scrums", note: "weekly — cross-team dependency sync" },
  ],
};

export const stakeholders = {
  quote:
    "The hardest part was not the technical complexity — it was managing three competing forces at once: client scope changes, management timeline pressure, and the team's need for stable requirements.",
  forces: [
    {
      party: "Client",
      tension: "Scope changes",
      detail: "adds and shifts requirements mid-cycle",
    },
    {
      party: "Management",
      tension: "Timeline pressure",
      detail: "aggressive estimates; needs continuous proof of progress",
    },
    {
      party: "Delivery team",
      tension: "Stable requirements",
      detail: "clear plan, fewer calls, fewer mid-cycle changes",
    },
  ],
  principle:
    "Translate client ideas into options with dependencies and safety-margin estimates. Lock scope on client + management approval. Team runs ahead → pull items in; sprint overloaded → push to next.",
};

export const outcomes = {
  scope: [
    "Config team grew from 3 to 10+; coordinated up to ~30 cross-functional contributors.",
    "3 portals shipped in ~4 months vs ~6 estimated.",
    "Interviewed 20+ candidates across multiple nationalities.",
  ],
  delivery: [
    "Improved release predictability — fewer slipped deploys via the runbook + branch-lock discipline.",
    "Reduced dependency chaos by merging three portals into one shared lineage.",
    "Cut repetitive onboarding questions through the Wiki + interactive documentation.",
  ],
  // Confidential / still-to-add directional figures live behind TODO markers in the JSX.
  pending: [
    "velocity",
    "lead time",
    "deploy frequency",
    "defect rate",
    "adoption",
    "retention",
    "ramp time",
  ],
  reflection:
    "Identifying structural overlap between three \u201Cseparate\u201D portal requests, and consolidating them around shared components, reduced scope from ~6 months sequential to ~4 months parallel. A delivery/leadership decision, not solely a technical one.",
};

export type OutcomeMetric = {
  label: string;
  before: string;
  after: string;
  mechanism?: string;
};

export const outcomesMetrics: OutcomeMetric[] = [
  {
    label: "Deploy frequency",
    before: "1 per 2 months",
    after: "2/mo",
    mechanism: "Runbook + branch-lock + release notes",
  },
  {
    label: "Defects per sprint",
    before: "~100",
    after: "~10",
    mechanism: "Parallel testing + regression + unit testing + internal review process",
  },
  {
    label: "Cycle time",
    before: "4 weeks",
    after: "1–2 weeks",
    mechanism: "Branch-lock + parallel QA (1 week for expedited items)",
  },
  {
    label: "Manual work reduction",
    before: "baseline",
    after: "-50%",
  },
  {
    label: "Time-to-first-PR (new hire)",
    before: "weeks",
    after: "~3 days",
    mechanism: "Interactive onboarding hub + structured ramp",
  },
  {
    label: "Team retention",
    before: "",
    after: "85.7%",
  },
  {
    label: "Weekly active users",
    before: "30",
    after: "110",
  },
  {
    label: "Policies bound",
    before: "10",
    after: "100",
  },
];

export const onboardingDemo = {
  title: "Interactive onboarding hub",
  blurb:
    "An AI-built, icon-based guide so new joiners self-serve their first weeks: start-here, knowledge base, responsibilities matrix, stack, environments, 30·60·90 ramp, rituals, team, and glossary. Embedded live below.",
  src: asset("/onboarding-hub.html"),
};
