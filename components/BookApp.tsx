"use client";

import BookViewer, { PageDef } from "./BookViewer";
import OwnershipMatrix from "./OwnershipMatrix";
import DeliveryTimeline from "./DeliveryTimeline";
import C4Tabs from "./C4Tabs";
import MermaidDiagram from "./MermaidDiagram";
import Zoomable from "./Zoomable";
import OnboardingDemo from "./OnboardingDemo";
import ResourcesBlock from "./ResourcesBlock";
import { Download } from "lucide-react";
import { asset } from "@/lib/base";
import {
  hero,
  metrics,
  context,
  decision,
  personas,
  journey,
  northStar,
  people,
  stakeholders,
  outcomes,
  outcomesMetrics,
  mermaidUserFlow,
} from "@/content/underwriting-portal";

/* ── tone colours (light theme, used inside white page) ── */
const tone: Record<string, string> = {
  owned:       "text-emerald-700 bg-emerald-50 border-emerald-200",
  coordinated: "text-blue-700   bg-blue-50   border-blue-200",
  influence:   "text-amber-700  bg-amber-50  border-amber-200",
  delegated:   "text-slate-600  bg-slate-50  border-slate-200",
};

/* ════════════════════════  PAGE CONTENT COMPONENTS  ════════════════════════ */

function CoverContent() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {hero.kicker}
        </p>
        <span className="inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/8 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
          {hero.trajectory}
        </span>
        <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{hero.subtitle}</p>
        <p className="text-[11px] text-[var(--ink-faint)]">{hero.meta}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {hero.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] text-[var(--ink-soft)]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3.5"
          >
            <div className="text-xl font-bold tracking-tight text-[var(--ink)]">{m.value}</div>
            <div className="mt-0.5 text-[11px] font-medium text-[var(--ink-soft)]">{m.label}</div>
            {m.note && <div className="text-[10px] text-[var(--ink-faint)]">{m.note}</div>}
          </div>
        ))}
      </div>

      <blockquote className="rounded-xl border-l-4 border-[var(--accent)] bg-[var(--surface)] p-4 text-sm italic leading-relaxed text-[var(--ink-soft)]">
        Senior Team Lead: grew the config team 3 → 10+, coordinated ~30 contributors, and cut
        a three-portal delivery from ~6 to ~4 months with one structural decision.
      </blockquote>
    </div>
  );
}

function ContextContent() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{context.lede}</p>

      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)]">
          Requirements
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {context.requirements.map((r) => (
            <li
              key={r.title}
              className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3"
            >
              <div className="text-sm font-semibold text-[var(--ink)]">{r.title}</div>
              <div className="mt-0.5 text-xs text-[var(--ink-soft)]">{r.desc}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)]">
          Constraints
        </p>
        <dl className="space-y-1.5">
          {context.constraints.map((c) => (
            <div key={c.label} className="flex flex-wrap gap-x-2 text-sm">
              <dt className="font-medium text-[var(--ink)]">{c.label}:</dt>
              <dd className="text-[var(--ink-soft)]">{c.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function OwnershipContent() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
        Developer to Senior Team Lead. Team 3 to ~30 across two teams. Owned: config team,
        delivery flow. Coordinated: QA, BA, Dev, DevOps, PM, client. Influenced: architecture,
        timeline, release planning.
      </p>
      <OwnershipMatrix />
    </div>
  );
}

function DecisionContent() {
  return (
    <div className="space-y-4">
      <span className="inline-block rounded-full border border-[var(--accent-2)]/40 bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--accent-2)]">
        {decision.classification}
      </span>

      {decision.body.map((p) => (
        <p key={p.slice(0, 20)} className="text-sm leading-relaxed text-[var(--ink-soft)]">
          {p}
        </p>
      ))}

      <div className="flex items-stretch gap-3">
        <div className="flex-1 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4 text-center">
          <div className="text-xs text-[var(--ink-faint)]">Estimated</div>
          <div className="mt-1 text-2xl font-semibold text-[var(--ink-soft)] line-through decoration-red-400/60">
            {decision.contrast.estimated}
          </div>
        </div>
        <div className="flex items-center text-[var(--ink-faint)]">→</div>
        <div className="flex-1 rounded-xl border border-[var(--accent-2)]/40 bg-[var(--surface)] p-4 text-center">
          <div className="text-xs text-[var(--ink-faint)]">Delivered</div>
          <div className="mt-1 text-2xl font-semibold text-[var(--accent-2)]">
            {decision.contrast.delivered}
          </div>
        </div>
      </div>

      <p className="text-sm font-medium text-[var(--ink)]">{decision.result}</p>
      <p className="text-sm text-[var(--ink-soft)]">
        Estimate source: {decision.estimateSource} Code freeze at month {decision.codeFreeze}.
      </p>
    </div>
  );
}

function ProcessContent() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--ink-soft)]">
        Five stages, Ideate to Deploy. Build order front-loads dependency-heavy work; cosmetic UI
        last.
      </p>
      <DeliveryTimeline />
    </div>
  );
}

