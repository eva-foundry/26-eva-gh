import { describe, it, expect } from "vitest";
import { safetyMiddleware } from "../middleware/safety.js";
import { getDefaultPolicy } from "../policy/engine.js";

describe("Safety middleware", () => {
  it("blocks when findings trigger block rule", async () => {
    const mw = safetyMiddleware({ policy: getDefaultPolicy() });
    const req: any = { headers: {}, body: { token: "ghp_abcdefghijklmnopqrstuvwxyz1234" }, state: {} };
    const res: any = { end: (b: any) => { res.body = b; } };
    let nextCalled = false;
    await mw(req, res, () => { nextCalled = true; });
    expect(res.statusCode).toBe(400);
    expect(nextCalled).toBe(false);
  });

  it("sanitizes body strings when not blocked", async () => {
    const mw = safetyMiddleware({ policy: getDefaultPolicy() });
    const req: any = { headers: {}, body: { message: "Email me at a@b.com" }, state: {} };
    const res: any = { end: (b: any) => { res.body = b; } };
    let nextCalled = false;
    await mw(req, res, () => { nextCalled = true; });
    expect(nextCalled).toBe(true);
    expect(req.body.message).not.toContain("a@b.com");
  });
});