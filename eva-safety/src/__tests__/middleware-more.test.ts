import { describe, it, expect } from "vitest";
import { safetyMiddleware } from "../middleware/safety.js";
import { getDefaultPolicy } from "../policy/engine.js";

describe("Safety middleware edge cases", () => {
  it("handles undefined/null body and calls next", async () => {
    const mw = safetyMiddleware({ policy: getDefaultPolicy() });
    const req: any = { headers: {}, state: {}, body: undefined };
    const res: any = { end: (b: any) => { res.body = b; } };
    let nextCalled = false;
    await mw(req, res, () => { nextCalled = true; });
    expect(nextCalled).toBe(true);
    expect(req.body).toBeUndefined();
    expect(req.state.safety).toBeDefined();
  });

  it("collects strings from arrays and objects and sanitizes them", async () => {
    const mw = safetyMiddleware({ policy: getDefaultPolicy() });
    const req: any = {
      headers: {},
      state: {},
      body: {
        arr: ["email a@b.com", "ok"],
        obj: { nested: "ssn 123-45-6789", keep: 1 },
      }
    };
    const res: any = { end: (b: any) => { res.body = b; } };
    let nextCalled = false;
    await mw(req, res, () => { nextCalled = true; });
    expect(nextCalled).toBe(true);
    expect((req.body.arr[0] as string).toLowerCase()).not.toContain("@b.com");
    expect((req.body.obj.nested as string)).not.toContain("123-45-6789");
    expect(req.body.obj.keep).toBe(1);
    expect(Array.isArray(req.state.safety.findings)).toBe(true);
    expect(req.state.safety.findings.length).toBeGreaterThan(0);
  });
});