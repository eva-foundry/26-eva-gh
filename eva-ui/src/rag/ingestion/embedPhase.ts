import type { EmbeddedChunk, IEmbedder, Chunk } from "./types.js";

export class MockEmbedder implements IEmbedder {
    async embed(chunks: Chunk[], tenant: string): Promise<EmbeddedChunk[]> {
        return chunks.map((chunk) => ({
            ...chunk,
            tenant,
            vector: this.makeVector(chunk.content)
        }));
    }

    private makeVector(text: string) {
        const vec: number[] = [];
        for (let i = 0; i < Math.min(text.length, 8); i += 1) {
            vec.push(text.charCodeAt(i) / 255);
        }
        return vec;
    }
}
