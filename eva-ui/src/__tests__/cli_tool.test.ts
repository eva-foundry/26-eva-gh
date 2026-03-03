import { describe, it, expect, vi, beforeEach } from "vitest";
import main from "../rag/cli/rag-cli.js";

describe("rag-cli", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("prints help on unknown", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await expect((main as any)(["node", "rag", "unknown"])).resolves.toBeUndefined();
    expect(spy).toHaveBeenCalled();
  });

  it("ingest posts payload", async () => {
    const fetchSpy = vi.spyOn(global, "fetch" as any).mockResolvedValue({
      json: async () => ({ ingestionId: "ing-1", accepted: true })
    });
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await (main as any)(["node", "rag", "ingest", "--tenant", "t1", "--text", "Hi"]);
    expect(fetchSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });
});