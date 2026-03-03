import { describe, it, expect } from "vitest";

import { loadConfig } from "../config/index.js";

describe("loadConfig", () => {
  it("returns defaults", () => {
    const cfg = loadConfig();
    expect(cfg.env.length).toBeGreaterThan(0);
    expect(cfg.region).toBeTruthy();
  });

  it("applies overrides", () => {
    const cfg = loadConfig({ region: "centralus" });
    expect(cfg.region).toBe("centralus");
  });
});