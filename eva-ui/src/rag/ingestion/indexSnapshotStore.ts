import type { IndexSnapshot, IndexSnapshotStore } from "./types.js";

export class InMemoryIndexSnapshotStore implements IndexSnapshotStore {
    private last = new Map<string, IndexSnapshot>();

    async save(snapshot: IndexSnapshot, tenant: string): Promise<void> {
        this.last.set(tenant, { ...snapshot, tenant });
    }

    latest(tenant: string) {
        return this.last.get(tenant);
    }
}
