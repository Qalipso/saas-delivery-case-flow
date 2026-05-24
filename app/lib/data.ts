import rawCases from "../mock-data/cases.json";
import rawBlockers from "../mock-data/blockers.json";
import rawStageFlow from "../mock-data/stage-flow.json";

// ── Types ─────────────────────────────────────────────────────────────────────

export type HealthScore = "green" | "yellow" | "red";

export interface Case {
  id: string;
  tenant_id: string;
  customer_company: string;
  contract_value_usd: number;
  target_go_live_date: string;
  actual_go_live_date?: string | null;
  current_stage: string;
  days_in_stage: number;
  health_score: HealthScore;
  health_reason: string;
  assigned_im: string;
  created_at: string;
  open_blockers: number;
}

export interface Blocker {
  id: string;
  case_id: string;
  owner: "customer" | "us";
  tag: string;
  description: string;
  opened_at: string;
  resolved_at: string | null;
  linked_ticket_url: string | null;
  age_days: number;
}

export interface Stage {
  name: string;
  sla_days: number;
  required_role: string;
  handoff_form_schema: Record<string, unknown>;
}

export interface StageFlow {
  tenant_id: string;
  name: string;
  stages: Stage[];
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const allCases: Case[] = rawCases as Case[];
export const allBlockers: Blocker[] = rawBlockers as Blocker[];
export const stageFlow: StageFlow = rawStageFlow as StageFlow;

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCase(id: string): Case | undefined {
  return allCases.find((c) => c.id === id);
}

export function getBlockersForCase(caseId: string): Blocker[] {
  return allBlockers.filter((b) => b.case_id === caseId);
}

export function getStage(name: string): Stage | undefined {
  return stageFlow.stages.find((s) => s.name === name);
}

export function getCasesInStage(stageName: string): Case[] {
  return allCases.filter((c) => c.current_stage === stageName);
}

export function healthColor(score: HealthScore): string {
  return score === "green" ? "#3fb950" : score === "yellow" ? "#d29922" : "#f85149";
}

export function healthBg(score: HealthScore): string {
  return score === "green" ? "#1a3a1a" : score === "yellow" ? "#2d2a0f" : "#3d1a1a";
}

export function fmtUSD(n: number): string {
  return `$${(n / 1000).toFixed(0)}k`;
}

export function stageIndex(stageName: string): number {
  return stageFlow.stages.findIndex((s) => s.name === stageName);
}

export function totalContractValue(): number {
  return allCases.reduce((s, c) => s + c.contract_value_usd, 0);
}
