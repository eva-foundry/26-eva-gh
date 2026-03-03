import { describe, it, expect, beforeAll, afterAll } from "vitest";
import http from "http";
import { EventHub } from "../rag/events/eventHub.js";
import { createRagEventsServer } from "../rag/api/events.js";

let server: http.Server;
let base: string;
let hub: EventHub;

beforeAll(async () => {
  hub = new EventHub(10);
  const sse = createRagEventsServer(hub);
  server = http.createServer((req, res) => {
    if ((req.url || "") === "/rag/events") return sse.handler(req, res);
    res.statusCode = 404; res.end("NF");
  });
  await new Promise<void>(r => server.listen(0, r));
  base = `http://127.0.0.1:${(server.address() as any).port}`;
});

afterAll(async () => {
  await new Promise<void>(r => server.close(() => r()));
});

it("streams SSE and replays recent", async () => {
  hub.publish({ type: "phase.start", ingestionId: "X", phase: "load", tenant: "t", ts: Date.now() });
  const res = await fetch(`${base}/rag/events`);
  expect(res.ok).toBe(true);
  const reader = res.body!.getReader();

  const { value } = await reader.read(); // read first chunk (should contain replay)
  const text = new TextDecoder().decode(value!);
  expect(text).toContain("phase.start");
});