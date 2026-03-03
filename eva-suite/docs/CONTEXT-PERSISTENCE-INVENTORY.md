# Context Persistence & Memory System - Inventory

**Created:** 2024-11-24  
**Purpose:** Comprehensive inventory of all existing memory/context/persistence work across EVA Suite repos  
**Status:** Discovery phase - capturing what exists before building solution

---

## 🎯 The Problem Statement (From Today's Conversation)

**Root Issue:** "Your lack of memory when I open folders eva-suite, eva-meta... I have to re-explain everything"

**User Expectation:** "Login and logout process is the entry and exit doors. I like to record everything in between. If I open a new folder in another window I expect you to know (reading the memory, repo goal, milestones, everything) and start from where we left off... not 20 days ago."

**Current Pain:** Opening any EVA folder requires manual re-explanation of context, goals, current status → wastes time, breaks flow

---

## 📦 Existing Context/Memory Systems Discovered

### 1. **Time Tracking System (eva-orchestrator)**
**Location:** `eva-orchestrator/*.ps1`

**Files:**
- `login.ps1` - Start work session (USER IDENTIFIED AS ENTRY DOOR)
- `logoff.ps1` - End work session (USER IDENTIFIED AS EXIT DOOR)
- `list-sessions.ps1` - View session history
- `fix-sessions.ps1` - Data integrity repair
- `edit-session.ps1` - Modify session details
- `export-sessions.ps1` - Export sessions to CSV/JSON/MD
- `session-stats.ps1` - Analytics and trends
- `backup-sessions.ps1` - Backup/restore system
- `time-report.ps1` - Generate time reports
- `calculate-time.ps1` - Time calculations
- `work-sessions.json` - Session data store

**Data Model:**
```json
{
  "sessionId": "20251124-154326",
  "startTime": "2025-11-24T15:43:26Z",
  "endTime": null,
  "durationHours": 1.8,
  "project": "EVA Suite",
  "task": "bootstrap routine",
  "status": "active"
}
```

**Status:** ✅ **PRODUCTION READY** - 8 scripts, 60 tests, 92%+ pass rate  
**Gap:** Records WHEN/WHAT but not CONTEXT (what was discussed, decisions made, next actions)

---

### 2. **Session State Management (eva-orchestrator/sm-qa-toolbox)**
**Location:** `eva-orchestrator/sm-qa-toolbox/guardrails/manage-session.ps1`

**Purpose:** Git branch session management for Scrum Master workflow

**Features:**
- Tracks active session name and branch
- Session history in `.git/sm-sessions.json`
- Auto-stash/restore workflow
- Branch switching with session context

**Data Model:**
```json
{
  "version": 1,
  "activeSession": {
    "name": "session-name",
    "branch": "feature/work-branch",
    "startedAt": "2025-11-24T15:00:00Z"
  },
  "history": [
    {
      "name": "previous-session",
      "branch": "feature/old-work",
      "finishedAt": "2025-11-23T18:00:00Z"
    }
  ]
}
```

**Status:** ✅ Operational in eva-orchestrator  
**Gap:** Git-focused, doesn't capture conversational context or AI memory

---

### 3. **ChatGPT Bridge System (eva-orchestrator)**
**Location:** `eva-orchestrator/docs/chatgpt-bridge.md`, `chatgpt-bridge-checklist.md`

**Purpose:** Asynchronous communication channel between GitHub Copilot (Scrum Master) and ChatGPT (Senior Advisor)

**Pattern:**
1. Load context package into ChatGPT
2. Copy request from bridge file
3. ChatGPT generates structured response
4. Paste response back to bridge file
5. GitHub Copilot processes response

**Context Package Includes:**
- EVA vision and principles
- Current sprint goals
- Repo registry (17 EVA repos)
- Active work items
- Architectural patterns
- Governance headers (8 required)

**Status:** ✅ Operational workflow  
**Gap:** Manual copy/paste, no automatic context loading when opening folders

