import type { ReactNode } from "react";

/**
 * Native JSX reproductions of the 12-slide deck (B2B-Case-Study-Deck.pptx).
 * Text-only deck with no embedded media, so these are rendered as crisp,
 * theme-aware vector slides instead of raster PNGs. Each slide shares a
 * consistent frame applied by DeckCarousel; here we only supply the content.
 *
 * To swap in real exported PNGs later, drop files at public/deck/slide-N.png
 * and set `image` on the slide; DeckCarousel will prefer the image when present.
 */

export type DeckSlide = {
  id: number;
  eyebrow: string;
  title: string;
  body: ReactNode;
  image?: string; // optional: /deck/slide-N.png
};

const tileGrid = "grid gap-3 sm:grid-cols-2";
const stat =
  "rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-4 py-3";
const statValue = "text-2xl font-semibold tracking-tight text-[var(--ink)]";
const statLabel = "mt-0.5 text-xs text-[var(--ink-faint)]";
const chip =
  "rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--ink-soft)]";
const lead = "text-[var(--ink-soft)] leading-relaxed";
const h3 =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)]";

function Stat({ v, l }: { v: string; l: string }) {
  return (
    <div className={stat}>
      <div className={statValue}>{v}</div>
      <div className={statLabel}>{l}</div>
    </div>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium text-[var(--ink-soft)]">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span className="rounded-lg border border-[var(--hairline)] bg-[var(--surface)] px-2.5 py-1">
            {s}
          </span>
          {i < steps.length - 1 && (
            <span className="text-[var(--ink-faint)]">→</span>
          )}
        </span>
      ))}
    </div>
  );
}

