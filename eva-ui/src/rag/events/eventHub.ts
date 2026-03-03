export type RagEvent =
  | { type: "phase.start"; ingestionId: string; phase: string; tenant: string; ts: number }
  | { type: "phase.end"; ingestionId: string; phase: string; tenant: string; ts: number; error?: string }
  | { type: "ingestion.complete"; ingestionId: string; tenant: string; ts: number; ok: boolean };

export class EventHub {
  private subs = new Set<(e: RagEvent) => void>();
  private replay: RagEvent[] = [];
  constructor(private capacity = 1000) {}

  publish(e: RagEvent) {
    if (this.replay.length === this.capacity) this.replay.shift();
    this.replay.push(e);
    for (const fn of this.subs) {
      try {
        fn(e);
      } catch {
        // swallow
      }
    }
  }

  subscribe(fn: (e: RagEvent) => void): () => void {
    this.subs.add(fn);
    return () => this.subs.delete(fn);
  }

  recent(): RagEvent[] {
    return this.replay.slice();
  }
}