---

### 4. **Copilot Context Instructions (eva-orchestrator)**
**Location:** `eva-orchestrator/.github/eva-context.instructions.md`, `COPILOT-README.md`

**Purpose:** Auto-load context for new GitHub Copilot sessions

**Features:**
- Workspace-level context file
- Role definition (Scrum Master & QA Master)
- Quick commands reference
- Current focus areas
- Deep context pointers

**Key Pattern:**
```markdown
> **For new Copilot sessions: This workspace auto-loads context from `.github/eva-context.instructions.md`**

## ✅ You Will Not Lose Me
- Core patterns documented in `docs/`
- Session summaries in `docs/session-summaries/YYYY-MM-DD.md`
- Bridge to ChatGPT via `docs/chatgpt-bridge.md`
```

**Status:** ✅ Working for eva-orchestrator  
**Gap:** Not replicated to eva-suite, eva-meta, other repos

---

### 5. **Session Summaries (eva-orchestrator)**
**Location:** `eva-orchestrator/docs/session-summaries/2025-11-14.md` (example)

**Purpose:** Capture key ideas and decisions from work sessions

**Content:**
- Session date
- Key ideas to remember
- Decisions made
- Next actions
- Technical discoveries

**Example Entry:**
```markdown
## Key Ideas To Remember
- **EVA OS Extension**: VS Code/GitHub plugin delivering persistent, 
  repo-aware conversations with session ledger, nightly summaries, 
  and marketplace ambitions.
- **Portability**: Ability to migrate EVA memory and workflows across 
  VS Code, WSL2, Claude, and self-hosted Git servers.
```

**Status:** ✅ Manual documentation exists  
**Gap:** Not automated, not integrated with login/logout scripts

---

### 6. **EVA Chat Service - Session Persistence (Planned)**
**Location:** `eva-orchestrator/docs/backlog/eva-chat-service.md`

**Planned Features (FR-11):**
```markdown
### FR-11: Session Persistence
Chat SHALL persist conversation history in Cosmos DB, allowing resume 
after browser close (24-hour expiry).
```

**Data Model (Planned):**
```json
{
  "sessionId": "uuid",
  "userId": "marco@esdc",
  "tenantId": "ESDC",
  "conversationHistory": [
    {"role": "user", "content": "How do I..."},
    {"role": "assistant", "content": "You can..."}
  ],
  "context": {
    "project": "EVA Suite",
    "currentTask": "bootstrap",
    "lastActivity": "2025-11-24T15:43:26Z"
  }
}
```

**Status:** 📝 Documented in CDD, not yet implemented  
**Scope:** Covers EVA Chat product, not Copilot/ChatGPT sessions

---

### 7. **EVA Chat Widget - Session Persistence (Planned)**
**Location:** `eva-orchestrator/docs/backlog/eva-chat-widget.md`

**Planned Features (US-3, FR-6):**
```markdown
### US-3: As a user, I want persistent sessions so that I can resume 
conversations after page refresh

### FR-6: Session Persistence
System SHALL store session ID in localStorage (24-hour expiry) and 
sync chat history to Cosmos DB.
```

**Storage Pattern:**
- localStorage for client-side caching
- Cosmos DB for server-side persistence
- 24-hour session expiry
- Multi-device sync capability

**Status:** 📝 Documented in CDD, not yet implemented  
**Scope:** Web widget context, not AI assistant context

---

### 8. **EVA CloneMe - Context Recovery (Vision)**
**Location:** `eva-orchestrator/docs/EVA-2.0/vision/eva-cloneme.md`

**Vision:**
```markdown
### 1. **Instant Context Recovery**

**Scenario**: Someone asks "What's the status of NIST compliance?"

**Without CloneMe**: You search emails, check Teams, dig through 
SharePoint (15 min)

**With CloneMe**: "CloneMe, NIST status?"
- Response: "Last update: Nov 16, Jonathan confirmed timeline. 
  3 pending docs in SharePoint (links). Next milestone: Dec 1 
  (draft submission)."
- Time saved: 14 min
```

