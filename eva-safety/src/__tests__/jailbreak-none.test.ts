import { describe, it, expect } from "vitest";
import { detectJailbreak } from "../detectors/jailbreak.js";

describe("Jailbreak detector no matches", () => {
  it("returns empty when no jailbreak phrases present", () => {
    const f = detectJailbreak("Follow the instructions carefully.");
    expect(f.length).toBe(0);
  });
});