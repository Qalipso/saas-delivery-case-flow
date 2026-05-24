import Link from "next/link";
import { allCases, allBlockers, stageFlow, healthColor, healthBg, fmtUSD } from "@/lib/data";

export default function PipelinePage() {
  const stages = stageFlow.stages;
  const totalACV = allCases.reduce((s, c) => s + c.contract_value_usd, 0);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#e6edf3", marginBottom: 4 }}>Pipeline View</h1>
        <p style={{ fontSize: 13, color: "#8b949e" }}>Cases grouped by stage · {fmtUSD(totalACV)} total ACV in flight</p>
      </div>

      {/* Kanban-style columns */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${stages.length}, minmax(140px, 1fr))`, gap: 10, overflowX: "auto" }}>
        {stages.map((stage) => {
          const stageCases = allCases.filter((c) => c.current_stage === stage.name);
          const stageACV = stageCases.reduce((s, c) => s + c.contract_value_usd, 0);
          const redCount = stageCases.filter((c) => c.health_score === "red").length;

          return (
            <div key={stage.name} style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
              {/* Column header */}
              <Link
                href={`/stages/${encodeURIComponent(stage.name)}`}
                style={{ textDecoration: "none" }}
              >
                <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: "8px 8px 0 0", padding: "10px 12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", marginBottom: 2 }}>{stage.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8b949e" }}>
                    <span>SLA {stage.sla_days}d</span>
                    {stageACV > 0 && <span style={{ color: "#58a6ff" }}>{fmtUSD(stageACV)}</span>}
                  </div>
                  {redCount > 0 && <div style={{ fontSize: 10, color: "#f85149", marginTop: 2 }}>{redCount} at risk</div>}
                </div>
              </Link>

              {/* Case cards */}
              <div style={{ background: "#0d1117", border: "1px solid #21262d", borderTop: "none", borderRadius: "0 0 8px 8px", padding: 8, minHeight: 80, display: "flex", flexDirection: "column" as const, gap: 6 }}>
                {stageCases.length === 0 ? (
                  <div style={{ fontSize: 11, color: "#30363d", textAlign: "center" as const, padding: "16px 0" }}>empty</div>
                ) : (
                  stageCases.map((c) => {
                    const caseBlockers = allBlockers.filter((b) => b.case_id === c.id && !b.resolved_at);
                    return (
                      <Link key={c.id} href={`/cases/${c.id}`} style={{ textDecoration: "none" }}>
                        <div style={{ background: "#161b22", border: `1px solid ${healthColor(c.health_score)}44`, borderRadius: 6, padding: "8px 10px" }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", marginBottom: 4 }}>{c.customer_company}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8b949e" }}>
                            <span style={{ color: healthColor(c.health_score) }}>{c.health_score}</span>
                            <span>d{c.days_in_stage}/{stage.sla_days}</span>
                          </div>
                          <div style={{ fontSize: 11, color: "#58a6ff", marginTop: 2 }}>{fmtUSD(c.contract_value_usd)}</div>
                          {caseBlockers.length > 0 && (
                            <div style={{ fontSize: 10, color: "#d29922", marginTop: 2 }}>⚠ {caseBlockers.length} blocker</div>
                          )}
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary table */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>Stage Summary</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #21262d" }}>
              {["Stage", "SLA", "Cases", "ACV", "Red", "Open Blockers"].map((h) => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left" as const, color: "#8b949e", fontWeight: 500, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stages.map((stage) => {
              const stageCases = allCases.filter((c) => c.current_stage === stage.name);
              const stageACV = stageCases.reduce((s, c) => s + c.contract_value_usd, 0);
              const stageBlockers = allBlockers.filter((b) => stageCases.some((c) => c.id === b.case_id) && !b.resolved_at);
              const redCount = stageCases.filter((c) => c.health_score === "red").length;

              return (
                <tr key={stage.name} style={{ borderBottom: "1px solid #21262d" }}>
                  <td style={{ padding: "10px 12px" }}>
                    <Link href={`/stages/${encodeURIComponent(stage.name)}`} style={{ color: "#58a6ff", textDecoration: "none", fontWeight: 500 }}>
                      {stage.name}
                    </Link>
                  </td>
                  <td style={{ padding: "10px 12px", color: "#8b949e" }}>{stage.sla_days}d</td>
                  <td style={{ padding: "10px 12px", color: "#e6edf3" }}>{stageCases.length}</td>
                  <td style={{ padding: "10px 12px", color: stageACV > 0 ? "#e6edf3" : "#30363d" }}>{stageACV > 0 ? fmtUSD(stageACV) : "—"}</td>
                  <td style={{ padding: "10px 12px", color: redCount > 0 ? "#f85149" : "#3fb950" }}>{redCount}</td>
                  <td style={{ padding: "10px 12px", color: stageBlockers.length > 0 ? "#d29922" : "#8b949e" }}>{stageBlockers.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
