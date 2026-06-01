import type { ReactNode } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  children: ReactNode;
};

/**
 * Anchor-target section wrapper. Provides the consistent heading rhythm used
 * across the case page so SideNav links scroll to predictable offsets.
 */
export default function Section({ id, eyebrow, title, lede, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--hairline)] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <BlurFade inView delay={0.05}>
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            {title}
          </h2>
          {lede && (
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">{lede}</p>
          )}
        </BlurFade>
        <BlurFade inView delay={0.12}>
          <div className="mt-8">{children}</div>
        </BlurFade>
      </div>
    </section>
  );
}
