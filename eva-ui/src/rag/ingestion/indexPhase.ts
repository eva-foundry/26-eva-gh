import type { EmbeddedChunk, IVectorIndex, IndexSnapshot } from "./types.js";

export class InMemoryVectorIndex implements IVectorIndex {
    private vectors = new Map<string, EmbeddedChunk>();
    private lastTenant = "multi";

    async upsert(chunks: EmbeddedChunk[]): Promise<void> {
        for (const chunk of chunks) {
            this.vectors.set(chunk.id, chunk);
            this.lastTenant = chunk.tenant;
        }
    }

    async removeByDocIds(docIds: string[]): Promise<void> {
        for (const [key, value] of this.vectors.entries()) {
            if (docIds.includes(value.docId)) this.vectors.delete(key);
        }
    }

    async snapshot(): Promise<IndexSnapshot> {
        return {
            tenant: this.lastTenant,
            vectorCount: this.vectors.size,
            createdAt: Date.now()
        };
    }
}
