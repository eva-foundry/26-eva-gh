import { describe, it, expect } from "vitest";

import { retry } from "../retry/retry.js";
import { expoDelay, linearDelay } from "../retry/backoff.js";

describe("retry advanced", () => {
  it("stops immediately when classify=fail", async () => {
    let calls = 0;
    await expect(
      retry(
        async () => {
          calls++;
          throw new Error("fatal");
        },
        { retries: 5, classify: () => "fail", baseMs: 1, maxMs: 1, jitter: "none" }
      )
    ).rejects.toThrow("fatal");
    expect(calls).toBe(1);
  });

  it("obeys timeout per attempt", async () => {
    const start = Date.now();
    await expect(
      retry(
        async () => {
          await new Promise((r) => setTimeout(r, 10));
          return "slow";
        },
        { retries: 0, timeoutMs: 1 }
      )
    ).rejects.toThrow(/timeout/i);
    expect(Date.now() - start).toBeLessThan(50);
  });

  it("supports cancellation via AbortSignal", async () => {
    const ac = new AbortController();
    const p = retry(
      async () => {
        throw new Error("retryable");
      },
      { retries: 3, baseMs: 5, maxMs: 5, jitter: "none", signal: ac.signal }
    );
    ac.abort();
    await expect(p).rejects.toThrow(/abort/i);
  });

  it("expoDelay and linearDelay behave deterministically without jitter", () => {
    expect(expoDelay(0, { baseMs: 10, factor: 2, maxMs: 100, jitter: "none" })).toBe(10);
    expect(expoDelay(3, { baseMs: 10, factor: 2, maxMs: 100, jitter: "none" })).toBe(80);
    expect(expoDelay(10, { baseMs: 10, factor: 2, maxMs: 100, jitter: "none" })).toBe(100);

    expect(linearDelay(0, 100, 250)).toBe(0);
    expect(linearDelay(3, 100, 250)).toBe(250); // capped
  });
});