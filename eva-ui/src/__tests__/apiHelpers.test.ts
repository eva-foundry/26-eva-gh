import { describe, it, expect, vi, beforeEach } from "vitest";
import { getBatch } from "../lib/api";

describe("api helpers", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("getBatch fetches JSON", async () => {
    vi.spyOn(global, "fetch" as any).mockResolvedValue({
      ok: true,
      json: async () => ({ counts: { running: 0, queued: 0, blocked: 0, held: 0, failed: 0, succeeded: 0, cancelled: 0 }, running: [], queued: [], blocked: [], held: [], failed: [], cancelled: [], perClass: {} })
    });
    const res = await getBatch();
    expect(res.counts.running).toBe(0);
  });
});