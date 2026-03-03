import type { IngestionContext } from "./types.js";

export class IngestionContextRegistry {
    private contexts = new Map<string, IngestionContext>();

    register(ctx: IngestionContext) {
        this.contexts.set(ctx.request.ingestionId, ctx);
    }

    status(id: string) {
        const ctx = this.contexts.get(id);
        if (!ctx) return undefined;
        const last = ctx.phaseResults[ctx.phaseResults.length - 1];
        const state = last?.error ? "failed" : last?.phase === "complete" ? "complete" : "running";
        return { ...ctx, state } as IngestionContext & { state: string };
    }
}