**Capabilities:**
- RAG index of all meetings/emails/conversations
- Commitment tracking
- Context-aware reminders
- Proactive preparation

**Status:** 💡 Vision document, not implemented  
**Relevance:** THIS IS THE MODEL - CloneMe for AI assistants themselves

---

### 9. **EVA OS Context Awareness (Planned)**
**Location:** `eva-orchestrator/docs/backlog/eva-os-context-awareness.md`

**Planned Context Capture:**
- UI controls (Accessibility APIs)
- Clipboard activity (with PII filtering)
- File system events (recent documents)
- Browser tabs and URLs
- Application states (Outlook: reading vs composing)
- Meeting context (Teams, Zoom)
- Context history (last 10 activities)

**Data Model:**
```csharp
new Context {
  Type = "clipboard",
  ContentType = "text",
  ContentLength = text.Length,
  HasPII = filtered != text,
  Timestamp = DateTime.UtcNow
}
```

**Status:** 📝 CDD documented, not implemented  
**Scope:** OS-level context, Windows integration

---

### 10. **WSL2 + Claude Integration Backlog**
**Location:** `eva-orchestrator/docs/backlog/eva-wsl2-claude-integration.md`

**Key Question:**
> "How do I transfer EVA's accumulated memory into this new environment 
> and keep it in sync?"

**Migration Concerns:**
- Replicate GitHub + VS Code + Copilot flow using WSL2/Claude
- Preserve conversational memory
- Maintain workflow continuity
- Self-hosted Git alternative

**Status:** 📝 Backlog item - portability planning  
**Relevance:** Memory portability is a known requirement

---

## 🎨 Patterns & Models Found

### Pattern 1: Entry/Exit Doors
**Current:** `login.ps1` (entry) + `logoff.ps1` (exit)  
**Records:** Time tracking only  
**Needed:** Load/save context at these points

### Pattern 2: Conversation History
**Found In:** EVA Chat (planned), EVA Widget (planned)  
**Model:** Array of `{role, content, timestamp}` messages  
**Persistence:** Cosmos DB + localStorage  
**Needed:** Apply this to Copilot/ChatGPT sessions

### Pattern 3: Context Package
**Found In:** ChatGPT Bridge  
**Contents:** Vision, goals, repos, work items, patterns  
**Delivery:** Manual copy/paste  
**Needed:** Automated loading from files

### Pattern 4: Session Summaries
**Found In:** `docs/session-summaries/*.md`  
**Contents:** Key ideas, decisions, next actions  
**Creation:** Manual markdown files  
**Needed:** Auto-generate from session activity

### Pattern 5: Git-Based State
**Found In:** `manage-session.ps1`  
**Storage:** `.git/sm-sessions.json`  
**Scope:** Branch and task tracking  
**Needed:** Expand to include conversation context

---

## 🔍 Key Findings

### ✅ What Works Today

1. **Time tracking is robust** - 8 scripts, full SDLC, production ready
2. **Git session management exists** - Branch/task correlation working
3. **ChatGPT Bridge pattern proven** - Manual but effective for context transfer
4. **Copilot context files work** - `.github/*.instructions.md` auto-loads in eva-orchestrator
5. **Session summaries capture decisions** - Manual but valuable historical record

### ❌ What's Missing

1. **No automatic context loading** when opening eva-suite, eva-meta, eva-foundation folders
2. **No context saving** when closing work session (logoff.ps1)
3. **Context not portable** across repos (each folder starts from scratch)
4. **No AI memory persistence** beyond current conversation window
5. **No integration** between time tracking and conversational context
6. **Manual workflows** - ChatGPT Bridge requires copy/paste
7. **No central memory store** - context scattered across files and tools

---

## 🎯 Gap Analysis

### Current State
```
User opens eva-suite folder
  ↓
Copilot starts fresh (no memory)
  ↓
User must re-explain project, goals, status, decisions
  ↓
Time wasted, flow broken
```

