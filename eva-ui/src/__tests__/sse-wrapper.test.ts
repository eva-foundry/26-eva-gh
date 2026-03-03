import { describe, it, expect, vi, beforeEach } from "vitest";
import { SSEClient } from "../lib/sse";

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

describe("SSEClient", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    (globalThis as any).EventSource = MockEventSource as any;
  });

  it("connects and parses JSON messages", () => {
    const opened = vi.fn();
    const received: any[] = [];
    const c = new SSEClient("http://x/events", {
      onOpen: opened,
      onMessage: (d) => received.push(d)
    });
    c.connect();
    expect(opened).toHaveBeenCalledTimes(1);
    const es = (MockEventSource as any).lastInstance;
    es.onmessage({ data: JSON.stringify({ a: 1 }) });
    expect(received[0]).toEqual({ a: 1 });
    c.close();
  });

  it("marks error on onerror", () => {
    const c = new SSEClient("http://x/events", {
      onError: () => {}
    });
    c.connect();
    const es = (MockEventSource as any).lastInstance;
    es.onerror(new Event("error"));
    expect(c.getStatus()).toBe("error");
  });
});