export const deckSlides: DeckSlide[] = [
  {
    id: 1,
    eyebrow: "B2B Case Study",
    title: "Underwriting & Insurance Portal Platform",
    body: (
      <div className="space-y-4">
        <p className="text-lg text-[var(--ink)]">Developer → Senior Team Lead</p>
        <p className={lead}>
          Built from zero · legacy migration · ownership moved to a child company.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className={chip}>Wonderland Inc. (anonymized)</span>
          <span className={chip}>Fintech · Underwriting</span>
          <span className={chip}>$100M+ risk portfolio</span>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    eyebrow: "01 · Summary",
    title: "What this was, and what I owned",
    body: (
      <div className="space-y-4">
        <p className={lead}>
          Helped build a B2B underwriting portal from zero — migrating a legacy
          monolith to a modern, container-based platform. I directly owned the
          configuration team and delivery flow while coordinating up to ~30
          cross-functional contributors and the client.
        </p>
        <div className={tileGrid}>
          <Stat v="3 → 10+" l="config team size" />
          <Stat v="~30" l="cross-functional contributors" />
          <Stat v="~4 mo" l="for 3 portals vs ~6 est." />
          <Stat v="20+" l="candidates interviewed" />
        </div>
        <p className="text-sm text-[var(--ink-faint)]">
          Headline: a three-portal request scoped at ~6 months shipped to
          production in ~4 months by restructuring it as a parent/child parallel
          build.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    eyebrow: "02 · Context & problem",
    title: "Migrate, re-architect, and hand to a child company",
    body: (
      <div className="space-y-4">
        <ol className="space-y-2 text-sm text-[var(--ink-soft)]">
          <li>1 · Risk workflow — digitize the insurance-record lifecycle end to end</li>
          <li>2 · Documents — generate & print policy and supporting documents</li>
          <li>3 · Billing & reports — handle bank billing and reporting</li>
          <li>4 · Secure storage — store data securely under compliance constraints</li>
          <li>5 · Fast deploy — repeatable, predictable deployment</li>
        </ol>
        <div>
          <div className={h3}>Constraints</div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={chip}>Legacy monolith to re-platform</span>
            <span className={chip}>Regulated insurance data [confirm]</span>
            <span className={chip}>Ownership → child company</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    eyebrow: "03 · Leadership scope",
    title: "What I ran, coordinated, and shaped",
    body: (
      <div className="space-y-3">
        <div>
          <div className={h3}>Direct ownership</div>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            Config team · delivery flow · blockers · onboarding · config quality · estimates
          </p>
        </div>
        <div>
          <div className={h3}>Cross-functional coordination</div>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            QA · BA · Dev · DevOps · PM · client stakeholders
          </p>
        </div>
        <div>
          <div className={h3}>Influence, not ownership</div>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            Architecture · dev timeline · release planning · UX / product
          </p>
        </div>
        <p className="text-sm text-[var(--ink-faint)]">
          Architecture sits under influence — I advocated and shaped the calls;
          they weren't solely mine.
        </p>
      </div>
    ),
  },
  {
    id: 5,
    eyebrow: "04 · Technical approach",
    title: "The stack, and what 'configuration' meant",
    body: (
      <div className="space-y-4">
        <div>
          <div className={h3}>Stack & tooling</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              "TypeScript — front-end",
              "C# / .NET — back-end · REST",
              "Azure-managed · SQL",
              "Azure DevOps — Boards · Repos · Pipelines",
              "Kubernetes — deploy & security",
              "Internal config tooling · Wiki",
            ].map((s) => (
              <span key={s} className={chip}>
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className={h3}>What "configuration" covered</div>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            A discipline in its own right, not setup after the fact: workflow
            states · underwriting rules · form fields · document templates · user
            roles · permission sets · environment configs · business rules ·
            billing/reporting maps · approval thresholds.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    eyebrow: "05 · Architecture — C4 container view",
    title: "An isolated security service governs every environment",
    body: (
      <div className="space-y-3">
        <p className={lead}>
          Web SPA → API service (C# / .NET) as the hub, delegating to document
          generation, billing, and reporting. A deliberately isolated Admin &
          Security service holds roles, permissions, and security settings with
          its own schema; every API request runs an authorization check there.
        </p>
        <p className="text-sm text-[var(--ink-faint)]">
          Decision class: influence (advocated during the define phase). Payoff:
          manage access across environments without touching the full database —
          smaller blast radius.
        </p>
      </div>
    ),
  },
  {
    id: 7,
    eyebrow: "06 · Delivery process · Ideate → Deploy",
    title: "The flow I owned end to end",
    body: (
      <div className="space-y-4">
        <Flow
          steps={[
            "Stakeholder alignment",
            "Team definition",
            "Backlog & planning",
            "Sprint loop 2–4 wk",
            "Deploy",
          ]}
        />
        <div>
          <div className={h3}>Build order</div>
          <Flow
            steps={[
              "Core: schemas · workflow · attachments",
              "Key features",
              "Bugs & showstoppers",
              "Cosmetic UX/UI",
            ]}
          />
        </div>
        <p className="text-sm text-[var(--ink-faint)]">
          Front-load the risky, dependency-heavy work; let low-risk polish be the
          thing that can safely slip.
        </p>
      </div>
    ),
  },
  {
    id: 8,
    eyebrow: "07 · User flow · risk-record lifecycle",
    title: "From submission to a bound policy",
    body: (
      <div className="space-y-4">
        <Flow
          steps={[
            "Submit + docs",
            "Validate & store",
            "Triage & assess",
            "Price / rate",
            "Decision",
            "Sign-off",
            "Bind + docs + billing",
          ]}
        />
        <div>
          <div className={h3}>Role branching</div>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            Regular user — submit & view own records · Portal admin — approve
            referrals & high-value risks · Super admin — cross-portal config,
            security, environments.
          </p>
        </div>
        <p className="text-sm text-[var(--ink-faint)]">
          North star: time-to-first-bound-policy. Each step emits an event
          (risk_submitted → policy_bound) laddering up to activation & adoption.
        </p>
      </div>
    ),
  },
  {
    id: 9,
    eyebrow: "08 · Outcomes",
    title: "Directional where exact figures are confidential",
    body: (
      <div className="space-y-4">
        <div className={tileGrid}>
          <Stat v="~4 mo" l="3 portals delivered (vs ~6 est.)" />
          <Stat v="3 → 1" l="portals merged into one shared lineage" />
        </div>
        <ul className="space-y-1.5 text-sm text-[var(--ink-soft)]">
          <li>Release predictability via runbook + branch-lock discipline.</li>
          <li>Reduced dependency chaos by consolidating the discussion.</li>
          <li>Fewer repeat onboarding questions via Wiki + interactive docs.</li>
        </ul>
        <p className="text-sm text-[var(--ink-faint)]">
          Still to add (even as ranges): velocity · lead time · deploy frequency ·
          defect rate · adoption · retention · ramp time.
        </p>
      </div>
    ),
  },
  {
    id: 10,
    eyebrow: "09 · Stakeholder alignment",
    title: "Holding three competing forces in balance",
    body: (
      <div className="space-y-4">
        <p className={lead}>
          The hardest part was not the technical complexity — it was managing
          three competing forces at once.
        </p>
        <div className={tileGrid}>
          <Stat v="Client" l="scope changes mid-cycle" />
          <Stat v="Management" l="timeline pressure; needs proof of progress" />
          <Stat v="Delivery team" l="stable requirements, fewer calls" />
        </div>
        <p className="text-sm text-[var(--ink-faint)]">
          Operating principle: translate ideas into options with dependencies and
          safety-margin estimates; lock scope on client + management approval. The
          end-of-sprint demo is management's recurring proof of progress.
        </p>
      </div>
    ),
  },
  {
    id: 11,
    eyebrow: "10 · People & cadence",
    title: "How the team was built and how it ran",
    body: (
      <div className="space-y-3">
        <div>
          <div className={h3}>Hiring — 20+ interviewed, multinational</div>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            HR interview → technical (cognitive, reasoning, language, quiz,
            adaptive task) → candidate review & calibration.
          </p>
        </div>
        <div>
          <div className={h3}>Onboarding</div>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            Basics docs & Wiki · responsibilities matrix · AI-built interactive
            guide for self-serve ramp. Goal: first PR in week one.
          </p>
        </div>
        <div>
          <div className={h3}>Agile cadence</div>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            2-week sprints · mid-sprint refinement · async daily + blocker call ·
            demo as proof of progress · retro as the key addition.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 12,
    eyebrow: "Reflection",
    title: "A leadership decision, not just a technical one",
    body: (
      <div className="space-y-4">
        <p className={lead}>
          Spotting structural overlap between "separate" requests early — and
          consolidating the conversation around shared components — beat running
          them as independent tracks.
        </p>
        <p className="text-[var(--ink)]">
          That single call turned ~6 months of sequential work into ~4 months of
          parallel delivery.
        </p>
        <p className="text-sm text-[var(--ink-faint)]">
          Developer → Senior Team Lead · B2B Underwriting Portal Platform
        </p>
      </div>
    ),
  },
];
