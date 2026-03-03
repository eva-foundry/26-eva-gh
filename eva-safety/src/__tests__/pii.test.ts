import { describe, it, expect } from "vitest";

import { detectPII, luhnValid } from "../detectors/pii.js";
import { redactText } from "../redaction/redactor.js";

describe("PII detector", () => {
  it("detects email, phone, ssn, ip", () => {
    const text = "john.doe@example.com call 555-123-4567 ssn 123-45-6789 ip 127.0.0.1";
    const f = detectPII(text);
    const labels = f.map(x => x.label);
    expect(labels).toEqual(expect.arrayContaining(["pii.email", "pii.phone", "pii.ssn", "pii.ip"]));
  });

  it("validates credit card numbers via Luhn and redacts partial", () => {
    const text = "card 4111 1111 1111 1111 is visa";
    const f = detectPII(text);
    const cc = f.find(x => x.label === "pii.cc");
    expect(cc).toBeTruthy();
    const red = redactText(text, [cc!.span!], "partial");
    expect(red).toMatch("1111"); // last 4 remain
  });

  it("luhnValid false on bad number", () => {
    expect(luhnValid("1234567890123456")).toBe(false);
  });
});
