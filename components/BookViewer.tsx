"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type PageDef = {
  eyebrow: string;
  title: string;
  content: React.ReactNode;
};

// Cubic-bezier easing tuples (typed as 4-number tuples so motion's Variants accept them).
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN: [number, number, number, number] = [0.55, 0, 1, 0.45];

const flipVariants: Variants = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? 75 : -75,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.52, ease: EASE_OUT },
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? -75 : 75,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.32, ease: EASE_IN },
  }),
};

export default function BookViewer({ pages }: { pages: PageDef[] }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (n: number) => {
      const next = Math.max(0, Math.min(pages.length - 1, n));
      if (next === current) return;
      setDir(next > current ? 1 : -1);
      setCurrent(next);
    },
    [current, pages.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(current + 1);
      if (e.key === "ArrowLeft") go(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  const page = pages[current];

  return (
    <div className="book-stage">
      {/* Stage top bar */}
      <div className="book-stage-top no-print">
        <span className="book-stage-title">Case study / Underwriting Portal</span>
        <span className="book-stage-counter">
          {String(current + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(pages.length).padStart(2, "0")}
        </span>
      </div>

      {/* Prev */}
      <button
        className="book-nav book-nav-left no-print"
        onClick={() => go(current - 1)}
        disabled={current === 0}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page */}
      <div className="book-perspective">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.article
            key={current}
            custom={dir}
            variants={flipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="book-page light"
          >
            <header className="book-page-header">
              <span className="book-eyebrow">
                {String(current + 1).padStart(2, "0")}&ensp;—&ensp;{page.eyebrow.toUpperCase()}
              </span>
            </header>

            <div className="book-page-content">
              <h1 className="book-page-h1">{page.title}</h1>
              <div className="book-page-body">{page.content}</div>
            </div>

            <footer className="book-page-footer">
              <span className="book-footer-label">{page.eyebrow}</span>
              <span className="book-footer-num">{current + 1}&thinsp;/&thinsp;{pages.length}</span>
            </footer>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Next */}
      <button
        className="book-nav book-nav-right no-print"
        onClick={() => go(current + 1)}
        disabled={current === pages.length - 1}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot nav */}
      <nav className="book-dots no-print" aria-label="Page navigation">
        {pages.map((p, i) => (
          <button
            key={p.eyebrow}
            onClick={() => go(i)}
            aria-label={`Go to ${p.title}`}
            aria-current={i === current ? "page" : undefined}
            className={`book-dot ${i === current ? "book-dot-active" : ""}`}
          />
        ))}
      </nav>
    </div>
  );
}
