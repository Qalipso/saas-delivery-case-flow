"use client";

import { useState } from "react";
import MermaidDiagram from "@/components/MermaidDiagram";
import Zoomable from "@/components/Zoomable";
import {
  mermaidC4Context,
  mermaidC4,
  mermaidC4Component,
  c4Levels,
} from "@/content/underwriting-portal";

const charts: Record<string, string> = {
  context: mermaidC4Context,
  containers: mermaidC4,
  components: mermaidC4Component,
};

/**
 * Three-level C4 viewer (Context / Containers / Components) backed by the same
 * model published as Structurizr DSL. All three levels use MermaidDiagram for
 * consistent visual style.
 */
export default function C4Tabs() {
  const [active, setActive] = useState("containers");
  const level = c4Levels.find((l) => l.id === active) ?? c4Levels[1];

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label="C4 levels"
        className="inline-flex rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-1"
      >
        {c4Levels.map((l) => (
          <button
            key={l.id}
            role="tab"
            aria-selected={active === l.id}
            onClick={() => setActive(l.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              active === l.id
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <Zoomable label="Zoom C4 diagram">
        <MermaidDiagram chart={charts[active]} caption={level.caption} />
      </Zoomable>

      <p className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4 text-sm text-[var(--ink-faint)]">
        {level.note}
      </p>
    </div>
  );
}
