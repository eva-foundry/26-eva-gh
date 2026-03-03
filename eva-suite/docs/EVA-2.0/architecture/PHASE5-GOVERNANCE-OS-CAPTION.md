# Phase 5+ Governance OS — Caption (Copilot Language)

What it is
- Governance operating system scaling Phase 4 across 40+ products: central policy + evidence registry + lifecycle + telemetry.

Why it exists
- Provides continuous compliance, portfolio visibility, and controlled evolution without manual governance overhead.

What fails CI
- Deprecated claim past grace window (hard-fail)
- Missing provenance in shared evidence packs
- Central policy/schema mismatch
- Repo lacks required CLAIM tokens/evidence

Where evidence lives
- Per-repo: `.eva/evidence/**`, `coverage/**`, `audits/**`
- Shared: `eva-evidence-registry/*` packs with `provenance.json`

Exception / override process
- Time-boxed override label with justification + audit log; periodic review to renew/remove.

What’s next (Phase 5+)
- Implement migration PR generator
- Add governance telemetry dashboards
- Integrate AIRA/EARB and ATO package builders
- Introduce SLSA/cosign for provenance (Phase 6)
