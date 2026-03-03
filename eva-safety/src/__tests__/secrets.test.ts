import { describe, it, expect } from "vitest";
import { detectSecrets } from "../detectors/secrets.js";
import { sanitizeText } from "../redaction/redactor.js";

describe("Secrets detector", () => {
  it("detects AWS, GitHub, OpenAI keys and JWT", () => {
    const text = "AKIA1234567890ABCD ghp_abcdefghijklmnopqrstuvwxyz1234 sk-abc123456789012345678901 jwt eyJhbGciOiJ9.eyJzdWIiOiIxIn0.sgn";
    const f = detectSecrets(text);
    const labels = f.map(x => x.label);
    expect(labels).toEqual(expect.arrayContaining(["secret.aws_access_key","secret.github_pat","secret.openai_key","secret.jwt_token"]));

    const sanitized = sanitizeText(text, f, "full");
    expect(sanitized).not.toContain("AKIA");
    expect(sanitized).toHaveLength(text.length);
  });
});