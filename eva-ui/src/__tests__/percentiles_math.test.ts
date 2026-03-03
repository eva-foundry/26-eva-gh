import { describe, it, expect } from "vitest";
import { estimatePercentile, estimatePercentiles } from "../metrics/percentiles.js";

describe("Histogram percentiles", () => {
  const snap = {
    name: "h",
    help: "",
    labels: {},
    sum: 6,
    count: 6,
    buckets: [
      { le: 0.5, count: 1 },
      { le: 1, count: 3 },
      { le: 2.5, count: 5 },
      { le: 5, count: 6 }
    ]
  };

  it("estimates p50 and p95", () => {
    const p50 = estimatePercentile(snap as any, 50);
    const p95 = estimatePercentile(snap as any, 95);
    expect(p50).toBeGreaterThan(0.5);
    expect(p95).toBeGreaterThan(2.5);
  });

  it("estimates multiple points", () => {
    const m = estimatePercentiles(snap as any, [50, 90]);
    expect(m[50]).toBeDefined();
    expect(m[90]).toBeDefined();
  });
});