"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/**
 * Minimal theme toggle. No external dependency: flips the `light` class on
 * <html> and persists the choice in localStorage. A blocking inline script in
 * layout.tsx applies the stored theme before paint to avoid a flash.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("uw-theme") as Theme | null) ?? "dark";
    setTheme(stored);
  }, []);

  const apply = (next: Theme) => {
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    localStorage.setItem("uw-theme", next);
    // Let theme-aware components (Mermaid) react.
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  };

  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={() => apply(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--surface)] text-[var(--ink-soft)] transition hover:border-[var(--hairline-strong)] hover:text-[var(--ink)]"
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}
