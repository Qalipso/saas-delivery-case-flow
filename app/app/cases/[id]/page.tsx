import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCase,
  getBlockersForCase,
  stageFlow,
  healthColor,
  healthBg,
  fmtUSD,
  stageIndex,
} from "@/lib/data";

export function generateStaticParams() {
  const { allCases } = require("@/lib/data");
  return allCases.map((c: { id: string }) => ({ id: c.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CaseDetailPage({ params }: Props) {
  const { id } = await params;
  const c = getCase(id);
  if (!c) notFound();

  const blockers = getBlockersForCase(id);
  const openBlockers = blockers.filter((b) => !b.resolved_at);
  const resolvedBlockers = blockers.filter((b) => b.resolved_at);
  const stages = stageFlow.stages;
  const currentIdx = stageIndex(c.current_stage);

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 16 }}>
        <Link href="/" style={{ color: "#58a6ff", textDecoration: "none" }}>Cases</Link>
        {" / "}
        <span style={{ color: "#e6edf3" }}>{c.customer_company}</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#e6edf3", marginBottom: 6 }}>{c.customer_company}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, alignItems: "center" }}>
            <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 12, background: healthBg(c.health_score), color: healthColor(c.health_score), fontWeight: 600 }}>
              {c.health_score.toUpperCase()}
            </span>
            <span style={{ fontSize: 12, color: "#8b949e" }}>IM: {c.assigned_im}</span>
            <span style={{ fontSize: 12, color: "#8b949e" }}>Created: {c.created_at}</span>
          </div>
        </div>
        <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#e6edf3" }}>{fmtUSD(c.contract_value_usd)}</div>
          <div style={{ fontSize: 12, color: "#8b949e" }}>Contract ACV</div>
        </div>
      </div>

      {/* Health reason */}
      <div style={{ background: c.health_score === "red" ? "#3d1a1a" : c.health_score === "yellow" ? "#2d2a0f" : "#1a3a1a", border: `1px solid ${healthColor(c.health_score)}33`, borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 13, color: healthColor(c.health_score) }}>
        {c.health_reason}
      </div>

      {/* Stage progress */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>Stage Progress</h2>
        <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
          {stages.map((s, i) => {
            const status = i < currentIdx ? "done" : i === currentIdx ? "current" : "future";
            const slaBreached = status === "current" && c.days_in_stage > s.sla_days;

            return (
              <div
                key={s.name}
                style={{
                  flex: 1,
                  minWidth: 80,
                  padding: "10px 8px",
                  background: status === "done" ? "#1a3a1a" : status === "current" ? (slaBreached ? "#3d1a1a" : "#1f2a3a") : "#161b22",
                  border: "1px solid #21262d",
                  borderLeft: i === 0 ? "1px solid #21262d" : "none",
                  textAlign: "center" as const,
                  position: "relative" as const,
                }}
              >
                <div style={{ fontSize: 10, color: status === "done" ? "#3fb950" : status === "current" ? "#58a6ff" : "#8b949e", marginBottom: 4, fontWeight: status === "current" ? 600 : 400 }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 11, color: "#8b949e" }}>SLA {s.sla_days}d</div>
                {status === "current" && (
                  <div style={{ fontSize: 11, color: slaBreached ? "#f85149" : "#58a6ff", fontWeight: 600 }}>
                    Day {c.days_in_stage}
                  </div>
                )}
                {status === "done" && (
                  <div style={{ fontSize: 14, color: "#3fb950" }}>✓</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Key dates */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Current Stage", value: c.current_stage },
          { label: "Target Go-Live", value: c.target_go_live_date },
          { label: "Actual Go-Live", value: c.actual_go_live_date ?? "Pending" },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: "#8b949e", marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 14, color: "#e6edf3", fontWeight: 500 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Open Blockers */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>
          Open Blockers ({openBlockers.length})
        </h2>
        {openBlockers.length === 0 ? (
          <div style={{ fontSize: 13, color: "#3fb950", padding: "12px 0" }}>No open blockers.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
            {openBlockers.map((b) => (
              <div key={b.id} style={{ background: "#2d2a0f", border: "1px solid #d2992233", borderRadius: 8, padding: "12px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#e6edf3", fontWeight: 500 }}>{b.description}</span>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, padding: "1px 8px", borderRadius: 12, background: b.owner === "customer" ? "#3d1a1a" : "#1a2a3d", color: b.owner === "customer" ? "#f85149" : "#58a6ff" }}>
                      {b.owner === "customer" ? "Customer" : "Internal"}
                    </span>
                    <span style={{ fontSize: 11, color: "#8b949e" }}>{b.age_days}d old</span>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#8b949e", fontFamily: "monospace" }}>{b.tag}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolved Blockers */}
      {resolvedBlockers.length > 0 && (
        <div>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "#8b949e", marginBottom: 12 }}>
            Resolved ({resolvedBlockers.length})
          </h2>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
            {resolvedBlockers.map((b) => (
              <div key={b.id} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 6, padding: "10px 14px", opacity: 0.7 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ fontSize: 12, color: "#8b949e" }}>{b.description}</span>
                  <span style={{ fontSize: 11, color: "#3fb950", flexShrink: 0 }}>resolved {b.resolved_at}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
