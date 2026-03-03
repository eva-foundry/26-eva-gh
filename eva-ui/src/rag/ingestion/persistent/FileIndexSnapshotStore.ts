import { IndexSnapshot, IndexSnapshotStore, TenantId } from "../types.js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export class FileIndexSnapshotStore implements IndexSnapshotStore {
  constructor(private dir: string) {}

  private pathForTenant(tenant: TenantId) {
    return join(this.dir, `${sanitize(tenant)}-index-snapshot.json`);
  }

  async save(snapshot: IndexSnapshot, tenant: TenantId): Promise<void> {
    const p = this.pathForTenant(tenant);
    await mkdir(dirname(p), { recursive: true });
    await writeFile(p, JSON.stringify(snapshot, null, 2), "utf8");
  }

  async getLatest(tenant: TenantId): Promise<IndexSnapshot | undefined> {
    try {
      const p = this.pathForTenant(tenant);
      const data = await readFile(p, "utf8");
      const snap = JSON.parse(data);
      return snap;
    } catch {
      return undefined;
    }
  }
}

function sanitize(s: string): string {
  return s.replace(/[^a-zA-Z0-9._-]/g, "_");
}