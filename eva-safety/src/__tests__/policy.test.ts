import { describe, it, expect } from "vitest";
import { PolicyEngine, getDefaultPolicy } from "../policy/engine.js";

describe("PolicyEngine", () => {
  it("blocks secrets, sanitizes pii, flags toxicity", () => {
    const policy = getDefaultPolicy();
    const engine = new PolicyEngine(policy);

    const text = "Email x@y.com and token ghp_abcdefghijklmnopqrstuvwxyz1234";
    const ev = engine.evaluate(text);
    expect(ev.blocked).toBe(true);
    expect(ev.appliedRules).toContain("secrets-block");

    const text2 = "Email x@y.com only";
    const ev2 = engine.evaluate(text2);
    expect(ev2.blocked).toBe(false);
    expect(ev2.action === "sanitize" || ev2.sanitizedText !== text2).toBe(true);

    const text3 = "You are dumb";
    const ev3 = engine.evaluate(text3);
    expect(ev3.action === "flag" || ev3.findings.some(f => f.category === "toxicity")).toBe(true);
  });
});