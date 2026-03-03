import type { Chunk, IChunker, NormalizedDoc } from "./types.js";

const DEFAULT_SIZE = 400;

export class SimpleLineChunker implements IChunker {
    constructor(private maxChars = DEFAULT_SIZE) { }

    async chunk(docs: NormalizedDoc[], tenant: string): Promise<Chunk[]> {
        const chunks: Chunk[] = [];
        for (const doc of docs) {
            const sentences = doc.content.split(/\n+/).filter(Boolean);
            let buffer = "";
            let idx = 0;
            const pushChunk = (text: string) => {
                const trimmed = text.trim();
                if (!trimmed) return;
                chunks.push({ id: `${doc.docId}-${idx}`, docId: doc.docId, tenant, index: idx, content: trimmed });
                idx += 1;
            };
            for (const sentence of sentences) {
                const next = buffer ? `${buffer}\n${sentence}` : sentence;
                if (next.length > this.maxChars) {
                    pushChunk(buffer || sentence);
                    buffer = sentence;
                } else {
                    buffer = next;
                }
            }
            pushChunk(buffer);
        }
        return chunks;
    }
}
