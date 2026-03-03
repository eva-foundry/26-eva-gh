/**
Lightweight hooks around the existing Extended Orchestrator to plug events and quotas without changing public API.
*/
import type { RagIngestionOrchestratorExtended } from "./orchestrator-extended.js";
import type { EventHub } from "../events/eventHub.js";
import type { TenantQuotaManager } from "./tenantQuotas.js";
import type { IngestionRequest } from "./types.js";

export function withEvents(orchestrator: RagIngestionOrchestratorExtended, hub: EventHub) {
  const origRunPhase = (orchestrator as any).runPhase.bind(orchestrator);
  (orchestrator as any).runPhase = async function (ctx: any, phase: any, fn: any, span?: any) {
    hub.publish({ type: "phase.start", ingestionId: ctx.request.ingestionId, phase, tenant: ctx.request.tenant, ts: Date.now() });
    const before = Date.now();
    await origRunPhase(ctx, phase, async () => {
      try {
        return await fn();
      } catch (e: any) {
        throw e;
      }
    }, span);
    const after = Date.now();
    const last = ctx.phaseResults[ctx.phaseResults.length - 1];
    hub.publish({ type: "phase.end", ingestionId: ctx.request.ingestionId, phase, tenant: ctx.request.tenant, ts: after, error: last?.error });
    if (phase === "complete") {
      hub.publish({ type: "ingestion.complete", ingestionId: ctx.request.ingestionId, tenant: ctx.request.tenant, ts: after, ok: !ctx.phaseResults.some((p: any) => p.error) });
    }
    void before;
  };
  return orchestrator;
}

export function withQuotas(orchestrator: RagIngestionOrchestratorExtended, quotas: TenantQuotaManager) {
  const origIngest = orchestrator.ingest.bind(orchestrator);
  orchestrator.ingest = function (req: IngestionRequest) {
    const check = quotas.isAllowed(req.tenant);
    if (!check.ok) {
      // register a synthetic context with immediate failure
      const id = req.ingestionId || "ing-" + Math.random().toString(16).slice(2);
      (orchestrator as any).registry.register({
        request: { ...req, ingestionId: id },
        phaseResults: [{ phase: "load", tenant: req.tenant, startTime: Date.now(), endTime: Date.now(), error: check.reason }],
        startTime: Date.now()
      });
      return id;
    }
    const id = origIngest(req);
    quotas.record(req.tenant);
    return id;
  } as any;
  return orchestrator;
}