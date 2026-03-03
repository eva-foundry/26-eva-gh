import type { HistogramSnapshot } from "../types.js";

/**
Compute percentile estimates from histogram buckets.
Assumptions: buckets sorted ascending by le; counts cumulative per bucket.
*/
export function estimatePercentile(snapshot: HistogramSnapshot, p: number): number {
  if (snapshot.count === 0) return 0;
  const target = Math.ceil((p / 100) * snapshot.count);
  let prevCount = 0;
  let prevLe = 0;
  for (const b of snapshot.buckets) {
    if (b.count >= target) {
      const spanCount = b.count - prevCount;
      const posInSpan = target - prevCount;
      const lower = prevLe;
      const upper = b.le;
      const ratio = spanCount > 0 ? posInSpan / spanCount : 0;
      return lower + (upper - lower) * ratio;
    }
    prevCount = b.count;
    prevLe = b.le;
  }
  return snapshot.buckets[snapshot.buckets.length - 1]?.le ?? 0;
}

export function estimatePercentiles(snapshot: HistogramSnapshot, points: number[]): Record<number, number> {
  const out: Record<number, number> = {};
  for (const p of points) out[p] = estimatePercentile(snapshot, p);
  return out;
}