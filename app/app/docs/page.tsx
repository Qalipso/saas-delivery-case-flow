import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import MermaidLoader from "./mermaid-loader";

const PROJECT_ROOT = path.resolve(process.cwd(), "..");

const DOCS: { title: string; file: string; desc: string }[] = [
  { title: "Product Brief", file: "product-brief.md", desc: "What it is, who it's for, the wedge" },
  { title: "Case Study", file: "docs/case-study.md", desc: "Scoping, decisions, success criteria" },
  { title: "Architecture", file: "architecture.md", desc: "System design, layers, contracts" },
  { title: "Data Model", file: "diagrams/data-model.md", desc: "Entities & relationships (ERD)" },
  { title: "System Diagram", file: "diagrams/system.md", desc: "Components & data flow" },
  { title: "Roadmap", file: "roadmap.md", desc: "Phased delivery plan" },
  { title: "Acceptance Criteria", file: "acceptance-criteria.md", desc: "Done-when checks per surface" },
];

// custom marked extension — map ```mermaid blocks to <pre class="mermaid"> for client render
marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    code({ text, lang }) {
      if (lang === "mermaid") {
        return `<pre class="mermaid">${text}</pre>`;
      }
      // delegate to default by returning false
      return false;
    },
  },
});

async function loadDoc(file: string): Promise<string> {
  try {
    const raw = await fs.readFile(path.join(PROJECT_ROOT, file), "utf8");
    return await marked.parse(raw);
  } catch (e) {
    return `<p style="color:#f85149">Failed to load ${file}: ${(e as Error).message}</p>`;
  }
}

export default async function DocsPage() {
  const sections = await Promise.all(
    DOCS.map(async (d) => ({ ...d, html: await loadDoc(d.file) })),
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#e6edf3", marginBottom: 4 }}>Documentation</h1>
        <p style={{ fontSize: 13, color: "#8b949e" }}>
          Product spec, architecture, diagrams, roadmap — {DOCS.length} documents
        </p>
      </div>

      {/* TOC */}
      <nav style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, padding: "12px 16px", marginBottom: 24 }}>
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8b949e", marginBottom: 8 }}>On this page</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 6 }}>
          {sections.map((s) => (
            <li key={s.file}>
              <a href={`#${slug(s.title)}`} style={{ color: "#58a6ff", fontSize: 13, textDecoration: "none" }}>
                {s.title}
              </a>
              <div style={{ fontSize: 11, color: "#8b949e" }}>{s.desc}</div>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((s) => (
        <section
          key={s.file}
          id={slug(s.title)}
          style={{
            background: "#0d1117",
            border: "1px solid #21262d",
            borderRadius: 8,
            padding: "20px 24px",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid #21262d" }}>
            <h2 style={{ fontSize: 18, color: "#e6edf3", margin: 0 }}>{s.title}</h2>
            <span style={{ fontSize: 11, color: "#6e7681", fontFamily: "monospace" }}>{s.file}</span>
          </div>
          <article className="md-body" dangerouslySetInnerHTML={{ __html: s.html }} />
        </section>
      ))}

      <MermaidLoader />
    </div>
  );
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
