import { describe, it, expect, vi, beforeEach } from "vitest";
import useRagEvents from "../store/useRagEvents";

class MockEventSource {
  static lastInstance: any;
  onopen: any;
  onerror: any;
  onmessage: any;
  constructor(public url: string, _opts?: any) {
    MockEventSource.lastInstance = this;
  }
  close() {}
}

describe("useRagEvents store", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    (globalThis as any).EventSource = MockEventSource as any;
  });

  it("connects, filters by ingestionId, and buffers events", async () => {
    const store = useRagEvents.getState();
    store.setFilter("ing-123");
    store.connect();
    const es = (MockEventSource as any).lastInstance;
    // Should ignore other ingestion ids
    es.onmessage({ data: JSON.stringify({ type: "phase.start", ingestionId: "ing-999", phase: "load", tenant: "t", ts: Date.now() }) });
    // Should accept matching
    es.onmessage({ data: JSON.stringify({ type: "phase.start", ingestionId: "ing-123", phase: "load", tenant: "t", ts: Date.now() }) });

    const s2 = useRagEvents.getState();
    expect(s2.events.length).toBe(1);
    expect(s2.events[0].ingestionId).toBe("ing-123");
    store.disconnect();
  });
});