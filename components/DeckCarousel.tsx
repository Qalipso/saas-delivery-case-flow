"use client";

import { useCallback, useEffect, useState } from "react";
import { deckSlides } from "@/content/deck-slides";

/**
 * Deck appendix as a slide carousel. Slides are native JSX reproductions of the
 * 12-slide deck (theme-aware, crisp). If a slide carries an `image` (real PNG
 * exported into /public/deck), it renders that instead.
 *
 * Navigation: prev/next buttons, dot indicators, and ←/→ arrow keys.
 */
export default function DeckCarousel() {
  const [index, setIndex] = useState(0);
  const count = deckSlides.length;

  const go = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const slide = deckSlides[index];

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--hairline-strong)] bg-[var(--bg-elev)] shadow-[var(--shadow)]">
        {/* taller on mobile so text fits; 16:10 slide ratio from sm up */}
        <div className="relative aspect-[3/4] w-full sm:aspect-[16/10]">
          {slide.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.image}
              alt={`Slide ${slide.id}: ${slide.title}`}
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-center gap-3 overflow-auto p-5 sm:gap-4 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                {slide.eyebrow}
              </p>
              <h3 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-[var(--ink)] sm:text-3xl">
                {slide.title}
              </h3>
              <div className="text-[var(--ink-soft)]">{slide.body}</div>
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-elev)]/80 text-[var(--ink)] backdrop-blur transition hover:border-[var(--accent)]"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(index + 1)}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-elev)]/80 text-[var(--ink)] backdrop-blur transition hover:border-[var(--accent)]"
        >
          ›
        </button>

        <div className="absolute bottom-3 right-4 rounded-full border border-[var(--hairline)] bg-[var(--bg-elev)]/80 px-2.5 py-0.5 text-xs font-medium text-[var(--ink-soft)] backdrop-blur">
          {index + 1} / {count}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {deckSlides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index
                ? "w-6 bg-[var(--accent)]"
                : "w-1.5 bg-[var(--hairline-strong)] hover:bg-[var(--ink-faint)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
