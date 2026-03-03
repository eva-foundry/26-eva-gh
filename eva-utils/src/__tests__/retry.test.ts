import { describe, it, expect } from "vitest";

import { retry } from "../retry/retry.js";

describe("retry", () => {
  it("succeeds after retries", async () => {
    let attempts = 0;
    const value = await retry(
      async () => {
        if (attempts++ < 2) throw new Error("fail");
        return "ok";
      },
      { retries: 3, baseMs: 1, maxMs: 2, jitter: "none" }
    );
    expect(value).toBe("ok");
    expect(attempts).toBe(3);
  });

  it("throws when retries exhausted", async () => {
    await expect(
      retry(
        async () => {
          throw new Error("boom");
        },
        { retries: 2, baseMs: 1, maxMs: 2, jitter: "none" }
      )
    ).rejects.toThrow("boom");
  });
});