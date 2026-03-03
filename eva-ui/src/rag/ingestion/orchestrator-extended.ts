import type { BatchScheduler } from "../../scheduler/batchScheduler.js";
import { diffManifest, buildManifest } from "./manifestStore.js";
import type {
    Chunk,
    EmbeddedChunk,
    IEvaluationRunner,
    IChunker,
    IEmbedder,
    IManifestStore,
    IndexSnapshotStore,
    IngestionContext,
    IngestionPhase,
    IngestionRequest,
    ISourceResolver,
    ISafetyGate,
    IVectorIndex,
    NormalizedDoc
} from "./types.js";
import { IngestionContextRegistry } from "./contextRegistry.js";

export type ExtendedOptions = {
    pricing?: { promptUSDPer1K: number; completionUSDPer1K: number };
};

export class RagIngestionOrchestratorExtended {
    constructor(
        private scheduler: BatchScheduler,
        private resolver: ISourceResolver,
        private chunker: IChunker,
        private embedder: IEmbedder,
        private vectorIndex: IVectorIndex,
        private sparseIndex: IVectorIndex | undefined,
        private manifestStore: IManifestStore,
        private evalRunner: IEvaluationRunner | undefined,
        private safetyGate: ISafetyGate,
        private snapshotStore: IndexSnapshotStore,
        public registry: IngestionContextRegistry,
        private options: ExtendedOptions = {}
    ) { }

    ingest(request: IngestionRequest) {
        const ingestionId = request.ingestionId ?? this.newId();
        const ctx: IngestionContext = {
            request: { ...request, ingestionId },
            phaseResults: [],
            startTime: Date.now()
        };
        this.registry.register(ctx);

        const phases: Array<[IngestionPhase, () => Promise<unknown>]> = [
            ["load", () => this.loadPhase(ctx)],
            ["chunk", () => this.chunkPhase(ctx)],
            ["embed", () => this.embedPhase(ctx)],
            ["index", () => this.indexPhase(ctx)],
            ["manifest", () => this.manifestPhase(ctx)]
        ];

        if (request.evaluationQueries?.length && this.evalRunner) {
            phases.push(["evaluate", () => this.evaluatePhase(ctx)]);
        }

        phases.push(["complete", async () => ({ ok: true })]);

        let chain = Promise.resolve();
        for (const [phase, fn] of phases) {
            chain = chain.then(() => this.scheduler.submit({ id: `${ingestionId}-${phase}`, class: "rag", payload: { run: () => this.runPhase(ctx, phase, fn) } }));
        }
        return ingestionId;
    }

    async runPhase(ctx: IngestionContext, phase: IngestionPhase, fn: () => Promise<unknown>) {
        const start = Date.now();
        try {
            const data = (await fn()) as Record<string, unknown>;
            ctx.phaseResults.push({ phase, tenant: ctx.request.tenant, startTime: start, endTime: Date.now(), data });
        } catch (err) {
            ctx.phaseResults.push({ phase, tenant: ctx.request.tenant, startTime: start, endTime: Date.now(), error: (err as Error).message });
            throw err;
        }
    }

    private async loadPhase(ctx: IngestionContext) {
        const docs = await this.resolver.resolve(ctx.request.inputs, ctx.request.tenant);
        const gateResult = await this.safetyGate.check(docs);
        ctx.docs = gateResult.allowed;
        return { docCount: ctx.docs.length, blocked: gateResult.blocked.length };
    }

    private async chunkPhase(ctx: IngestionContext) {
        if (!ctx.docs) throw new Error("No documents loaded");
        const latest = await this.manifestStore.getLatest(ctx.request.tenant);
        let docsToChunk: NormalizedDoc[] = ctx.docs;
        if (!ctx.request.forceFull) {
            const diff = diffManifest(latest, ctx.docs);
            docsToChunk = diff.changed;
            ctx.skippedDocs = diff.unchanged.map((d) => d.docId);
        }
        const chunks = await this.chunker.chunk(docsToChunk, ctx.request.tenant);
        ctx.chunks = chunks;
        return { chunkCount: chunks.length, skipped: ctx.skippedDocs?.length ?? 0 };
    }

    private async embedPhase(ctx: IngestionContext) {
        if (!ctx.chunks) throw new Error("No chunks available");
        const embedded = await this.embedder.embed(ctx.chunks, ctx.request.tenant);
        ctx.embedded = embedded;
        return { embedded: embedded.length };
    }

    private async indexPhase(ctx: IngestionContext) {
        if (!ctx.embedded) throw new Error("No embeddings produced");
        await this.vectorIndex.upsert(ctx.embedded);
        if (ctx.skippedDocs?.length) await this.vectorIndex.removeByDocIds(ctx.skippedDocs);
        await this.snapshotStore.save(await this.vectorIndex.snapshot(), ctx.request.tenant);
        if (this.sparseIndex) await this.sparseIndex.upsert(ctx.embedded);
        return { vectorCount: ctx.embedded.length };
    }

    private async manifestPhase(ctx: IngestionContext) {
        if (!ctx.docs || !ctx.chunks) throw new Error("Manifest requires docs and chunks");
        const prev = await this.manifestStore.getLatest(ctx.request.tenant);
        const nextVersion = (prev?.version ?? 0) + 1;
        const manifest = buildManifest(ctx.request.ingestionId, ctx.request.tenant, ctx.docs, ctx.chunks, nextVersion);
        ctx.manifest = manifest;
        await this.manifestStore.save(manifest);
        return { version: nextVersion };
    }

    private async evaluatePhase(ctx: IngestionContext) {
        if (!this.evalRunner || !ctx.request.evaluationQueries?.length) return { skipped: true };
        const result = await this.evalRunner.run(ctx.request.evaluationQueries, ctx.request.tenant);
        ctx.evalResults = result;
        return result as Record<string, unknown>;
    }

    private newId() {
        return `ing-${Math.random().toString(16).slice(2, 10)}`;
    }
}
