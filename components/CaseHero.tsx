import { hero } from "@/content/underwriting-portal";
import { BlurFade } from "@/components/ui/blur-fade";
import DataGap from "@/components/DataGap";

/**
 * Hero block: kicker, display headline, subhead, trajectory pill, and tag chips.
 * Page-level gradient (globals.css) carries the mood; elements stagger in via
 * BlurFade (motion) for a high-end SaaS entrance.
 */
export default function CaseHero() {
  return (
    <header id="overview" className="scroll-mt-24 pt-10 pb-14 sm:pt-16 sm:pb-20">
      <BlurFade delay={0.05}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {hero.kicker}
        </p>
      </BlurFade>

      <BlurFade delay={0.12}>
        <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--ink)] sm:text-6xl">
          {hero.title}
        </h1>
      </BlurFade>

      <BlurFade delay={0.2}>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)] sm:text-xl">
          {hero.subtitle}
        </p>
      </BlurFade>

      {/* 5-second hook above the fold: role + one decision + one number */}
      <BlurFade delay={0.24}>
        <p className="mt-5 max-w-3xl rounded-xl border-l-2 border-[var(--accent-2)] bg-[var(--surface)] px-4 py-3 text-base font-medium text-[var(--ink)]">
          Senior Team Lead: grew the config team 3 → 10+, coordinated ~30
          contributors, and cut a three-portal delivery from ~6 to ~4 months with
          one structural decision (parent/child parallel build).
        </p>
      </BlurFade>

      {/* who this case is for — point 5 */}
      <BlurFade delay={0.3}>
        <p className="mt-4 text-sm text-[var(--ink-faint)]">
          For hiring teams evaluating{" "}
          <DataGap>target roles: Backend / Tech Lead / Eng Manager / Product?</DataGap>{" "}
          — relevance: delivery leadership, legacy migration, architecture influence.
        </p>
      </BlurFade>

      <BlurFade delay={0.28}>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-strong)] px-4 py-1.5 text-sm font-medium text-[var(--ink)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-2)]" />
            {hero.trajectory}
          </span>
          <span className="text-sm text-[var(--ink-faint)]">{hero.meta}</span>
        </div>
      </BlurFade>

      <BlurFade delay={0.36}>
        <ul className="mt-8 flex flex-wrap gap-2">
          {hero.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--ink-soft)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </BlurFade>
    </header>
  );
}
