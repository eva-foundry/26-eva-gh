export type IngestionInput = {
    type: "text" | "file" | "url";
    id?: string;
    content?: string;
    path?: string;
    url?: string;
};

export type NormalizedDoc = {
    docId: string;
    tenant: string;
    content: string;
    sourceType: IngestionInput["type"];
    checksum: string;
};

export type Chunk = {
    id: string;
    docId: string;
    tenant: string;
    index: number;
    content: string;
};

export type EmbeddedChunk = Chunk & {
    vector: number[];
};

export type IngestionRequest = {
    tenant: string;
    inputs: IngestionInput[];
    ingestionId?: string;
    safetyEnabled?: boolean;
    forceFull?: boolean;
    priority?: number;
    evaluationQueries?: string[];
};

export type IngestionPhase = "load" | "chunk" | "embed" | "index" | "manifest" | "evaluate" | "complete" | "rollback";

export type PhaseRecord = {
    phase: IngestionPhase;
    tenant: string;
    startTime: number;
    endTime: number;
    data?: Record<string, unknown>;
    error?: string;
};

export type ManifestRecord = {
    ingestionId: string;
    tenant: string;
    version: number;
    createdAt: number;
    docCount: number;
    chunkCount: number;
    docs: Array<{ docId: string; checksum: string }>;
};

export type IndexSnapshot = {
    tenant: string;
    vectorCount: number;
    createdAt: number;
};

export type IngestionContext = {
    request: Required<Pick<IngestionRequest, "tenant" | "inputs">> & { ingestionId: string } & Omit<IngestionRequest, "tenant" | "inputs">;
    phaseResults: PhaseRecord[];
    startTime: number;
    docs?: NormalizedDoc[];
    chunks?: Chunk[];
    skippedDocs?: string[];
    embedded?: EmbeddedChunk[];
    manifest?: ManifestRecord;
    evalResults?: unknown;
};

export interface ISourceResolver {
    resolve(inputs: IngestionInput[], tenant: string): Promise<NormalizedDoc[]>;
}

export interface IChunker {
    chunk(docs: NormalizedDoc[], tenant: string): Promise<Chunk[]>;
}

export interface IEmbedder {
    embed(chunks: Chunk[], tenant: string): Promise<EmbeddedChunk[]>;
}

export interface IVectorIndex {
    upsert(chunks: EmbeddedChunk[]): Promise<void>;
    removeByDocIds(docIds: string[]): Promise<void>;
    snapshot(): Promise<IndexSnapshot>;
}

export interface IManifestStore {
    getLatest(tenant: string): Promise<ManifestRecord | undefined>;
    save(record: ManifestRecord): Promise<void>;
}

export interface IEvaluationRunner {
    run(queries: string[], tenant: string): Promise<unknown>;
}

export interface ISafetyGate {
    check(docs: NormalizedDoc[]): Promise<{ allowed: NormalizedDoc[]; blocked: NormalizedDoc[] }>;
}

export interface IndexSnapshotStore {
    save(snapshot: IndexSnapshot, tenant: string): Promise<void>;
}
