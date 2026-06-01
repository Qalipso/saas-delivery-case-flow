"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Client-only Mermaid renderer. Renders the given definition into an SVG and
 * re-renders when the theme changes (listens for the `themechange` event fired
 * by ThemeToggle, and reads the stored preference on mount).
 */
export default function MermaidDiagram({
  chart,
  caption,
}: {
  chart: string;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        const isLight = document.documentElement.classList.contains("light");
        mermaid.initialize({
          startOnLoad: false,
          theme: isLight ? "neutral" : "dark",
          securityLevel: "strict",
          fontFamily: "inherit",
          flowchart: { htmlLabels: true, curve: "basis", nodeSpacing: 55, rankSpacing: 70, padding: 16 },
        });
        const id = `mmd-${reactId}`;
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setReady(true);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Diagram failed to render");
      }
    };

    render();
    const onThemeChange = () => render();
    window.addEventListener("themechange", onThemeChange);
    return () => {
      cancelled = true;
      window.removeEventListener("themechange", onThemeChange);
    };
  }, [chart, reactId]);

  return (
    <figure className="overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-4 sm:p-6">
      <div
        ref={ref}
        className="mermaid-host min-h-[120px] overflow-x-auto"
        aria-busy={!ready}
      />
      {!ready && !error && (
        <p className="px-2 py-6 text-center text-sm text-[var(--ink-faint)]">
          Rendering diagram…
        </p>
      )}
      {error && (
        <p className="px-2 py-4 text-sm text-[var(--danger)]">
          Diagram error: {error}
        </p>
      )}
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-[var(--ink-faint)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
