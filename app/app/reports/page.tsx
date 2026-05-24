import { allCases, allBlockers, stageFlow, healthColor, fmtUSD, totalContractValue } from "@/lib/data";

export default function ReportsPage() {
  const totalACV = totalContractValue();
  const redCases = allCases.filter((c) => c.health_score === "red");
  const yellowCases = allCases.filter((c) => c.health_score === "yellow");
  const greenCases = allCases.filter((c) => c.health_score === "green");
  const openBlockers = allBlockers.filter((b) => !b.resolved_at);
  const customerBlockers = openBlockers.filter((b) => b.owner === "customer");
  const internalBlockers = openBlockers.filter((b) => b.owner === "us");

  const slaBreachedCases = allCases.filter((c) => {
    const stage = stageFlow.stages.find((s) => s.name === c.current_stage);
    return stage && c.days_in_stage > stage.sla_days;
  });

  const avgDaysInStage = allCases.length > 0
    ? (allCases.reduce((s, c) => s + c.days_in_stage, 0) / allCases.length).toFixed(1)
    : "—";

  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#e6edf3", marginBottom: 4 }}>QBR Report</h1>
            <p style={{ fontSize: 13, color: "#8b949e" }}>Quarterly business review · Generated {today}</p>
          </div>
          <div style={{ fontSize: 11, color: "#8b949e", textAlign: "right" as const }}>
            <div>Tenant: Helix</div>
            <div>Period: Q2 2026</div>
          </div>
        </div>
      </div>

      {/* Executive summary metrics */}
      <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, padding: "20px 24px", marginBottom: 24 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 16 }}>Executive Summary</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {[
            { label: "Accounts in flight", value: String(allCases.length), color: "#e6edf3" },
            { label: "Total ACV", value: fmtUSD(totalACV), color: "#e6edf3" },
            { label: "On track (green)", value: `${greenCases.length} (${Math.round(greenCases.length / allCases.length * 100)}%)`, color: "#3fb950" },
            { label: "SLA breaches", value: String(slaBreachedCases.length), color: slaBreachedCases.length > 0 ? "#f85149" : "#3fb950" },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div style={{ fontSize: 24, fontWeight: 700, color, marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 11, color: "#8b949e" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Health distribution */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Health breakdown */}
        <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, padding: "16px 20px" }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>Health Distribution</h3>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
            {[
              { label: "Green — On track", count: greenCases.length, color: "#3fb950" },
              { label: "Yellow — Needs attention", count: yellowCases.length, color: "#d29922" },
              { label: "Red — At risk", count: redCases.length, color: "#f85149" },
            ].map(({ label, count, color }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
                <span style={{ color: "#8b949e" }}>{label}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: Math.max(4, count / allCases.length * 80), height: 6, background: color, borderRadius: 3 }} />
                  <span style={{ color, fontWeight: 600, minWidth: 20, textAlign: "right" as const }}>{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blocker breakdown */}
        <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, padding: "16px 20px" }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>Open Blockers</h3>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#8b949e" }}>Total open</span>
              <span style={{ color: "#e6edf3", fontWeight: 600 }}>{openBlockers.length}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#8b949e" }}>Customer-owned</span>
              <span style={{ color: "#f85149", fontWeight: 600 }}>{customerBlockers.length}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#8b949e" }}>Internal</span>
              <span style={{ color: "#d29922", fontWeight: 600 }}>{internalBlockers.length}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#8b949e" }}>Avg days in stage</span>
              <span style={{ color: "#e6edf3", fontWeight: 600 }}>{avgDaysInStage}</span>
            </div>
          </div>
        </div>
      </div>

      {/* At-risk accounts */}
      {redCases.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "#f85149", marginBottom: 12 }}>At-Risk Accounts ({redCases.length})</h2>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
            {redCases.map((c) => (
              <div key={c.id} style={{ background: "#3d1a1a", border: "1px solid #f8514933", borderRadius: 8, padding: "12px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 4 }}>{c.customer_company}</div>
                    <div style={{ fontSize: 12, color: "#8b949e" }}>{c.health_reason}</div>
                  </div>
                  <div style={{ textAlign: "right" as const, flexShrink: 0, fontSize: 12, color: "#8b949e" }}>
                    <div style={{ color: "#e6edf3", fontWeight: 500 }}>{fmtUSD(c.contract_value_usd)}</div>
                    <div>{c.current_stage} · day {c.days_in_stage}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stage distribution */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>Stage Distribution</h2>
        <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #21262d" }}>
                {["Stage", "SLA", "Cases", "ACV", "SLA Status"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left" as const, fontSize: 11, color: "#8b949e", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stageFlow.stages.map((stage) => {
                const stageCases = allCases.filter((c) => c.current_stage === stage.name);
                const stageACV = stageCases.reduce((s, c) => s + c.contract_value_usd, 0);
                const breached = stageCases.filter((c) => c.days_in_stage > stage.sla_days).length;
                return (
                  <tr key={stage.name} style={{ borderBottom: "1px solid #21262d" }}>
                    <td style={{ padding: "10px 14px", color: "#e6edf3", fontWeight: 500 }}>{stage.name}</td>
                    <td style={{ padding: "10px 14px", color: "#8b949e" }}>{stage.sla_days}d</td>
                    <td style={{ padding: "10px 14px", color: stageCases.length > 0 ? "#e6edf3" : "#30363d" }}>{stageCases.length}</td>
                    <td style={{ padding: "10px 14px", color: stageACV > 0 ? "#e6edf3" : "#30363d" }}>{stageACV > 0 ? fmtUSD(stageACV) : "—"}</td>
                    <td style={{ padding: "10px 14px", color: breached > 0 ? "#f85149" : "#3fb950" }}>
                      {breached > 0 ? `${breached} breached` : "OK"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* All open blockers */}
      <div>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>All Open Blockers</h2>
        {openBlockers.length === 0 ? (
          <div style={{ fontSize: 13, color: "#3fb950" }}>No open blockers.</div>
        ) : (
          <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #21262d" }}>
                  {["Account", "Owner", "Tag", "Description", "Age"].map((h) => (
                    <th key={h} style={{ padding: "9px 12px", textAlign: "left" as const, fontSize: 11, color: "#8b949e", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {openBlockers.map((b) => {
                  const c = allCases.find((c) => c.id === b.case_id);
                  return (
                    <tr key={b.id} style={{ borderBottom: "1px solid #21262d" }}>
                      <td style={{ padding: "9px 12px", color: "#e6edf3" }}>{c?.customer_company ?? b.case_id}</td>
                      <td style={{ padding: "9px 12px" }}>
                        <span style={{ color: b.owner === "customer" ? "#f85149" : "#58a6ff" }}>
                          {b.owner === "customer" ? "Customer" : "Internal"}
                        </span>
                      </td>
                      <td style={{ padding: "9px 12px", color: "#8b949e", fontFamily: "monospace", fontSize: 11 }}>{b.tag}</td>
                      <td style={{ padding: "9px 12px", color: "#c9d1d9" }}>{b.description}</td>
                      <td style={{ padding: "9px 12px", color: b.age_days >= 7 ? "#f85149" : "#8b949e" }}>{b.age_days}d</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
