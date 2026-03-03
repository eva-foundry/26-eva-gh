import { describe, it, expect } from "vitest";
import { detectSecrets } from "../detectors/secrets.js";

describe("Secrets detector edge cases", () => {
  it("detects multiple secrets and advances lastIndex across lines", () => {
    const text = [
      "sk-abcdefghABCDEFGH1234567890abcd",
      "another ghp_abcdefghijklmnopqrstuvwxyz1234 here",
      "jwt eyJhbGciOiJ9.eyJzdWIiOiIxIn0.sgn"
    ].join("\n");
    const f = detectSecrets(text);
    const labels = f.map(x => x.label);
    expect(labels).toEqual(expect.arrayContaining([
      "secret.openai_key",
      "secret.github_pat",
      "secret.jwt_token"
    ]));
    // Ensure we have 3 findings (one per line)
    expect(f.length).toBe(3);
  });

  it("handles tokens with underscores and dashes in JWT segments", () => {
    const text = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30._AbC-123";
    const f = detectSecrets(text);
    expect(f.some(x => x.label === "secret.jwt_token")).toBe(true);
  });
});