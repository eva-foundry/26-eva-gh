import { describe, it, expect } from "vitest";

import { loadConfig, ConfigSchema } from "../config/index.js";

describe("config edges", () => {
  it("rejects invalid KEYVAULT_URI via schema", () => {
    expect(() =>
      ConfigSchema.parse({
        env: "test",
        region: "eastus",
        keyVaultUri: "not-a-url"
      })
    ).toThrow();
  });

  it("prefers overrides over env defaults", () => {
    const cfg = loadConfig({ region: "centralus" });
    expect(cfg.region).toBe("centralus");
  });

  it("uses defaults when env vars not set", () => {
    const cfg = loadConfig();
    expect(cfg.env.length).toBeGreaterThan(0);
    expect(cfg.region).toBeTruthy();
  });
});