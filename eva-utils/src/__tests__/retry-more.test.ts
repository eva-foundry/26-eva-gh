import { describe, it, expect } from "vitest";

import { retry } from "../retry/retry.js";

describe("retry more cases", () => {
  it("succeeds without retries when first attempt passes", async () => {
    const value = await retry(async () => "ok", { retries: 0 });
    expect(value).toBe("ok");
  });

  it("succeeds on last allowed retry", async () => {
    let n = 0;
    const value = await retry(
      async () => {
        if (n++ < 2) throw new Error("nope");
        return "done";
      },
      { retries: 2, baseMs: 1, maxMs: 2, jitter: "none" }
    );
    expect(n).toBe(3);
    expect(value).toBe("done");
  });

  it("respects per-attempt timeout when success is fast", async () => {
    const val = await retry(
      async () => {
        await new Promise((r) => setTimeout(r, 2));
        return "ok";
      },
      { retries: 1, timeoutMs: 50 }
    );
    expect(val).toBe("ok");
  });
});