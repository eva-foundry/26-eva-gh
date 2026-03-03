# Orchestrator Docs Handoff (Public Location)

**Context**: EVA Orchestrator is a private control-plane repo. Public-facing documentation should live under EVA Suite.

**Action**: The documentation page previously published from `eva-orchestrator` is now hosted in EVA Suite. Orchestrator’s workflow only builds and uploads artifacts; public Pages deploy remains gated.

**Where It Lives**:
- EVA Suite (public): Portfolio docs and governance diagrams
- Example: [PHASE5-GOVERNANCE-OS.mmd](PHASE5-GOVERNANCE-OS.mmd) and [PHASE5-GOVERNANCE-OS-CAPTION.md](PHASE5-GOVERNANCE-OS-CAPTION.md)

**Authoritative Mapping**:
- Control plane (`eva-orchestrator`): CI, enforcement bundles, private artifacts
- Public docs (`eva-suite`): Architecture, roadmaps, governance OS, product overviews
- Component API docs (`EVA-Sovereign-UI`): GC components and API pages

**Operational Notes**:
- Orchestrator `publish-docs.yml` is manual-only and gates Pages deploy via input (`enable_pages_deploy=false` by default)
- EVA Suite GitHub Pages remains the canonical public site

**Next Steps**:
- Add content sections here as needed (summaries, links to repo-specific docs)
- Keep governance diagrams updated via EVA Suite docs