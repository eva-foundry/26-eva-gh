import type { ISourceResolver, IngestionInput, NormalizedDoc } from "./types.js";

const makeChecksum = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) {
        hash = (hash << 5) - hash + text.charCodeAt(i);
        hash |= 0;
    }
    return `${hash >>> 0}`;
};

export class DefaultSourceResolver implements ISourceResolver {
    async resolve(inputs: IngestionInput[], tenant: string): Promise<NormalizedDoc[]> {
        const docs: NormalizedDoc[] = [];
        inputs.forEach((input, index) => {
            if (input.type === "text" && input.content) {
                const docId = input.id ?? `${tenant}-doc-${index}`;
                docs.push({
                    docId,
                    tenant,
                    content: input.content,
                    sourceType: input.type,
                    checksum: makeChecksum(input.content)
                });
            }
        });
        return docs;
    }
}
