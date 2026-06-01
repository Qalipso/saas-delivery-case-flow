import { timeline, buildOrder, buildOrderNote } from "@/content/underwriting-portal";

/**
 * Vertical Ideate → Deploy timeline plus the deliberate build-order strip.
 * Visual alternative to the raw process flowchart from the source markdown.
 */
export default function DeliveryTimeline() {
  return (
    <div className="space-y-10">
      <ol className="relative space-y-6 border-l border-[var(--hairline)] pl-6">
        {timeline.map((stage) => (
          <li key={stage.n} className="relative">
            <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-elev)] text-xs font-semibold text-[var(--accent)]">
              {stage.n}
            </span>
            <h3 className="text-base font-semibold text-[var(--ink)]">{stage.title}</h3>
            <p className="mt-0.5 text-sm text-[var(--ink-soft)]">{stage.desc}</p>
            <p className="mt-1 text-sm text-[var(--ink-faint)]">{stage.detail}</p>
          </li>
        ))}
      </ol>

      <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)]">
          Build order
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
          {buildOrder.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              <span className="rounded-lg border border-[var(--hairline)] bg-[var(--surface-strong)] px-2.5 py-1 text-sm font-medium text-[var(--ink-soft)]">
                <span className="text-[var(--accent)]">{i + 1}</span> {item}
              </span>
              {i < buildOrder.length - 1 && (
                <span className="text-[var(--ink-faint)]">›</span>
              )}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-[var(--ink-faint)]">{buildOrderNote}</p>
      </div>
    </div>
  );
}
