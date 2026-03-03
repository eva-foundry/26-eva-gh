type State = "closed" | "open" | "half-open";

export type CircuitBreakerOptions = {
  failureThreshold?: number; // errors before opening
  successThreshold?: number; // successes needed in half-open to close
  cooldownMs?: number;       // open duration before attempting half-open
};

export class CircuitBreaker {
  private state: State = "closed";
  private failures = 0;
  private successes = 0;
  private nextTryAt = 0;

  constructor(private opts: CircuitBreakerOptions = {}) {}

  async exec<T>(fn: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const failureThreshold = Math.max(1, this.opts.failureThreshold ?? 5);
    const successThreshold = Math.max(1, this.opts.successThreshold ?? 2);
    const cooldownMs = Math.max(1000, this.opts.cooldownMs ?? 10000);

    if (this.state === "open") {
      if (now >= this.nextTryAt) {
        this.state = "half-open";
        this.failures = 0;
        this.successes = 0;
      } else {
        throw new Error("Circuit open");
      }
    }

    try {
      const res = await fn();
      if (this.state === "half-open") {
        this.successes++;
        if (this.successes >= successThreshold) {
          this.close();
        }
      } else {
        this.resetCounts();
      }
      return res;
    } catch (e) {
      this.failures++;
      if (this.state === "half-open" || this.failures >= failureThreshold) {
        this.open(cooldownMs);
      }
      throw e;
    }
  }

  private open(ms: number) {
    this.state = "open";
    this.nextTryAt = Date.now() + ms;
  }

  private close() {
    this.state = "closed";
    this.nextTryAt = 0;
    this.resetCounts();
  }

  private resetCounts() {
    this.failures = 0;
    this.successes = 0;
  }
}