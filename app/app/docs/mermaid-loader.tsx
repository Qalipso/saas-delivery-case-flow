"use client";
import { useEffect } from "react";

export default function MermaidLoader() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      // dynamic import via CDN to avoid bundling mermaid
      const w = window as unknown as { mermaid?: { initialize: (c: object) => void; run: (o?: object) => Promise<void> } };
      if (!w.mermaid) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
          s.onload = () => resolve();
          s.onerror = () => reject(new Error("mermaid load failed"));
          document.head.appendChild(s);
        });
      }
      if (cancelled) return;
      const m = (window as unknown as { mermaid: { initialize: (c: object) => void; run: (o?: object) => Promise<void> } }).mermaid;
      m.initialize({ startOnLoad: false, theme: "dark", themeVariables: { background: "#0d1117" } });
      try {
        await m.run({ querySelector: "pre.mermaid" });
      } catch (e) {
        console.warn("mermaid render error", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
