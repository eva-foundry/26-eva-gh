import { IncomingMessage, ServerResponse } from "http";
import { EventHub } from "../events/eventHub.js";

export function sseHeaders(res: ServerResponse) {
  res.setHeader("content-type", "text/event-stream");
  res.setHeader("cache-control", "no-cache, no-transform");
  res.setHeader("connection", "keep-alive");
}

export function sendEvent(res: ServerResponse, event: any) {
  res.write(`data: ${JSON.stringify(event)}\n\n`);
}

export function createRagEventsServer(hub: EventHub) {
  const clients = new Set<ServerResponse>();
  const isTest = process.env.VITEST || process.env.NODE_ENV === "test";

  function handler(req: IncomingMessage, res: ServerResponse) {
    sseHeaders(res);
    res.write(": connected\n\n"); // comment to open stream
    res.flushHeaders?.();
    (res as any).flush?.();
    clients.add(res);

    // Replay recent events
    for (const e of hub.recent()) sendEvent(res, e);

    const off = hub.subscribe((e) => {
      if (clients.has(res)) sendEvent(res, e);
    });

    req.on("close", () => {
      off();
      clients.delete(res);
    });

    if (isTest) {
      setTimeout(() => {
        if (!clients.has(res)) return;
        off();
        clients.delete(res);
        res.end();
      }, 250);
    }
  }

  return { handler };
}