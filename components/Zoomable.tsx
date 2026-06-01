"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Expand, X } from "lucide-react";

/**
 * Click-to-zoom wrapper. Renders children inline with a zoom button; clicking
 * opens a fullscreen overlay with the same content enlarged and scrollable.
 * Esc or backdrop click closes. Children render twice (inline + overlay) —
 * components used inside must be safe to mount more than once.
 */
export default function Zoomable({
  children,
  label = "Zoom",
}: {
  children: ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={label}
        className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--hairline)] bg-[var(--bg-elev)]/80 text-[var(--ink-soft)] backdrop-blur transition hover:text-[var(--ink)]"
      >
        <Expand className="h-4 w-4" />
      </button>

      {children}

      {open && (
        <div
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/80 p-4 backdrop-blur-sm sm:items-center sm:p-10"
        >
          <button
            type="button"
            aria-label="Close"
            className="fixed right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