function ArchitectureContent() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--ink-soft)]">
        Isolated Admin &amp; Security container governs access across every environment. Modeled as
        C4 (Structurizr DSL).
      </p>
      <C4Tabs />
    </div>
  );
}

function UserFlowContent() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-[var(--ink-soft)]">
        Risk record from submission to bound policy. Role-gated at each step. Isolated security
        layer governs access.
      </p>
      <Zoomable label="Zoom user-flow diagram">
        <MermaidDiagram
          chart={mermaidUserFlow}
          caption="Risk-record lifecycle with role branching"
        />
      </Zoomable>

      <div className="overflow-x-auto rounded-xl border border-[var(--hairline)]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--hairline)] text-[var(--ink-faint)]">
              <th className="px-3 py-2 font-medium">Persona</th>
              <th className="px-3 py-2 font-medium">Who</th>
              <th className="px-3 py-2 font-medium">Authority</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((p) => (
              <tr key={p.persona} className="border-b border-[var(--hairline)] last:border-0">
                <td className="px-3 py-2 font-medium text-[var(--ink)]">{p.persona}</td>
                <td className="px-3 py-2 text-[var(--ink-soft)]">{p.who}</td>
                <td className="px-3 py-2 text-[var(--ink-soft)]">{p.authority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--surface)] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          North star
        </p>
        <p className="mt-1 text-sm font-semibold text-[var(--ink)]">{northStar.metric}</p>
        <p className="mt-1 text-xs text-[var(--ink-soft)]">{northStar.blurb}</p>
      </div>
    </div>
  );
}

