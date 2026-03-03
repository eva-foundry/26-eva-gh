export type TokenBudgetOptions = { limit: number };

export class TokenBudget {
  private used = 0;
  constructor(private opts: TokenBudgetOptions) {
    if (opts.limit <= 0) throw new Error("TokenBudget.limit must be > 0");
  }
  spend(n: number) {
    if (n < 0) throw new Error("Cannot spend negative tokens");
    if (this.used + n > this.opts.limit) throw new Error("Budget exceeded");
    this.used += n;
  }
  remaining() {
    return this.opts.limit - this.used;
  }
  reset() {
    this.used = 0;
  }
}