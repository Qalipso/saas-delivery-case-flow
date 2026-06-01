"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/content/underwriting-portal";

/**
 * Sticky side navigation with active-section highlighting via IntersectionObserver.
 * Hidden below the xl breakpoint where the single content column takes over.
 */
export default function SideNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study sections" className="sticky top-24 hidden xl:block">
      <p className="mb-3 pl-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)]">
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-[var(--hairline)]">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`-ml-px block border-l-2 py-1.5 pl-3 text-sm transition ${
                  isActive
                    ? "border-[var(--accent)] font-medium text-[var(--ink)]"
                    : "border-transparent text-[var(--ink-faint)] hover:text-[var(--ink-soft)]"
                }`}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
