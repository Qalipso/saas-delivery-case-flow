import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Bright authoring marker for spots that still need a real value, number, or
 * variable. Amber = "fill this before publishing". Two forms:
 *   - inline  <DataGap>deploy freq before/after</DataGap>
 *   - block   <DataGap block title="Outcome metrics">...</DataGap>
 * Remove these (and this component) once the data is in.
 */
export default function DataGap({
  children,
  block = false,
  title,
}: {
  children: ReactNode;
  block?: boolean;
  title?: string;
}) {
  if (block) {
    return (
      <div className="rounded-xl border-2 border-dashed border-amber-400 bg-amber-400/10 p-4">
        <div className="flex items-center gap-2 text-amber-500">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-[0.14em]">
            {title ?? "Data to fill"}
          </span>
        </div>
        <div className="mt-2 text-sm text-[var(--ink-soft)]">{children}</div>
      </div>
    );
  }
  return (
    <mark className="mx-0.5 inline-flex items-center gap-1 rounded-md border border-dashed border-amber-400 bg-amber-400/20 px-1.5 py-0.5 align-baseline text-[0.92em] font-medium text-amber-600 dark:text-amber-300">
      <AlertTriangle className="h-3 w-3 flex-none" />
      {children}
    </mark>
  );
}