### Desired State
```
User runs login.ps1 (entry door)
  ↓
Script loads context: project goals, last session summary, next actions
  ↓
Copilot/ChatGPT receives context automatically
  ↓
User picks up exactly where they left off
  ↓
...work happens...
  ↓
User runs logoff.ps1 (exit door)
  ↓
Script saves context: what was discussed, decisions made, next steps
  ↓
Context ready for next session
```

---

## 💡 Solution Requirements (Derived from Inventory)

### 1. Context Schema
**Based on:** EVA Chat FR-11, CloneMe vision, Session summaries pattern

**Minimum Context Record:**
```json
{
  "repo": "eva-suite",
  "project": "EVA Suite",
  "lastUpdated": "2025-11-24T17:30:00Z",
  "sessionId": "20251124-154326",
  
  "goals": {
    "current": "Complete Sprint 3 hero demos",
    "milestones": [
      "LiveOps dashboard - DONE",
      "EVA DA demo - DONE",
      "DevTools dashboard - IN PROGRESS"
    ]
  },
  
  "recentWork": [
    {
      "date": "2025-11-24",
      "summary": "Developed 8 time tracking scripts with full test coverage",
      "deliverables": ["list-sessions.ps1", "fix-sessions.ps1", "..."],
      "decisions": ["Follow complete SDLC", "No throwaway code"],
      "issues": ["PSObject property bug", "Test regex issues"]
    }
  ],
  
  "nextActions": [
    "Build context persistence system",
    "Integrate with login/logout scripts",
    "Test across folder switches"
  ],
  
  "conversationHistory": [
    {
      "timestamp": "2025-11-24T15:45:00Z",
      "exchange": "User: execute login script → Agent: Found and executed login.ps1"
    },
    {
      "timestamp": "2025-11-24T16:30:00Z",
      "exchange": "User: create catalog → Agent: Created time-reporting-scripts-catalog.md"
    }
  ],
  
  "keyDecisions": [
    "Always check docs/catalog FIRST",
    "Never write inline/throwaway code",
    "Follow complete SDLC every time"
  ],
  
  "technicalContext": {
    "repos": ["eva-suite", "eva-orchestrator", "eva-meta"],
    "azureSubscription": "c59ee575-eb2a-4b51-a865-4b618f9add0a",
    "account": "marcopresta@yahoo.com",
    "sessionData": "work-sessions.json",
    "language": "PowerShell 7"
  }
}
```

### 2. Storage Location
**Options based on existing patterns:**

**Option A: Per-Repo Context Files** (like `.github/eva-context.instructions.md`)
- `eva-suite/.eva/context.json`
- `eva-orchestrator/.eva/context.json`
- `eva-meta/.eva/context.json`

**Option B: Central Memory Store** (like work-sessions.json)
- `eva-orchestrator/eva-memory.json` - single source of truth
- Cross-references all repos

**Option C: Hybrid** (recommended)
- Central store: `eva-orchestrator/eva-memory.json`
- Per-repo symlinks or pointers
- Load from both: repo-specific + shared context

### 3. Integration Points

**Entry Door (login.ps1):**
```powershell
# Existing functionality
Start work session tracking
Run health checks

# NEW: Load context
$context = Get-EvaContext -Repo (Get-Location)
Write-Output "📖 Loading context..."
Write-Output "   Project: $($context.project)"
Write-Output "   Last session: $($context.sessionId)"
Write-Output "   Current goal: $($context.goals.current)"
Write-Output "   Next actions:"
$context.nextActions | ForEach-Object { Write-Output "     - $_" }

# NEW: Create context prompt for Copilot
$contextPrompt = Build-ContextPrompt -Context $context
Set-Content -Path ".eva/current-context.md" -Value $contextPrompt

Write-Output "✅ Context loaded. Copilot is ready."
```

