import { describe, it, expect } from "vitest";

import { TokenBudget } from "../budget/tokenBudget.js";

describe("TokenBudget", () => {
  it("tracks remaining tokens and allows exact-limit spend", () => {
    const b = new TokenBudget({ limit: 1000 });
    b.spend(400);
    b.spend(600);
    expect(b.remaining()).toBe(0);
  });

  it("throws on overspend", () => {
    const b = new TokenBudget({ limit: 10 });
    expect(() => b.spend(11)).toThrow(/exceed|exceeded|Budget/i);
  });

  it("throws on negative spend", () => {
    const b = new TokenBudget({ limit: 10 });
    expect(() => b.spend(-1)).toThrow(/negative/i);
  });

  it("reset clears usage", () => {
    const b = new TokenBudget({ limit: 10 });
    b.spend(7);
    expect(b.remaining()).toBe(3);
    b.reset();
    expect(b.remaining()).toBe(10);
  });
});