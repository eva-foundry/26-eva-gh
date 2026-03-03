export type QuotaConfig = {
  dailyLimit?: number; // per tenant
  windowMs?: number; // rolling window (ms)
  windowLimit?: number; // hits per window
};

export class RollingWindow {
  private hits: number[] = [];
  constructor(private now: () => number, private windowMs: number) {}
  hit(): boolean {
    const t = this.now();
    const from = t - this.windowMs;
    this.hits = this.hits.filter((x) => x >= from);
    this.hits.push(t);
    return true;
  }
  count(): number {
    const t = this.now();
    const from = t - this.windowMs;
    this.hits = this.hits.filter((x) => x >= from);
    return this.hits.length;
  }
}

export class TenantQuotaManager {
  private days = new Map<string, { dayKey: string; count: number }>();
  private windows = new Map<string, RollingWindow>();
  constructor(private cfg: QuotaConfig = {}, private nowFn: () => number = () => Date.now()) {}

  isAllowed(tenant: string): { ok: boolean; reason?: string } {
    const now = new Date(this.nowFn());
    const dayKey = now.toISOString().slice(0, 10);
    if (this.cfg.dailyLimit != null) {
      const rec = this.days.get(tenant) ?? { dayKey, count: 0 };
      if (rec.dayKey !== dayKey) {
        this.days.set(tenant, { dayKey, count: 0 });
      } else if (rec.count >= this.cfg.dailyLimit) {
        return { ok: false, reason: "daily quota exceeded" };
      }
    }
    if (this.cfg.windowMs && this.cfg.windowLimit != null) {
      const win = this.windows.get(tenant) ?? new RollingWindow(this.nowFn, this.cfg.windowMs);
      const count = win.count();
      if (count >= this.cfg.windowLimit) {
        this.windows.set(tenant, win);
        return { ok: false, reason: "window quota exceeded" };
      }
    }
    return { ok: true };
  }

  record(tenant: string) {
    const now = new Date(this.nowFn());
    const dayKey = now.toISOString().slice(0, 10);
    if (this.cfg.dailyLimit != null) {
      const rec = this.days.get(tenant) ?? { dayKey, count: 0 };
      if (rec.dayKey !== dayKey) {
        this.days.set(tenant, { dayKey, count: 1 });
      } else {
        rec.count += 1;
        this.days.set(tenant, rec);
      }
    }
    if (this.cfg.windowMs && this.cfg.windowLimit != null) {
      const win = this.windows.get(tenant) ?? new RollingWindow(this.nowFn, this.cfg.windowMs);
      win.hit();
      this.windows.set(tenant, win);
    }
  }
}