**Exit Door (logoff.ps1):**
```powershell
# Existing functionality
End work session tracking
Calculate duration
Update work-sessions.json

# NEW: Save context
$context = @{
  repo = "eva-suite"
  lastUpdated = (Get-Date).ToUniversalTime()
  sessionId = $SessionId
  summary = Read-Host "Brief summary of what was accomplished"
  nextActions = Read-Host "What should be done next? (comma-separated)"
  decisions = Read-Host "Any key decisions made? (optional)"
}

Save-EvaContext -Context $context
Write-Output "💾 Context saved for next session"
```

### 4. Context Prompt Generation

**Based on:** ChatGPT Bridge pattern, Copilot README pattern

**Template:**
```markdown
# EVA Suite Context - Loaded from Memory

**Repo:** eva-suite  
**Project:** EVA Suite  
**Last Session:** 2025-11-24 15:43 (1.8 hours ago)

## Current Goals
- Complete Sprint 3 hero demos
- Milestone: LiveOps ✅ | EVA DA ✅ | DevTools 🔄

## Recent Work (Last Session)
**Date:** 2025-11-24  
**Summary:** Developed 8 time tracking scripts with full test coverage

**Deliverables:**
- list-sessions.ps1 (10/10 tests PASSED)
- fix-sessions.ps1 (9/10 tests PASSED)
- [... 6 more scripts ...]

**Decisions Made:**
- Always check docs/catalog FIRST
- Never write inline/throwaway code
- Follow complete SDLC every time

**Issues Encountered:**
- PSObject property assignment requires Add-Member -Force
- Test cleanup timing caused false failures

## Next Actions
1. Build context persistence system
2. Integrate with login/logout scripts
3. Test context loading across folder switches

## Technical Context
- Azure Subscription: c59ee575-eb2a-4b51-a865-4b618f9add0a
- Repos: eva-suite, eva-orchestrator, eva-meta
- Time Tracking: work-sessions.json
- Active Session: 20251124-154326

## Key Principles (From Lessons Learned)
- Catalog before code
- Test immediately after coding
- No throwaway scripts
- Complete SDLC always
```

---

## 📊 Implementation Phases

### Phase 1: Proof of Concept (1-2 hours)
**Goal:** Prove context loading works

**Deliverables:**
- [ ] `load-context.ps1` - Read context file, display summary
- [ ] `save-context.ps1` - Write context file with prompts
- [ ] Sample context file: `eva-suite/.eva/context.json`
- [ ] Test: Run load-context, verify output matches expected

**Success Criteria:**
- Context file exists and is valid JSON
- Load script displays readable summary
- Save script prompts for input and writes file

### Phase 2: Login/Logout Integration (2-3 hours)
**Goal:** Automatic context at entry/exit doors

**Deliverables:**
- [ ] Update `login.ps1` to call `load-context.ps1`
- [ ] Update `logoff.ps1` to call `save-context.ps1`
- [ ] Generate `.eva/current-context.md` for Copilot
- [ ] Test: Run login → work → logoff → login again

**Success Criteria:**
- Login shows context summary
- Logoff prompts for summary and saves
- Next login shows previous session's context
- Copilot can read `.eva/current-context.md`

### Phase 3: Multi-Repo Support (2-3 hours)
**Goal:** Context works across eva-suite, eva-orchestrator, eva-meta

**Deliverables:**
- [ ] Central memory: `eva-orchestrator/eva-memory.json`
- [ ] Per-repo pointers: `eva-suite/.eva/context.json` → central store
- [ ] Cross-repo context merge (show related work from other repos)
- [ ] Test: Work in eva-suite, switch to eva-meta, verify context continuity

**Success Criteria:**
- Context loads in any EVA repo
- Shows relevant cross-repo information
- No duplicate context entries
- Central store is single source of truth

### Phase 4: Context Prompt Automation (1-2 hours)
**Goal:** Generate markdown prompts automatically

