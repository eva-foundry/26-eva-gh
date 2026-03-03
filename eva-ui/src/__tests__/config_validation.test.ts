import { describe, it, expect } from "vitest";
import { validateIngestionRequest, validatePolicies } from "../config/schema.js";

describe("Config schema validation", () => {
  it("validates ingestion request", () => {
    const ok = validateIngestionRequest({ tenant: "t", inputs: [{ type: "text", content: "x" }] });
    expect(ok.ok).toBe(true);
    const bad = validateIngestionRequest({ tenant: 5, inputs: [] });
    expect(bad.ok).toBe(false);
    expect(bad.errors?.length).toBeGreaterThan(0);
  });

  it("validates policies", () => {
    const ok = validatePolicies({ maxDocs: 10, abortBlockedRatioAbove: 0.4 });
    expect(ok.ok).toBe(true);
    const bad = validatePolicies({ maxDocs: -1, abortBlockedRatioAbove: 1.5, denyResourceTags: "x" });
    expect(bad.ok).toBe(false);
    expect(bad.errors?.length).toBeGreaterThan(0);
  });
});