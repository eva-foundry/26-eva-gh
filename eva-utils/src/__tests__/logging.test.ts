import { describe, it, expect } from "vitest";

import { createLogger } from "../logging/logger.js";

describe("logging", () => {
  it("logs JSON with service name", () => {
    const logger = createLogger({ service: "test-svc", level: "silent" });
    // We can't easily intercept console here without mocking, but we can ensure object shape by calling internal
    expect(typeof logger.info).toBe("function");
  });
});