import { describe, it, expect } from "vitest";
import { detectToxicity } from "../detectors/toxicity.js";

describe("Toxicity detector no matches", () => {
  it("returns empty list when no toxic terms present", () => {
    const f = detectToxicity("Have a wonderful day!");
    expect(Array.isArray(f)).toBe(true);
    expect(f.length).toBe(0);
  });
});