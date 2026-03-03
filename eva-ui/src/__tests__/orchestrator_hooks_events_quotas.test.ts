import { describe, it, expect } from "vitest";
import { RagIngestionOrchestratorExtended } from "../rag/ingestion/orchestrator-extended.js";
import { DefaultSourceResolver } from "../rag/ingestion/loadSources.js";
import { SimpleLineChunker } from "../rag/ingestion/chunkPhase.js";
import { MockEmbedder } from "../rag/ingestion/embedPhase.js";
import { InMemoryVectorIndex } from "../rag/ingestion/indexPhase.js";
import { InMemoryManifestStore } from "../rag/ingestion/manifestStore.js";
import { InMemoryIndexSnapshotStore } from "../rag/ingestion/indexSnapshotStore.js";
import { NoopSafetyGate } from "../rag/ingestion/safetyGate.js";
import { EventHub } from "../rag/events/eventHub.js";
import { withEvents, withQuotas } from "../rag/ingestion/orchestrator-hooks.js";
import { IngestionContextRegistry } from "../rag/ingestion/contextRegistry.js";
import { BatchScheduler } from "../scheduler/batchScheduler.js";
import { createLogger } from "../logging/logger.js";
import { RingBufferSink } from "../logging/sinks.js";
import { TenantQuotaManager } from "../rag/ingestion/tenantQuotas.js";

describe("Orchestrator hooks: events and quotas", () => {
  it("publishes events and enforces quotas", async () => {
    const sink = new RingBufferSink(50);
    const logger = createLogger({ level: "error", sinks: [sink] });
    const sched = new BatchScheduler(logger, { maxConcurrent: 4 });
    const registry = new IngestionContextRegistry();
    const orch = new RagIngestionOrchestratorExtended(
      sched,
      new DefaultSourceResolver(),
      new SimpleLineChunker(50),
      new MockEmbedder(),
      new InMemoryVectorIndex(),
      undefined,
      new InMemoryManifestStore(),
      undefined,
      new NoopSafetyGate(),
      new InMemoryIndexSnapshotStore(),
      registry,
      {}
    );
    const hub = new EventHub();
    const quotas = new TenantQuotaManager({ dailyLimit: 1 });

    withEvents(orch, hub);
    withQuotas(orch, quotas);

    const events: any[] = [];
    const off = hub.subscribe(e => events.push(e));

    const id1 = orch.ingest({ tenant: "t", inputs: [{ type: "text", content: "A", id: "d1" }] });
    const id2 = orch.ingest({ tenant: "t", inputs: [{ type: "text", content: "B", id: "d2" }] }); // should be blocked by quota

    await new Promise(r => setTimeout(r, 1000));

    expect(events.some(e => e.type === "phase.start")).toBe(true);
    expect(id1).toBeDefined();
    expect(id2).toBeDefined(); // but second ingestion’s context should show immediate failure
    const stat2 = registry.status(id2);
    expect(stat2.state).toBe("failed");

    off();
    sched.stop();
  });
});