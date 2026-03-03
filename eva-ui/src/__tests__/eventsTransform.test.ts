import { describe, it, expect } from "vitest";
import { buildSessions } from "../lib/eventsTransform";

describe("buildSessions", () => {
  it("makes spans from start/end and handles missing start", () => {
    const now = 1_000_000;
    const events = [
      { type: "phase.start", ingestionId: "ing-1", phase: "load", tenant: "t", ts: 1000 } as any,
      { type: "phase.end", ingestionId: "ing-1", phase: "load", tenant: "t", ts: 1500 } as any,
      // end without start
      { type: "phase.end", ingestionId: "ing-1", phase: "chunk", tenant: "t", ts: 1600 } as any,
      // pending running span
      { type: "phase.start", ingestionId: "ing-1", phase: "embed", tenant: "t", ts: 1700 } as any
    ];
    const sessions = buildSessions(events, now);
    expect(sessions.length).toBe(1);
    const s = sessions[0];
    expect(s.phases.length).toBe(3);
    const load = s.phases.find((p) => p.phase === "load")!;
    expect(load.durationMs).toBe(500);
    const chunk = s.phases.find((p) => p.phase === "chunk")!;
    expect(chunk.durationMs).toBe(0);
    const embed = s.phases.find((p) => p.phase === "embed")!;
    expect(embed.end).toBe(now);
    expect(embed.durationMs).toBe(now - 1700);
  });
});