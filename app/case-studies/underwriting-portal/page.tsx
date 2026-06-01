import { Download } from "lucide-react";
import CaseHero from "@/components/CaseHero";
import MetricsRow from "@/components/MetricsRow";
import Section from "@/components/Section";
import SideNav from "@/components/SideNav";
import ThemeToggle from "@/components/ThemeToggle";
import OwnershipMatrix from "@/components/OwnershipMatrix";
import DeliveryTimeline from "@/components/DeliveryTimeline";
import MermaidDiagram from "@/components/MermaidDiagram";
import C4Tabs from "@/components/C4Tabs";
import Zoomable from "@/components/Zoomable";
import OnboardingDemo from "@/components/OnboardingDemo";
import DeckCarousel from "@/components/DeckCarousel";
import ResourcesBlock from "@/components/ResourcesBlock";

import {
  nav,
  context,
  decision,
  architecture,
  mermaidUserFlow,
  personas,
  journey,
  northStar,
  people,
  stakeholders,
  outcomes,
  outcomesMetrics,
} from "@/content/underwriting-portal";

export default function UnderwritingPortalCase() {
  return (
    <div className="relative">
      <a href="#overview" className="skip-link">Skip to content</a>
      {/* top bar */}
      <div className="no-print sticky top-0 z-30 border-b border-[var(--hairline)] bg-[var(--bg)]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <span className="text-sm font-medium text-[var(--ink-soft)]">
            Case study
            <span className="mx-2 text-[var(--ink-faint)]">/</span>
            <span className="text-[var(--ink)]">Underwriting Portal</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-amber-400 bg-amber-400/15 px-2.5 py-1 text-xs font-semibold text-amber-600 sm:inline-flex dark:text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Draft · amber = data to fill
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_220px]">
          {/* main column */}
          <main className="min-w-0 max-w-3xl">
            <CaseHero />

            <div className="pb-4">
              <MetricsRow />
            </div>

            <Section id="context" eyebrow="Context" title="The problem" lede={context.lede}>
              <div className="space-y-6">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {context.requirements.map((r) => (
                    <li
                      key={r.title}
                      className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4"
                    >
                      <div className="text-sm font-semibold text-[var(--ink)]">{r.title}</div>
                      <div className="mt-1 text-sm text-[var(--ink-soft)]">{r.desc}</div>
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)]">
                    Constraints
                  </div>
                  <dl className="mt-3 space-y-2">
                    {context.constraints.map((c) => (
                      <div key={c.label} className="flex flex-wrap gap-x-2 text-sm">
                        <dt className="font-medium text-[var(--ink)]">{c.label}:</dt>
                        <dd className="text-[var(--ink-soft)]">{c.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {/* TODO: confirm compliance regime (e.g. data residency / audit / SOC2). */}
                </div>
              </div>
            </Section>

            <Section
              id="ownership"
              eyebrow="Role & ownership"
              title="Role & ownership"
              lede="Developer to Senior Team Lead. Team 3 to ~30 across two teams. Owned: config team, delivery flow. Coordinated: QA, BA, Dev, DevOps, PM, client. Influenced: architecture, timeline, release planning."
            >
              <OwnershipMatrix />
            </Section>

            <Section
              id="decision"
              eyebrow="Key leadership decision"
              title={decision.headline}
              lede="Late three-portal request, restructured as a parent/child parallel build."
            >
              <div className="space-y-5">
                <span className="inline-block rounded-full border border-[var(--accent-2)]/40 bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--accent-2)]">
                  {decision.classification}
                </span>
                {decision.body.map((p) => (
                  <p key={p.slice(0, 24)} className="text-[var(--ink-soft)] leading-relaxed">
                    {p}
                  </p>
                ))}
                <div className="flex items-stretch gap-3">
                  <div className="flex-1 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4 text-center">
                    <div className="text-xs text-[var(--ink-faint)]">Estimated</div>
                    <div className="mt-1 text-2xl font-semibold text-[var(--ink-soft)] line-through decoration-[var(--danger)]/60">
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
            </Section>

            <Section
              id="process"
              eyebrow="Delivery process"
              title="Ideate → Deploy"
              lede="Five stages, Ideate to Deploy. Build order front-loads dependency-heavy work; cosmetic UI last."
            >
              <DeliveryTimeline />
            </Section>

            <Section
              id="architecture"
              eyebrow="Architecture"
              title="C4 model — 3 levels"
              lede="Isolated Admin & Security container governs access across every environment. Decision class: influenced/advocated in the define phase. Modeled as C4 (Structurizr DSL); rendered below."
            >
              <div className="space-y-6">
                <C4Tabs />
                <ul className="space-y-2">
                  {architecture.reading.map((r) => (
                    <li key={r.slice(0, 24)} className="flex gap-3 text-sm text-[var(--ink-soft)]">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <p className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4 text-sm text-[var(--ink-faint)]">
                  {architecture.decisionLine}
                </p>
              </div>
            </Section>

            <Section
              id="userflow"
              eyebrow="User flow"
              title="The risk-record lifecycle"
              lede="Risk record from submission to bound policy. Role-gated at each step. Isolated security layer governs access."
            >
              <div className="space-y-6">
                <Zoomable label="Zoom user-flow diagram">
                  <MermaidDiagram chart={mermaidUserFlow} caption="Risk-record lifecycle with role branching" />
                </Zoomable>

                <div className="overflow-x-auto rounded-xl border border-[var(--hairline)]">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[var(--hairline)] text-[var(--ink-faint)]">
                        <th className="px-4 py-2.5 font-medium">Persona</th>
                        <th className="px-4 py-2.5 font-medium">Who</th>
                        <th className="px-4 py-2.5 font-medium">Authority</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personas.map((p) => (
                        <tr key={p.persona} className="border-b border-[var(--hairline)] last:border-0">
                          <td className="px-4 py-2.5 font-medium text-[var(--ink)]">{p.persona}</td>
                          <td className="px-4 py-2.5 text-[var(--ink-soft)]">{p.who}</td>
                          <td className="px-4 py-2.5 text-[var(--ink-soft)]">{p.authority}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)]">
                    Journey map with emotional layer
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {journey.map((j) => (
                      <div key={j.step} className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4">
                        <div className="text-sm font-semibold text-[var(--ink)]">{j.step}</div>
                        <div className="mt-1 text-xs text-[var(--ink-faint)]">Goal: {j.goal}</div>
                        <div className="mt-2 text-xs text-[var(--danger)]/90">Friction: {j.friction}</div>
                        <div className="mt-1 text-xs text-[var(--accent-2)]">Response: {j.response}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--surface)] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                    North star
                  </div>
                  <div className="mt-1 text-lg font-semibold text-[var(--ink)]">{northStar.metric}</div>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">{northStar.blurb}</p>
                </div>
              </div>
            </Section>

            <Section
              id="people"
              eyebrow="People"
              title="Hiring, onboarding & cadence"
              lede="20+ interviewed across nationalities. Three-stage hiring. Onboarding target: first PR in week one."
            >
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-5">
                    <div className="text-sm font-semibold text-[var(--ink)]">
                      Hiring — {people.hiring.headline}
                    </div>
                    <ol className="mt-3 space-y-1.5 text-sm text-[var(--ink-soft)]">
                      {people.hiring.stages.map((s, i) => (
                        <li key={s}>
                          <span className="text-[var(--accent)]">{i + 1}.</span> {s}
                        </li>
                      ))}
                    </ol>
                    {/* TODO: [X] new team members onboarded; ramp / time-to-first-PR. */}
                  </div>
                  <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-5">
                    <div className="text-sm font-semibold text-[var(--ink)]">Onboarding</div>
                    <ul className="mt-3 space-y-1.5 text-sm text-[var(--ink-soft)]">
                      {people.onboarding.items.map((it) => (
                        <li key={it} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent-2)]" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs text-[var(--ink-faint)]">{people.onboarding.goal}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)]">
                    Agile cadence
                  </div>
                  <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {people.cadence.map((c) => (
                      <div key={c.ritual} className="flex flex-wrap gap-x-2 text-sm">
                        <dt className="font-medium text-[var(--ink)]">{c.ritual}:</dt>
                        <dd className="text-[var(--ink-soft)]">{c.note}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <figure className="rounded-xl border-l-2 border-[var(--accent)] bg-[var(--surface)] p-5">
                  <blockquote className="text-[var(--ink-soft)] italic">
                    {stakeholders.quote}
                  </blockquote>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {stakeholders.forces.map((f) => (
                      <div key={f.party} className="rounded-lg border border-[var(--hairline)] bg-[var(--surface-strong)] p-3">
                        <div className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{f.party}</div>
                        <div className="mt-1 text-sm font-medium text-[var(--ink)]">{f.tension}</div>
                        <div className="mt-0.5 text-xs text-[var(--ink-faint)]">{f.detail}</div>
                      </div>
                    ))}
                  </div>
                  <figcaption className="mt-4 text-sm text-[var(--ink-faint)]">
                    {stakeholders.principle}
                  </figcaption>
                </figure>
              </div>
            </Section>

            <Section
              id="outcomes"
              eyebrow="Outcomes"
              title="Outcomes & reflection"
              lede="~6 months estimated, ~4 delivered. Directional where exact figures are confidential."
            >
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-5">
                    <div className="text-sm font-semibold text-[var(--ink)]">Scope & scale</div>
                    <ul className="mt-3 space-y-1.5 text-sm text-[var(--ink-soft)]">
                      {outcomes.scope.map((s) => (
                        <li key={s.slice(0, 20)} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-5">
                    <div className="text-sm font-semibold text-[var(--ink)]">Delivery & quality</div>
                    <ul className="mt-3 space-y-1.5 text-sm text-[var(--ink-soft)]">
                      {outcomes.delivery.map((s) => (
                        <li key={s.slice(0, 20)} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent-2)]" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)] mb-4">
                    Metrics (directional · exact figures confidential)
                  </div>
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {outcomesMetrics.map((m) => (
                      <div key={m.label} className="rounded-lg border border-[var(--hairline)] bg-[var(--bg-elev)] p-3">
                        <dt className="text-xs font-medium text-[var(--ink-faint)]">{m.label}</dt>
                        <dd className="mt-1 flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                          {m.before && (
                            <>
                              <span className="text-[var(--ink-soft)] line-through decoration-[var(--danger)]/50">{m.before}</span>
                              <span className="text-[var(--ink-faint)]">→</span>
                            </>
                          )}
                          <span className="text-[var(--accent-2)]">{m.after}</span>
                        </dd>
                        {m.mechanism && (
                          <dd className="mt-1 text-xs text-[var(--ink-faint)]">{m.mechanism}</dd>
                        )}
                      </div>
                    ))}
                  </dl>
                </div>

                <figure className="rounded-xl border-l-2 border-[var(--accent-2)] bg-[var(--surface)] p-5">
                  <blockquote className="text-[var(--ink)] leading-relaxed">
                    {outcomes.reflection}
                  </blockquote>
                </figure>
              </div>
            </Section>

            <Section
              id="onboarding"
              eyebrow="Enablement"
              title="Interactive onboarding hub"
              lede="Prototype / internal-style guide — illustrates the onboarding system, not a shipped product."
            >
              <OnboardingDemo />
            </Section>

            <Section
              id="deck"
              eyebrow="Appendix"
              title="Deck — leave-behind"
              lede="This page is the full read. The deck is the 1-pass scan / leave-behind — download it rather than re-reading the same content inline."
            >
              <div className="space-y-4">
                <a
                  href="/resources/underwriting-case-deck.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--accent)]/50 bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)]"
                >
                  <Download className="h-4 w-4 text-[var(--accent)]" />
                  Download deck (PDF · 12 slides)
                </a>
                <details className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-2">
                  <summary className="cursor-pointer px-2 py-1 text-sm text-[var(--ink-soft)]">
                    Preview slides inline
                  </summary>
                  <div className="mt-3">
                    <DeckCarousel />
                  </div>
                </details>
              </div>
            </Section>

            <Section
              id="resources"
              eyebrow="Source"
              title="Resources"
              lede="The artifacts behind this page: deck, C4 model as code, architecture appendix."
            >
              <ResourcesBlock />
            </Section>

            <footer className="border-t border-[var(--hairline)] py-10 text-sm text-[var(--ink-faint)]">
              Anonymized B2B case study · Wonderland Inc. · metrics expressed as
              ranges/direction.
            </footer>
          </main>

          {/* side rail */}
          <aside className="no-print hidden xl:block">
            <div className="sticky top-20 py-10">
              <SideNav items={nav} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
