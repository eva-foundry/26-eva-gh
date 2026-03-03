/**
 * Exponential backoff utilities with optional full jitter.
 * Based on the AWS architecture recommendations for backoff & jitter.
 */

export type BackoffOptions = {
  /** Base delay (ms) for attempt 0. Default 200. */
  baseMs?: number;
  /** Exponential factor. Default 2. */
  factor?: number;
  /** Maximum delay cap (ms). Default 8000. */
  maxMs?: number;
  /** Jitter strategy: "full" random within range, or "none". Default "full". */
  jitter?: "full" | "none";
};

export function expoDelay(attempt: number, opts: BackoffOptions = {}): number {
  const base = Math.max(1, opts.baseMs ?? 200);
  const factor = Math.max(1, opts.factor ?? 2);
  const maxMs = Math.max(base, opts.maxMs ?? 8000);
  const raw = Math.min(maxMs, base * Math.pow(factor, Math.max(0, attempt)));
  if ((opts.jitter ?? "full") === "full") {
    return Math.random() * raw;
  }
  return raw;
}

/**
 * Linear backoff utility (sometimes useful for rate limiting recovery).
 */
export function linearDelay(attempt: number, stepMs = 250, maxMs = 5000): number {
  const raw = attempt * stepMs;
  return Math.min(raw, maxMs);
}