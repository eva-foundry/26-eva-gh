import type { GovernancePolicies } from "../rag/ingestion/policies.js";
import type { IngestionRequest } from "../rag/ingestion/types.js";

export type ValidationResult = { ok: boolean; errors?: string[] };

export function validateIngestionRequest(req: any): ValidationResult {
  const errs: string[] = [];
  if (!req || typeof req !== "object") errs.push("Request must be object");
  if (!req.tenant || typeof req.tenant !== "string") errs.push("tenant required");
  if (!Array.isArray(req.inputs) || req.inputs.length === 0) errs.push("inputs must be non-empty array");
  else {
    for (const [i, inp] of req.inputs.entries()) {
      if (!inp || typeof inp !== "object") errs.push(`inputs[${i}] must be object`);
      if (!["text", "file", "url"].includes(inp.type)) errs.push(`inputs[${i}].type invalid`);
      if (inp.type === "text" && typeof inp.content !== "string") errs.push(`inputs[${i}].content required`);
      if (inp.type === "file" && typeof inp.path !== "string") errs.push(`inputs[${i}].path required`);
      if (inp.type === "url" && typeof inp.url !== "string") errs.push(`inputs[${i}].url required`);
    }
  }
  return errs.length ? { ok: false, errors: errs } : { ok: true };
}

export function validatePolicies(p: any): ValidationResult {
  const errs: string[] = [];
  if (!p || typeof p !== "object") return { ok: true };
  const posInt = (v: any, name: string) => {
    if (v != null && (!Number.isInteger(v) || v < 0)) errs.push(`${name} must be non-negative integer`);
  };
  const ratio = (v: any, name: string) => {
    if (v != null && (typeof v !== "number" || v < 0 || v > 1)) errs.push(`${name} must be 0..1`);
  };
  posInt(p.maxTenantConcurrent, "maxTenantConcurrent");
  posInt(p.maxDocs, "maxDocs");
  posInt(p.maxDocBytes, "maxDocBytes");
  posInt(p.chunkCountCap, "chunkCountCap");
  if (p.embeddingCostBudgetUSD != null && (typeof p.embeddingCostBudgetUSD !== "number" || p.embeddingCostBudgetUSD < 0)) errs.push("embeddingCostBudgetUSD must be number >= 0");
  ratio(p.abortBlockedRatioAbove, "abortBlockedRatioAbove");
  if (p.denyResourceTags && !Array.isArray(p.denyResourceTags)) errs.push("denyResourceTags must be array");
  if (p.allowResourceTags && !Array.isArray(p.allowResourceTags)) errs.push("allowResourceTags must be array");
  return errs.length ? { ok: false, errors: errs } : { ok: true };
}