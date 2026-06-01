import { onboardingDemo } from "@/content/underwriting-portal";

/**
 * Embeds the interactive onboarding hub (static HTML in /public) via a sandboxed
 * iframe inside a framed card. Same-origin so it renders without CSP friction;
 * sandbox limited to scripts (the hub has no forms/navigation).
 */
export default function OnboardingDemo() {
  return (
    <div className="space-y-4">
      <p className="text-[var(--ink-soft)]">{onboardingDemo.blurb}</p>

      <div className="overflow-hidden rounded-2xl border border-[var(--hairline-strong)] bg-[var(--bg-elev)] shadow-[var(--shadow)]">
        <div className="flex items-center justify-between border-b border-[var(--hairline)] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--danger)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-3)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-2)]/70" />
            <span className="ml-3 text-xs text-[var(--ink-faint)]">
              onboarding-hub · live demo
            </span>
          </div>
          <a
            href={onboardingDemo.src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[var(--accent)] hover:underline"
          >
            Open in new tab ↗
          </a>
        </div>

        <iframe
          src={onboardingDemo.src}
          title={onboardingDemo.title}
          loading="lazy"
          sandbox="allow-scripts allow-top-navigation-by-user-activation"
          className="h-[640px] w-full border-0 bg-[var(--bg)]"
        />
      </div>
    </div>
  );
}
