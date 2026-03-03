import type { Chunk, IManifestStore, ManifestRecord, NormalizedDoc } from "./types.js";

const checksum = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) hash = (hash << 5) - hash + text.charCodeAt(i);
    return `${hash >>> 0}`;
};

export class InMemoryManifestStore implements IManifestStore {
    private store = new Map<string, ManifestRecord>();

    async getLatest(tenant: string): Promise<ManifestRecord | undefined> {
        return this.store.get(tenant);
    }

    async save(record: ManifestRecord): Promise<void> {
        this.store.set(record.tenant, record);
    }
}

export function buildManifest(ingestionId: string, tenant: string, docs: NormalizedDoc[], chunks: Chunk[], version: number): ManifestRecord {
    return {
        ingestionId,
        tenant,
        version,
        createdAt: Date.now(),
        docCount: docs.length,
        chunkCount: chunks.length,
        docs: docs.map((doc) => ({ docId: doc.docId, checksum: checksum(doc.content) }))
    };
}

export function diffManifest(previous: ManifestRecord | undefined, docs: NormalizedDoc[]) {
    if (!previous) return { changed: docs, unchanged: [] as NormalizedDoc[] };
    const prior = new Map(previous.docs.map((d) => [d.docId, d.checksum] as const));
    const changed: NormalizedDoc[] = [];
    const unchanged: NormalizedDoc[] = [];
    for (const doc of docs) {
        const sig = doc.checksum ?? checksum(doc.content);
        if (prior.get(doc.docId) === sig) unchanged.push(doc);
        else changed.push(doc);
    }
    return { changed, unchanged };
}