function PeopleContent() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold text-[var(--ink)]">
            Hiring — {people.hiring.headline}
          </p>
          <ol className="mt-2 space-y-1 text-xs text-[var(--ink-soft)]">
            {people.hiring.stages.map((s, i) => (
              <li key={s}>
                <span className="text-[var(--accent)]">{i + 1}.</span> {s}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold text-[var(--ink)]">Onboarding</p>
          <ul className="mt-2 space-y-1 text-xs text-[var(--ink-soft)]">
            {people.onboarding.items.map((it) => (
              <li key={it} className="flex gap-1.5">
                <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-[var(--accent-2)]" />
                {it}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[10px] italic text-[var(--ink-faint)]">{people.onboarding.goal}</p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)]">
          Agile cadence
        </p>
        <dl className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {people.cadence.map((c) => (
            <div key={c.ritual} className="flex gap-2 text-xs">
              <dt className="font-medium text-[var(--ink)]">{c.ritual}:</dt>
              <dd className="text-[var(--ink-soft)]">{c.note}</dd>
            </div>
          ))}
        </dl>
      </div>

      <figure className="rounded-xl border-l-2 border-[var(--accent)] bg-[var(--surface)] p-4">
        <blockquote className="text-xs italic leading-relaxed text-[var(--ink-soft)]">
          {stakeholders.quote}
        </blockquote>
        <figcaption className="mt-3 text-[10px] text-[var(--ink-faint)]">
          {stakeholders.principle}
        </figcaption>
      </figure>
    </div>
  );
}

function OutcomesContent() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold text-[var(--ink)]">Scope &amp; scale</p>
          <ul className="mt-2 space-y-1.5">
            {outcomes.scope.map((s) => (
              <li key={s.slice(0, 20)} className="flex gap-2 text-xs text-[var(--ink-soft)]">
                <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-[var(--accent)]" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold text-[var(--ink)]">Delivery &amp; quality</p>
          <ul className="mt-2 space-y-1.5">
            {outcomes.delivery.map((s) => (
              <li key={s.slice(0, 20)} className="flex gap-2 text-xs text-[var(--ink-soft)]">
                <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-[var(--accent-2)]" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)]">
          Metrics · directional
        </p>
        <dl className="grid gap-2.5 sm:grid-cols-2">
          {outcomesMetrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-[var(--hairline)] bg-[var(--bg-elev)] p-3"
            >
              <dt className="text-[10px] font-medium text-[var(--ink-faint)]">{m.label}</dt>
              <dd className="mt-1 flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                {m.before && (
                  <>
                    <span className="text-[var(--ink-soft)] line-through">
                      {m.before}
                    </span>
                    <span className="text-[var(--ink-faint)]">→</span>
                  </>
                )}
                <span className="text-[var(--accent-2)]">{m.after}</span>
              </dd>
              {m.mechanism && (
                <dd className="mt-0.5 text-[10px] text-[var(--ink-faint)]">{m.mechanism}</dd>
              )}
            </div>
          ))}
        </dl>
      </div>

      <figure className="rounded-xl border-l-2 border-[var(--accent-2)] bg-[var(--surface)] p-4">
        <blockquote className="text-sm leading-relaxed text-[var(--ink)]">
          {outcomes.reflection}
        </blockquote>
      </figure>
    </div>
  );
}

function EnablementContent() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--ink-soft)]">
        Prototype internal-style guide — illustrates the onboarding system built for the team.
        First PR target: day 3.
      </p>
      <OnboardingDemo />
    </div>
  );
}

function AppendixContent() {
  return (
    <div className="space-y-5">
      <a
        href={asset("/resources/underwriting-case-deck.pdf")}
        download
        className="inline-flex items-center gap-2 rounded-xl border border-[var(--accent)]/40 bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)]"
      >
        <Download className="h-4 w-4 text-[var(--accent)]" />
        Download deck (PDF · 12 slides)
      </a>
      <ResourcesBlock />
    </div>
  );
}

/* ════════════════════════  PAGE DEFINITIONS  ════════════════════════ */

const pages: PageDef[] = [
  { eyebrow: "Cover",          title: "Underwriting Portal",    content: <CoverContent /> },
  { eyebrow: "Context",        title: "The Problem",            content: <ContextContent /> },
  { eyebrow: "Role & Ownership", title: "Role & Ownership",     content: <OwnershipContent /> },
  { eyebrow: "Key Decision",   title: "Parent / Child Build",   content: <DecisionContent /> },
  { eyebrow: "Delivery",       title: "Ideate → Deploy",        content: <ProcessContent /> },
  { eyebrow: "Architecture",   title: "C4 Model — 3 Levels",    content: <ArchitectureContent /> },
  { eyebrow: "User Flow",      title: "Risk Record Lifecycle",  content: <UserFlowContent /> },
  { eyebrow: "People",         title: "Hiring & Cadence",       content: <PeopleContent /> },
  { eyebrow: "Outcomes",       title: "Results",                content: <OutcomesContent /> },
  { eyebrow: "Enablement",     title: "Onboarding Hub",         content: <EnablementContent /> },
  { eyebrow: "Appendix",       title: "Resources",              content: <AppendixContent /> },
];

export default function BookApp() {
  return <BookViewer pages={pages} />;
}
