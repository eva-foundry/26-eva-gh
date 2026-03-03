import { describe, it, expect } from "vitest";
import { redactText, sanitizeObjectDeep, collectSpans, sanitizeText } from "../redaction/redactor.js";

describe("Redactor extras", () => {
  it("returns original text when spans are empty", () => {
    const text = "no change";
    const red = redactText(text, [], "full", "*");
    expect(red).toBe(text);
  });

  it("partial masking masks entirely when digits < 6", () => {
    const text = "code 1234 end";
    // Pretend this is a short numeric that shouldn't preserve last4
    const red = redactText(text, [{ start: 5, end: 9 }], "partial", "*");
    // "1234" becomes "****"
    expect(red).toBe("code **** end");
  });

  it("sanitizeObjectDeep redacts deeply nested strings and preserves non-strings", () => {
    const nested = {
      a: "email a@b.com",
      b: [1, "ssn 123-45-6789", { c: "ip 127.0.0.1", d: true }],
      e: null,
    };
    const sanitized = sanitizeObjectDeep(nested, (s) => s.replace(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi, "[redacted]"));
    expect(sanitized.a).toContain("[redacted]");
    expect(sanitized.b[0]).toBe(1);
    expect(typeof (sanitized as any).b[2].d).toBe("boolean");
  });

  it("collectSpans only returns pii/secret spans", () => {
    const findings = [
      { category: "pii", severity: "medium", label: "pii.email", span: { start: 1, end: 3 } },
      { category: "toxicity", severity: "medium", label: "toxicity.hate" },
      { category: "secret", severity: "high", label: "secret.jwt", span: { start: 5, end: 9 } },
    ] as any;
    const spans = collectSpans(findings, ["pii", "secret"]);
    expect(spans).toEqual([{ start: 1, end: 3 }, { start: 5, end: 9 }]);
  });

  it("sanitizeText preserves original length with full mode", () => {
    const text = "token ghp_abcdefghijklmnopqrstuvwxyz1234";
    const spans = [{ start: 6, end: text.length }]; // cover token part
    const f = [{ category: "secret", severity: "critical", label: "secret.github_pat", span: spans[0] }] as any;
    const out = sanitizeText(text, f, "full");
    expect(out.length).toBe(text.length);
    expect(out).not.toContain("ghp_");
  });
});