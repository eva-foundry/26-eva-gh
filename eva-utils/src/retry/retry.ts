import type { BackoffOptions } from "./backoff.js";
import { expoDelay } from "./backoff.js";

export type RetryOptions = BackoffOptions & {
  retries?: number;          // number of retries (not attempts)
  timeoutMs?: number;        // per-attempt timeout
  classify?: (e: unknown) => "retry" | "fail"; // classify errors
  signal?: AbortSignal;      // cancellation
};

export async function retry<T>(fn: () => Promise<T>, opts: RetryOptions = {}): Promise<T> {
  const retries = Math.max(0, opts.retries ?? 3);
  const classify = opts.classify ?? (() => "retry");

  let attempt = 0;
  while (true) {
    try {
      const res = await runWithTimeout(fn, opts.timeoutMs, opts.signal);
      return res;
    } catch (e) {
      const mode = classify(e);
      if (mode === "fail" || attempt >= retries || opts.signal?.aborted) {
        throw e;
      }
      const delay = expoDelay(attempt, opts);
      await sleep(delay, opts.signal);
      attempt++;
    }
  }
}

async function runWithTimeout<T>(fn: () => Promise<T>, timeoutMs?: number, signal?: AbortSignal): Promise<T> {
  if (!timeoutMs && !signal) return fn();

  return new Promise<T>((resolve, reject) => {
    let done = false;

    const onAbort = () => {
      if (done) return;
      done = true;
      reject(new Error("Retry aborted"));
    };

    let to: NodeJS.Timeout | undefined;
    if (timeoutMs) {
      to = setTimeout(() => {
        if (done) return;
        done = true;
        reject(new Error("Retry timeout"));
      }, timeoutMs);
    }

    if (signal) {
      if (signal.aborted) return onAbort();
      signal.addEventListener("abort", onAbort, { once: true });
    }

    fn().then(
      (v) => {
        if (done) return;
        done = true;
        if (to) clearTimeout(to);
        if (signal) signal.removeEventListener("abort", onAbort);
        resolve(v);
      },
      (err) => {
        if (done) return;
        done = true;
        if (to) clearTimeout(to);
        if (signal) signal.removeEventListener("abort", onAbort);
        reject(err);
      }
    );
  });
}

function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) return reject(new Error("Sleep aborted"));
    const t = setTimeout(() => resolve(), ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(t);
      reject(new Error("Sleep aborted"));
    }, { once: true });
  });
}