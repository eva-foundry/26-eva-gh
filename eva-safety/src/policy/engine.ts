import type { Detector, Evaluation, Finding, Policy, Rule, RuleAction, Severity } from "../types.js";
import { detectPII } from "../detectors/pii.js";
import { detectSecrets } from "../detectors/secrets.js";
import { detectToxicity } from "../detectors/toxicity.js";
import { detectJailbreak } from "../detectors/jailbreak.js";
import { sanitizeText } from "../redaction/redactor.js";

const SEV_RANK: Record<Severity, number> = { low: 1, medium: 2, high: 3, critical: 4 };

export class PolicyEngine {
  constructor(private readonly policy: Policy, private readonly detectors: Detector[] = [detectPII, detectSecrets, detectToxicity, detectJailbreak]) {}

  evaluate(text: string): Evaluation {
    const findings = this.runDetectors(text);
    const { action, appliedRules, redactionMode } = this.applyRules(findings);
    const blocked = action === "block";
    const sanitizedText = action === "sanitize" ? sanitizeText(text, findings, redactionMode) : text;
    return { blocked, action, sanitizedText, findings, appliedRules };
  }

  private runDetectors(text: string): Finding[] {
    const out: Finding[] = [];
    for (const d of this.detectors) {
      try {
        out.push(...d(text));
      } catch {
        // detector failures are ignored to avoid blocking
      }
    }
    return out;
  }

  private applyRules(findings: Finding[]): { action: RuleAction; appliedRules: string[]; redactionMode: "full" | "partial" } {
    // Highest severity per category drives rule evaluation
    const maxByCat = new Map<string, Severity>();
    for (const f of findings) {
      const prev = maxByCat.get(f.category);
      if (!prev || SEV_RANK[f.severity] > SEV_RANK[prev]) maxByCat.set(f.category, f.severity);
    }

    let finalAction: RuleAction = "allow";
    let redactionMode: "full" | "partial" = "full";
    const applied: string[] = [];

    for (const r of this.policy.rules) {
      const min = r.minSeverity ?? "low";
      const match = r.categories.some((c) => {
        const sev = maxByCat.get(c);
        return sev && SEV_RANK[sev] >= SEV_RANK[min];
      });
      if (!match) continue;

      applied.push(r.id);
      // action precedence: block > sanitize > flag > allow
      if (r.action === "block") finalAction = "block";
      else if (r.action === "sanitize" && finalAction !== "block") {
        finalAction = "sanitize";
        redactionMode = r.redaction ?? redactionMode;
      } else if (r.action === "flag" && finalAction === "allow") {
        finalAction = "flag";
      }
      if (finalAction === "block") break; // short-circuit on block
    }

    return { action: finalAction, appliedRules: applied, redactionMode };
  }
}

export function getDefaultPolicy(): Policy {
  return {
    rules: [
      { id: "secrets-block", categories: ["secret"], minSeverity: "low", action: "block" },
      { id: "pii-sanitize", categories: ["pii"], minSeverity: "medium", action: "sanitize", redaction: "partial" },
      { id: "jailbreak-block", categories: ["jailbreak"], minSeverity: "low", action: "block" },
      { id: "toxicity-flag", categories: ["toxicity"], minSeverity: "medium", action: "flag" }
    ]
  };
}