# EVA – Remaining Operational Bundles (Monolithic Drop)

This bundle includes the remaining grouped capabilities:

2) Persistent Stores
- FileManifestStore: disk-backed manifest storage (JSON per-tenant).
- FileIndexSnapshotStore: disk-backed index snapshot store.
- Crash recovery test scenario.

3) Streaming & Events
- Ingestion phase events integration via a simple EventHub.
- Server-Sent Events endpoint `/rag/events`.
- Replay buffer for last N events so late subscribers see recent activity.

6) CLI Tooling
- `rag-cli.ts` with commands: ingest, status, list, tail-events.
- No external deps; uses fetch and simple arg parsing.

8) Histogram Percentiles
- Percentile calculator from Prometheus-like histogram snapshots.
- Derived gauges potential usage (optional upstream wiring).

10) Multi-Tenant Quotas
- TenantQuotaManager with daily soft cap and rolling window quotas.
- Hook for pre-submit governance in orchestrator extended.

13) Config Schema & Validation
- JSON-like internal schemas.
- Runtime validators for `IngestionRequest` and `GovernancePolicies`.

Integration Hints
- Wire the File* stores into your orchestrator instantiation where persistence is desired.
- Mount SSE via the provided `createRagEventsServer` and pass the event hub into orchestrator hooks.
- Use CLI in dev to quickly trigger/inspect ingestions.
- Percentiles utility can feed `eva-metering`-rendered dashboards or a UI layer.
- Quotas: construct once, pass to orchestrator extended via options as `quotas`.