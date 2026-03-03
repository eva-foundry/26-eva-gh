import { describe, it, expect } from "vitest";
import { PolicyEngine, getDefaultPolicy } from "../policy/engine.js";
import type { Detector, Policy } from "../types.js";

describe("PolicyEngine advanced paths", () => {
  it("resilient to detector failures and defaults to allow", () => {
    const badDetector: Detector = () => { throw new Error("boom"); };
    const okDetector: Detector = () => [];
    const engine = new PolicyEngine(getDefaultPolicy(), [badDetector, okDetector]);
    const ev = engine.evaluate("harmless");
    expect(ev.blocked).toBe(false);
    expect(ev.action).toBe("allow");
  });

  it("action precedence: block > sanitize > flag > allow with short-circuit", () => {
    const policy: Policy = {
      rules: [
        { id: "flag-tox", categories: ["toxicity"], minSeverity: "low", action: "flag" },
        { id: "sanitize-pii", categories: ["pii"], minSeverity: "low", action: "sanitize", redaction: "partial" },
        { id: "block-secrets", categories: ["secret"], minSeverity: "low", action: "block" },
      ]
    };
    const engine = new PolicyEngine(policy);
    // Contains both pii and secret; should block and short-circuit
    const ev = engine.evaluate("Email a@b.com and token ghp_abcdefghijklmnopqrstuvwxyz1234");
    expect(ev.blocked).toBe(true);
    expect(ev.appliedRules).toContain("block-secrets");
    // The sanitize rule may appear in appliedRules depending on evaluation order,
    // but the final action must be block.
    expect(ev.action).toBe("block");
  });

  it("partial redaction mode from policy is applied", () => {
    const policy: Policy = {
      rules: [{ id: "pii-partial", categories: ["pii"], minSeverity: "medium", action: "sanitize", redaction: "partial" }]
    };
    const engine = new PolicyEngine(policy);
    const input = "email john.doe@example.com";
    const ev = engine.evaluate(input);
    expect(ev.blocked).toBe(false);
    // Content should be sanitized but likely preserve last portions of PII based on partial behavior
    expect(ev.sanitizedText).not.toBe(input);
  });
});