import { ownership } from "@/content/underwriting-portal";

const toneStyles: Record<string, { dot: string; ring: string; label: string }> = {
  owned: {
    dot: "bg-[var(--accent-2)]",
    ring: "border-[var(--accent-2)]/40",
    label: "Owned",
  },
  coordinated: {
    dot: "bg-[var(--accent)]",
    ring: "border-[var(--accent)]/40",
    label: "Coordinated",
  },
  influence: {
    dot: "bg-[var(--accent-3)]",
    ring: "border-[var(--accent-3)]/40",
    label: "Influence",
  },
  delegated: {
    dot: "bg-[var(--ink-faint)]",
    ring: "border-[var(--hairline-strong)]",
    label: "Delegated",
  },
};

/**
 * Honest accountability map: separates what was owned outright from what was
 * coordinated, merely influenced, or delegated. The influence column is the
 * guardrail against overclaiming architecture ownership.
 */
export default function OwnershipMatrix() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ownership.map((bucket) => {
        const tone = toneStyles[bucket.tone];
        return (
          <div
            key={bucket.key}
            className={`rounded-2xl border bg-[var(--surface)] p-5 ${tone.ring}`}
          >
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
              <h3 className="text-base font-semibold text-[var(--ink)]">{bucket.title}</h3>
            </div>
            <p className="mt-1.5 text-sm text-[var(--ink-faint)]">{bucket.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {bucket.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-[var(--hairline)] bg-[var(--surface-strong)] px-2.5 py-1 text-xs font-medium text-[var(--ink-soft)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