**Deliverables:**
- [ ] `build-context-prompt.ps1` - Convert JSON → Markdown
- [ ] Template file: `eva-orchestrator/templates/context-prompt.md`
- [ ] Auto-generate on login
- [ ] Test: Verify Copilot reads generated prompt

**Success Criteria:**
- Prompt file is human-readable markdown
- Contains all context sections (goals, recent work, next actions)
- Updates automatically on login
- Copilot can parse and use content

### Phase 5: Enhanced Context (Future)
**Goal:** Richer context capture

**Ideas:**
- Git commit history integration (what was changed)
- Recent file edits (what files touched in last session)
- Conversation history export (from Copilot chat window?)
- Decision log (append-only decisions.md)
- Lessons learned aggregation

---

## 🔗 Related Documents

### Existing Documentation
- `eva-orchestrator/time-reporting-scripts-catalog.md` - Master catalog (12 scripts)
- `eva-meta/ACHIEVEMENT-REPORT-20251124.md` - Session accomplishments
- `eva-meta/ENTERPRISE-BEST-PRACTICES.md` - Reusable playbook
- `eva-orchestrator/docs/chatgpt-bridge.md` - ChatGPT communication pattern
- `eva-orchestrator/COPILOT-README.md` - Copilot quick reference
- `eva-orchestrator/docs/session-summaries/` - Historical session notes

### Relevant CDDs (Future Features)
- `eva-orchestrator/docs/backlog/eva-chat-service.md` - Chat persistence pattern
- `eva-orchestrator/docs/backlog/eva-chat-widget.md` - Session management model
- `eva-orchestrator/docs/backlog/eva-os-context-awareness.md` - OS-level context capture
- `eva-orchestrator/docs/backlog/eva-wsl2-claude-integration.md` - Memory portability

---

## 🎯 Success Metrics

**Measure 1: Context Loading Time**
- **Baseline:** 0 (no context loaded)
- **Target:** < 2 seconds to load and display context summary
- **Measure:** Stopwatch from `login.ps1` start to context display complete

**Measure 2: Re-Explanation Time Saved**
- **Baseline:** ~5-10 minutes per folder switch (manual re-explanation)
- **Target:** 0 minutes (context auto-loaded)
- **Measure:** Time from "open folder" to "productive work" comparison

**Measure 3: Context Accuracy**
- **Baseline:** 0% (no context)
- **Target:** 90%+ (context reflects actual last session state)
- **Measure:** User validation - "Does this summary match what I did?"

**Measure 4: Workflow Continuity**
- **Baseline:** Starting from scratch each session
- **Target:** Immediate pickup from last session
- **Measure:** Number of clarifying questions needed from user

---

## 📝 Next Steps

**Immediate (Today):**
1. ✅ Complete this inventory document
2. Share with Marco for validation
3. Get approval on proposed solution design
4. Prioritize Phase 1 (Proof of Concept)

**Short Term (This Week):**
1. Implement Phase 1: load-context.ps1 + save-context.ps1
2. Test with eva-suite folder
3. Validate context schema works
4. Document any issues

**Medium Term (Next Week):**
1. Phase 2: Integrate with login/logout
2. Phase 3: Multi-repo support
3. Phase 4: Context prompt automation
4. User acceptance testing with Marco

---

## 🤝 Stakeholder Input Needed

**Questions for Marco:**

1. **Context Schema:** Does the proposed JSON structure include everything you need to remember?
2. **Storage Location:** Prefer per-repo files, central store, or hybrid?
3. **Entry/Exit Prompts:** How much detail during save-context? (Quick 1-liner or detailed Q&A?)
4. **Cross-Repo Linking:** Should eva-suite context show related eva-meta work?
5. **ChatGPT Integration:** Should context auto-copy to clipboard for ChatGPT paste?
6. **Context Expiry:** Keep last N sessions or time-based (e.g., 30 days)?
7. **Privacy:** Any sensitive info to exclude from context files?

---

**END OF INVENTORY**

_This document will be updated as context persistence system is built._
