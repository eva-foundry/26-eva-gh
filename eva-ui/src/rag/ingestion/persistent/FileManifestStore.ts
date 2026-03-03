import { IngestionManifest, IManifestStore, TenantId } from "../types.js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";

export class FileManifestStore implements IManifestStore {
  constructor(private dir: string) {}

  private pathForTenant(tenant: TenantId) {
    return join(this.dir, `${sanitize(tenant)}-manifest.json`);
  }

  async getLatest(tenant: TenantId): Promise<IngestionManifest | undefined> {
    try {
      const p = this.pathForTenant(tenant);
      const data = await readFile(p, "utf8");
      const m = JSON.parse(data);
      if (m && m.tenant === tenant) return m;
    } catch {
      // ignore missing file
    }
    return undefined;
  }

  async save(manifest: IngestionManifest): Promise<void> {
    const p = this.pathForTenant(manifest.tenant);
    await mkdir(dirname(p), { recursive: true });
    await writeFile(p, JSON.stringify(manifest, null, 2), "utf8");
  }
}

function sanitize(s: string): string {
  return s.replace(/[^a-zA-Z0-9._-]/g, "_");
}