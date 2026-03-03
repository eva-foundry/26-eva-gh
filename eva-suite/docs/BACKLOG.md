# EVA Suite - Backlog

**Last Updated:** 2025-11-25

---

## 🐛 Bugs / Issues

### Issue #1: eva-orchestrator project-board-sync workflow failing
**Status:** Known Issue - Tracked in eva-orchestrator  
**Priority:** Low  
**Reported:** 2025-11-25  
**Tracked As:** REQ-2025-11-18-001 in `eva-orchestrator/docs/intake/inbox/user-request-backlog.md`  
**GitHub Issue:** [eva-orchestrator#20](https://github.com/MarcoPolo483/eva-orchestrator/issues/20)

**Description:**
GitHub Actions workflow in `eva-orchestrator` repo is failing when attempting to sync backlog to project board.

**Error Details:**
- Workflow: `.github/workflows/project-board-sync.yml` (in eva-orchestrator)
- Error: `GraphQL request failed: Bad credentials, status: 401`
- Multiple warnings: `Unable to parse issue link` for repos: eva-core#5, eva-infra#3, eva-seed#5, eva-orchestrator#24, eva-agent#2

**Impact:**
- Does NOT affect eva-suite public webpage deployment
- Does NOT affect GitHub Pages (https://marcopolo483.github.io/eva-suite/)
- Only affects internal project board sync automation

**Root Cause (KNOWN):**
- Workflow awaiting `PAT_TOKEN` secret configuration before enabling scheduled runs
- Per eva-orchestrator backlog: "Workflow `.github/workflows/project-board-sync.yml` added; awaiting PAT secret before enabling scheduled runs."

**Solution:**
- Configure Personal Access Token with project board permissions in GitHub Secrets
- Set secret name: `PAT_TOKEN` or `METRICS_TOKEN` (as referenced in workflows)
- Already documented in eva-orchestrator sprint plan

**Related Files:**
- `eva-orchestrator/.github/workflows/project-board-sync.yml`
- `eva-orchestrator/.github/workflows/sm-job.yml`
- `eva-orchestrator/.github/workflows/sprint-metrics.yml`
- `eva-orchestrator/docs/intake/inbox/user-request-backlog.md` (REQ-2025-11-18-001)

**Notes:**
- ✅ eva-suite deploy workflow is working correctly
- ✅ Already tracked in master EVA backlog system
- ✅ Solution documented, awaiting token configuration
- Low priority - part of Sprint 01 management pod automation

---

## 🚀 Features / Enhancements

### Feature #1: Context Persistence System
**Status:** ✅ Phase 2 Complete (Integration) - 2025-11-25  
**Priority:** High (User-requested)  
**Documented:** 2025-11-24  

**Description:**
Build automatic context loading/saving system integrated with login.ps1/logoff.ps1 to eliminate manual re-explanation when opening folders.

**Related Documents:**
- `docs/CONTEXT-PERSISTENCE-INVENTORY.md` (comprehensive design)

**Implementation Progress:**

✅ **Phase 1: Proof of Concept** (Complete - 2025-11-25)
- Created `eva-orchestrator/load-context.ps1` (245 lines) - Context loading with formatted display
- Created `eva-orchestrator/save-context.ps1` (217 lines) - Interactive context capture
- Test context files created in eva-suite and eva-orchestrator
- **Tested**: load-context.ps1 displays formatted context successfully ✅

✅ **Phase 2: Login/Logout Integration** (Complete - 2025-11-25)
- **Integrated** `login.ps1`: Calls load-context.ps1 after session start
- **Integrated** `logoff.ps1`: Calls save-context.ps1 before stats display
- Session ID passed to save-context for tracking
- Error handling added (graceful fallback if scripts missing)
- **New:** Logoff auto-summarizes accomplishments from git activity (no manual prompt)
- **Tested**: Context loads correctly at simulated login ✅

🔄 **Phase 3: Multi-Repo Support** (Next - Est. 2-3 hours)
- Central memory: eva-orchestrator/eva-memory.json
- Per-repo pointers or symlinks
- Cross-repo context merging
- Test across eva-suite, eva-orchestrator, eva-meta

📋 **Phase 4: Context Prompt Automation** (Est. 1-2 hours)
- Generate .eva/current-context.md for Copilot
- Template-based markdown generation
- Auto-update on login

🔮 **Phase 5: Enhanced Context** (Future)
- Git commit history integration
- Recent file edits tracking
- Conversation history export
- Decision log aggregation

---

## 📝 Documentation

_(No documentation backlog items yet)_

---

## 🧪 Technical Debt

_(No technical debt items yet)_

---

## 💡 Ideas / Research

_(No research items yet)_

---

**How to use this backlog:**
1. Add new items under appropriate section
2. Update status as work progresses
3. Link to detailed documents in `docs/` folder
4. Use issue numbers for tracking (#1, #2, etc.)
