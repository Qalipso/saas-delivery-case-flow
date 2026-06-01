import { FileText, FileCode, Network } from "lucide-react";

type Resource = {
  href: string;
  label: string;
  meta: string;
  Icon: typeof FileText;
  download?: boolean;
  external?: boolean;
};

// Structurizr local renders the C4 model from workspace.dsl when running.
const STRUCTURIZR_LOCAL = "http://localhost:4040";

const resources: Resource[] = [
  {
    href: "/resources/underwriting-case-deck.pdf",
    label: "Executive deck (PDF)",
    meta: "12 slides",
    Icon: FileText,
    download: true,
  },
  {
    href: "/resources/workspace.dsl",
    label: "C4 model (Structurizr DSL)",
    meta: "architecture as code",
    Icon: FileCode,
    download: true,
  },
  {
    href: "/resources/architecture-c4.md",
    label: "Architecture appendix (Markdown)",
    meta: "L1 / L2 / L3 + notes",
    Icon: FileText,
    download: true,
  },
  {
    href: STRUCTURIZR_LOCAL,
    label: "Open C4 in Structurizr",
    meta: "local renderer · localhost:4040",
    Icon: Network,
    external: true,
  },
];

/**
 * Downloadable source artifacts. Facts over prose: the deck, the C4 model as
 * code, and the architecture appendix. Structurizr link is local-only.
 */
export default function ResourcesBlock() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {resources.map((r) => (
        <a
          key={r.href}
          href={r.href}
          {...(r.download ? { download: true } : {})}
          {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex items-center gap-3 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4 transition hover:border-[var(--hairline-strong)]"
        >
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-[var(--hairline)] bg-[var(--surface-strong)] text-[var(--accent)]">
            <r.Icon className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-medium text-[var(--ink)]">{r.label}</span>
            <span className="block text-xs text-[var(--ink-faint)]">{r.meta}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
