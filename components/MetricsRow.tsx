import { Users, Network, Rocket, UserCheck, BookOpen, type LucideIcon } from "lucide-react";
import { metrics } from "@/content/underwriting-portal";
import { BlurFade } from "@/components/ui/blur-fade";

// Icon per metric, indexed to the content/metrics order.
const icons: LucideIcon[] = [Users, Network, Rocket, UserCheck, BookOpen];

/**
 * Headline delivery metrics as cards: a tinted icon chip, the figure, label, and
 * note. Staggered blur-fade entrance; no decorative motion. Values are
 * directional/anonymized per the source brief.
 */
export default function MetricsRow() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {metrics.map((m, i) => {
        const Icon = icons[i] ?? Users;
        return (
          <BlurFade key={m.label} inView delay={0.06 * i} className="h-full">
            <div className="group flex h-full flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--hairline-strong)] hover:bg-[var(--surface-strong)]">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--hairline)] bg-[var(--surface-strong)] text-[var(--ink-soft)] transition-colors group-hover:text-[var(--accent)]">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <div className="mt-4 text-[28px] font-semibold leading-none tracking-tight text-[var(--ink)]">
                {m.value}
              </div>
              <div className="mt-2.5 text-sm font-medium text-[var(--ink-soft)]">{m.label}</div>
              {m.note && (
                <div className="mt-auto pt-2 text-xs text-[var(--ink-faint)]">{m.note}</div>
              )}
            </div>
          </BlurFade>
        );
      })}
      {/* TODO: real confidential delivery metrics (velocity, lead time, deploy
          frequency, defect rate, adoption, retention, ramp time) once cleared. */}
    </div>
  );
}
