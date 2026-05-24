import Link from "next/link";
import {
  allCases,
  allBlockers,
  stageFlow,
  healthColor,
  healthBg,
  fmtUSD,
  totalContractValue,
} from "@/lib/data";

export default function CasesPage() {
  const totalACV = totalContractValue();
  const redCount = allCases.filter((c) => c.health_score === "red").length;
  const yellowCount = allCases.filter((c) => c.health_score === "yellow").length;
  const openBlockers = allBlockers.filter((b) => !b.resolved_at).length;
  const stages = stageFlow.stages.map((s) => s.name);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#e6edf3", marginBottom: 4 }}>Active Cases</h1>
        <p style={{ fontSize: 13, color: "#8b949e" }}>
          Implementation pipeline · {allCases.length} accounts · {fmtUSD(totalACV)} total ACV
        </p>
      </div>

      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Total ACV", value: fmtUSD(totalACV), color: "#e6edf3" },
          { label: "At risk (red)", value: String(redCount), color: "#f85149" },
          { label: "Watch (yellow)", value: String(yellowCount), color: "#d29922" },
          { label: "Open blockers", value: String(openBlockers), color: "#d29922" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, padding: "14px 16px" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: 11, color: "#8b949e", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Stage pipeline header */}
      <div style={{ display: "flex", gap: 0, marginBottom: 16, overflowX: "auto" }}>
        {stages.map((s, i) => {
          const count = allCases.filter((c) => c.current_stage === s).length;
          return (
            <Link
              key={s}
              href={`/stages/${encodeURIComponent(s)}`}
              style={{
                flex: 1,
                minWidth: 80,
                padding: "8px 10px",
                background: count > 0 ? "#1f6feb22" : "#161b22",
                border: "1px solid #21262d",
                borderLeft: i === 0 ? "1px solid #21262d" : "none",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              <div style={{ fontSize: 11, color: "#8b949e", marginBottom: 2 }}>{s}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: count > 0 ? "#58a6ff" : "#30363d" }}>{count}</div>
            </Link>
          );
        })}
      </div>

      {/* Cases list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {allCases.map((c) => {
          const caseBlockers = allBlockers.filter((b) => b.case_id === c.id && !b.resolved_at);
          const stage = stageFlow.stages.find((s) => s.name === c.current_stage);
          const slaBreached = stage && c.days_in_stage > stage.sla_days;

          return (
            <Link key={c.id} href={`/cases/${c.id}`} style={{ textDecoration: "none", display: "block" }}>
              <div style={{
                background: "#161b22",
                border: `1px solid ${c.health_score === "red" ? "#f8514933" : "#21262d"}`,
                borderLeft: `3px solid ${healthColor(c.health_score)}`,
                borderRadius: 8,
                padding: "14px 18px",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const, marginBottom: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#e6edf3" }}>{c.customer_company}</span>
                      <span style={{ fontSize: 11, padding: "1px 8px", borderRadius: 12, background: healthBg(c.health_score), color: healthColor(c.health_score) }}>
                        {c.health_score}
                      </span>
                      {slaBreached && (
                        <span style={{ fontSize: 11, padding: "1px 8px", borderRadius: 12, background: "#3d1a1a", color: "#f85149" }}>
                          SLA breached
                        </span>
                      )}
                      {caseBlockers.length > 0 && (
                        <span style={{ fontSize: 11, padding: "1px 8px", borderRadius: 12, background: "#2d2a0f", color: "#d29922" }}>
                          {caseBlockers.length} blocker{caseBlockers.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "#8b949e" }}>{c.health_reason}</div>
                  </div>

                  <div style={{ display: "flex", gap: 20, flexShrink: 0, fontSize: 12, color: "#8b949e", textAlign: "right" as const }}>
                    <div>
                      <div style={{ color: "#e6edf3", fontWeight: 500 }}>{c.current_stage}</div>
                      <div>day {c.days_in_stage}/{stage?.sla_days ?? "?"}</div>
                    </div>
                    <div>
                      <div style={{ color: "#e6edf3", fontWeight: 500 }}>{fmtUSD(c.contract_value_usd)}</div>
                      <div>go-live {c.target_go_live_date}</div>
                    </div>
                    <div>
                      <div style={{ color: "#e6edf3" }}>{c.assigned_im.split("@")[0]}</div>
                      <div>IM</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
