import { describe, it, expect } from "vitest";
import { FileManifestStore } from "../rag/ingestion/persistent/FileManifestStore.js";
import { FileIndexSnapshotStore } from "../rag/ingestion/persistent/FileIndexSnapshotStore.js";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("Persistent Stores", () => {
  it("saves and loads manifest and snapshot", async () => {
    const dir = mkdtempSync(join(tmpdir(), "eva-persist-"));
    const man = new FileManifestStore(dir);
    const snap = new FileIndexSnapshotStore(dir);

    const manifest = { ingestionId: "i1", tenant: "t1", createdAt: new Date().toISOString(), docs: [], version: 1 };
    await man.save(manifest as any);
    const readM = await man.getLatest("t1");
    expect(readM?.version).toBe(1);

    const s = { createdAt: new Date().toISOString(), vectorCount: 42 };
    await snap.save(s, "t1");
    const readS = await snap.getLatest("t1");
    expect(readS?.vectorCount).toBe(42);

    rmSync(dir, { recursive: true, force: true });
  });
});