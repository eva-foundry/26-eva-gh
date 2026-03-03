import type { RagEvent } from "../store/useRagEvents";

export type PhaseSpan = {
  phase: string;
  start: number;
  end?: number;
  durationMs?: number;
  error?: string;
};

export type Session = {
  ingestionId: string;
  tenant: string;
  start: number;
  end?: number;
  phases: PhaseSpan[];
};

type Pending = Record<string, { [phase: string]: PhaseSpan }>;

export function buildSessions(events: RagEvent[], nowTs: number = Date.now()): Session[] {
  if (!events.length) return [];
  // Sort by timestamp ascending to build spans deterministically
  const sorted = events.slice().sort((a, b) => a.ts - b.ts);
  const sessions = new Map<string, Session>();
  const pending: Pending = {};

  for (const e of sorted) {
    let sess = sessions.get(e.ingestionId);
    if (!sess) {
      sess = {
        ingestionId: e.ingestionId,
        tenant: e.tenant,
        start: e.ts,
        end: undefined,
        phases: []
      };
      sessions.set(e.ingestionId, sess);
      pending[e.ingestionId] = {};
    }
    // Update session bounds
    if (e.ts < sess.start) sess.start = e.ts;
    if (!sess.end || e.ts > sess.end) sess.end = e.ts;

    if (e.type === "phase.start") {
      // opening a new span for this phase; if a pending already exists, close it first as zero-duration to avoid leaks
      const prev = pending[e.ingestionId][e.phase];
      if (prev && prev.start && !prev.end) {
        prev.end = e.ts;
        prev.durationMs = Math.max(0, (prev.end ?? e.ts) - prev.start);
        sess.phases.push(prev);
      }
      pending[e.ingestionId][e.phase] = { phase: e.phase, start: e.ts };
    } else if (e.type === "phase.end") {
      const cur = pending[e.ingestionId][e.phase];
      if (cur) {
        cur.end = e.ts;
        cur.error = e.error;
        cur.durationMs = Math.max(0, (cur.end ?? nowTs) - cur.start);
        sess.phases.push(cur);
        delete pending[e.ingestionId][e.phase];
      } else {
        // End without a start: synthesize zero-length span
        sess.phases.push({
          phase: e.phase,
          start: e.ts,
          end: e.ts,
          durationMs: 0,
          error: e.error
        });
      }
    } else if (e.type === "ingestion.complete") {
      // mark session end
      if (!sess.end || e.ts > sess.end) sess.end = e.ts;
    }
  }

  // Close any pending spans as running (end = nowTs)
  for (const [ingId, phases] of Object.entries(pending)) {
    const sess = sessions.get(ingId)!;
    for (const ph of Object.values(phases)) {
      if (!ph.end) {
        ph.end = nowTs;
        ph.durationMs = Math.max(0, nowTs - ph.start);
        sess.phases.push(ph);
      }
    }
  }

  // Sort phases by start
  for (const s of sessions.values()) {
    s.phases.sort((a, b) => a.start - b.start);
  }

  // Return sessions sorted by latest end desc
  return Array.from(sessions.values()).sort((a, b) => (b.end ?? 0) - (a.end ?? 0));
}