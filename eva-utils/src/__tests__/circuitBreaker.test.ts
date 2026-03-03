import { describe, it, expect } from "vitest";

import { CircuitBreaker } from "../retry/circuitBreaker.js";

describe("CircuitBreaker", () => {
  it("opens after threshold failures", async () => {
    const breaker = new CircuitBreaker({ failureThreshold: 2, cooldownMs: 50 });
    await expect(
      breaker.exec(async () => {
        throw new Error("fail");
      })
    ).rejects.toThrow();
    await expect(
      breaker.exec(async () => {
        throw new Error("fail");
      })
    ).rejects.toThrow();
    // Third call should be blocked (still open)
    await expect(
      breaker.exec(async () => {
        throw new Error("fail");
      })
    ).rejects.toThrow(/Circuit open/);
  });
});