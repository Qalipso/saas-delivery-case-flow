import { notFound } from "next/navigation";
import Link from "next/link";
import { getStage, getCasesInStage, allBlockers, healthColor, healthBg, fmtUSD, stageFlow } from "@/lib/data";

export function generateStaticParams() {
  return stageFlow.stages.map((s) => ({ name: encodeURIComponent(s.name) }));
}

interface Props {
  params: Promise<{ name: string }>;
}

export default async function StageDetailPage({ params }: Props) {
  const { name } = await params;
  const stageName = decodeURIComponent(name);
  const stage = getStage(stageName);
  if (!stage) notFound();

  const cases = getCasesInStage(stageName);
  const stageACV = cases.reduce((s, c) => s + c.contract_value_usd, 0);
  const allStageNames = stageFlow.stages.map((s) => s.name);

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 16 }}>
        <Link href="/pipeline" style={{ color: "#58a6ff", textDecoration: "none" }}>Pipeline</Link>
        {" / "}
        <span style={{ color: "#e6edf3" }}>{stageName}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#e6edf3", marginBottom: 4 }}>{stageName}</h1>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#8b949e" }}>
          <span>SLA: <strong style={{ color: "#e6edf3" }}>{stage.sla_days} days</strong></span>
          <span>Role: <strong style={{ color: "#e6edf3" }}>{stage.required_role}</strong></span>
          <span>Cases: <strong style={{ color: "#58a6ff" }}>{cases.length}</strong></span>
          {stageACV > 0 && <span>ACV: <strong style={{ color: "#e6edf3" }}>{fmtUSD(stageACV)}</strong></span>}
        </div>
      </div>

      {/* Stage nav */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" as const }}>
        {allStageNames.map((s) => (
          <Link
            key={s}
            href={`/stages/${encodeURIComponent(s)}`}
            style={{
              padding: "4px 12px",
              borderRadius: 16,
              fontSize: 12,
              textDecoration: "none",
              background: s === stageName ? "#1f6feb" : "#161b22",
              color: s === stageName ? "white" : "#8b949e",
              border: "1px solid #21262d",
            }}
          >
            {s}
          </Link>
        ))}
      </div>

      {/* Handoff requirements */}
      <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#e6edf3", marginBottom: 10 }}>Handoff Requirements</h2>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
          {(stage.handoff_form_schema as { required?: string[] }).required?.map((field: string) => (
            <span key={field} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 12, background: "#0d1117", border: "1px solid #30363d", color: "#8b949e", fontFamily: "monospace" }}>
              {field}
            </span>
          ))}
        </div>
      </div>

      {/* Cases in this stage */}
      <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>
        Cases in {stageName} ({cases.length})
      </h2>

      {cases.length === 0 ? (
        <div style={{ fontSize: 13, color: "#8b949e", padding: "24px 0" }}>No cases currently in this stage.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
          {cases.map((c) => {
            const caseBlockers = allBlockers.filter((b) => b.case_id === c.id && !b.resolved_at);
            const slaBreached = c.days_in_stage > stage.sla_days;

            return (
              <Link key={c.id} href={`/cases/${c.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#161b22",
                  border: `1px solid ${slaBreached ? "#f8514933" : "#21262d"}`,
                  borderLeft: `3px solid ${healthColor(c.health_score)}`,
                  borderRadius: 8,
                  padding: "14px 18px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" as const, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3" }}>{c.customer_company}</span>
                        <span style={{ fontSize: 11, padding: "1px 8px", borderRadius: 12, background: healthBg(c.health_score), color: healthColor(c.health_score) }}>
                          {c.health_score}
                        </span>
                        {slaBreached && <span style={{ fontSize: 11, color: "#f85149" }}>⚠ SLA breached</span>}
                        {caseBlockers.length > 0 && <span style={{ fontSize: 11, color: "#d29922" }}>{caseBlockers.length} open blocker{caseBlockers.length > 1 ? "s" : ""}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: "#8b949e" }}>{c.health_reason}</div>
                    </div>
                    <div style={{ textAlign: "right" as const, flexShrink: 0, fontSize: 12, color: "#8b949e" }}>
                      <div style={{ color: "#e6edf3", fontWeight: 500 }}>Day {c.days_in_stage} / {stage.sla_days}</div>
                      <div>{fmtUSD(c.contract_value_usd)}</div>
                      <div>{c.assigned_im.split("@")[0]}</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
