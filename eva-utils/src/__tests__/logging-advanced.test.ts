import { describe, it, expect, vi, afterEach } from "vitest";

import { createLogger } from "../logging/logger.js";

afterEach(() => {
  vi.restoreAllMocks();
});

/**
 * Covers the pino hook branches:
 * 1. (obj, msg) signature
 * 2. (msg) signature
 * 3. (obj) only signature (no explicit msg)
 */
describe("logging advanced hook coverage", () => {
  it("handles (obj, msg)", () => {
    const spy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const log = createLogger({ service: "svc", level: "info" });
    log.info({ foo: "bar" }, "hello");
    const line = String(spy.mock.calls[0][0]);
    const parsed = JSON.parse(line);
    expect(parsed.foo).toBe("bar");
    expect(parsed.msg).toBe("hello");
    expect(parsed.service).toBe("svc");
  });

  it("handles (msg) only", () => {
    const spy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const log = createLogger({ service: "svc", level: "info" });
    log.info("just-a-message");
    const parsed = JSON.parse(String(spy.mock.calls[0][0]));
    // Depending on pino serialization, msg may appear as msg or within second arg;
    // our hook ensures msg field exists.
    expect(parsed.msg).toBe("just-a-message");
    expect(parsed.service).toBe("svc");
  });

  it("handles (obj) only (no explicit msg)", () => {
    const spy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const log = createLogger({ service: "svc", level: "info" });
    // Intentionally pass only object so hook exercises third branch
    // @ts-expect-error intentional signature variant
    log.info({ only: "object" });
    const parsed = JSON.parse(String(spy.mock.calls[0][0]));
    expect(parsed.only).toBe("object");
    expect(parsed.service).toBe("svc");
    // msg may be absent or empty; we just assert object merged
  });
});
