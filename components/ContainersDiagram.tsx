import { Server, Boxes, FileText, CreditCard, BarChart3, Database, ShieldCheck } from "lucide-react";

type Box = {
  name: string;
  tech: string;
  desc: string;
  Icon: typeof Server;
  hub?: boolean;
};

const containers: Box[] = [
  { name: "Web SPA", tech: "TypeScript", desc: "Portal UI · risk submission · dashboards", Icon: Boxes },
  { name: "API service", tech: "C# / .NET", desc: "Risk workflow · pricing · decisions", Icon: Server, hub: true },
  { name: "Document generation", tech: ".NET", desc: "Policy & print documents", Icon: FileText },
  { name: "Billing integration", tech: ".NET", desc: "Bank billing & invoicing", Icon: CreditCard },
  { name: "Reporting", tech: ".NET", desc: "Reports & analytics export", Icon: BarChart3 },
  { name: "Data store", tech: "Azure SQL / storage", desc: "Risk records · documents · secure data", Icon: Database },
];

const personas = [
  { name: "Regular user", who: "underwriter / broker" },
  { name: "Portal admin", who: "Leads, BA" },
  { name: "Super admin", who: "PM, Senior DevOps, Lead" },
];

/**
 * Hand-laid L2 container view. Replaces the cramped Mermaid auto-layout with a
 * readable grouped grid: personas, the platform boundary with its containers,
 * the isolated security panel, and external systems.
 */
export default function ContainersDiagram() {
  return (
    <figure className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-4 sm:p-6">
      {/* personas */}
      <div className="mb-4 flex flex-wrap gap-2">
        {personas.map((p) => (
          <div key={p.name} className="rounded-lg border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-1.5">
            <div className="text-sm font-medium text-[var(--ink)]">{p.name}</div>
            <div className="text-xs text-[var(--ink-faint)]">{p.who}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
        {/* platform boundary */}
        <div className="rounded-xl border border-dashed border-[var(--hairline-strong)] p-3">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-2)]">
            Underwriting Portal Platform · Kubernetes
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {containers.map((c) => (
              <div
                key={c.name}
                className={`rounded-lg border bg-[var(--bg-elev)] p-3 ${
                  c.hub ? "border-[var(--accent)]" : "border-[var(--hairline)]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <c.Icon className="h-4 w-4 text-[var(--accent)]" />
                  <span className="text-sm font-semibold text-[var(--ink)]">{c.name}</span>
                  {c.hub && (
                    <span className="ml-auto rounded bg-[var(--accent)]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
                      hub
                    </span>
                  )}
                </div>
                <div className="mt-1 font-mono text-[11px] text-[var(--ink-faint)]">[{c.tech}]</div>
                <div className="mt-1 text-xs text-[var(--ink-soft)]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* isolated security panel */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border-2 border-[var(--danger)]/60 bg-[var(--danger)]/8 p-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[var(--danger)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--danger)]">
                Isolated
              </span>
            </div>
            <div className="mt-1.5 text-sm font-semibold text-[var(--ink)]">Admin &amp; Security service</div>
            <div className="mt-1 text-xs text-[var(--ink-soft)]">
              Roles · permissions · security settings. Multi-environment, own schema.
            </div>
            <div className="mt-2 text-[11px] font-medium text-[var(--danger)]">
              Every API request authorizes here.
            </div>
          </div>

          <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-faint)]">
              External
            </div>
            <div className="mt-2 space-y-1.5 text-xs text-[var(--ink-soft)]">
              <div>Bank / billing provider — settlement</div>
              <div>Legacy system — one-way migration</div>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 text-center text-xs text-[var(--ink-faint)]">
        Level 2 — Containers (Kubernetes)
      </figcaption>
    </figure>
  );
}
