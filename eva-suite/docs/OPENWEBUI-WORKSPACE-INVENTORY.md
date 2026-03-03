# OpenWebUI.code-workspace - Complete Inventory

**Workspace File**: `OpenWebUI.code-workspace`  
**Location**: `c:\Users\marco\Documents\_AI Dev\EVA Suite\OpenWebUI\`  
**Date**: November 27, 2025  
**Total Folders**: 31

---

## 📊 WORKSPACE FOLDERS OVERVIEW

### EVA Core Repositories (Git-tracked, Active Development)

| Folder | Status | Files | Type | Description |
|--------|--------|-------|------|-------------|
| **eva-api** | 🟢 Active | 42 | Git | REST/GraphQL + SSE/WebSockets |
| **eva-agent** | 🟢 Active | 23 | Git | Planner/executor loop, tool registry |
| **eva-auth** | 🟢 Active | 12 | Git | Entra ID JWT validation, RBAC |
| **eva-core** | 🟢 Active | 33 | Git | Domain model, orchestrators, SPI |
| **eva-foundation** | ⚪ Scaffold | 0 | Git | Azure Functions runtime |
| **eva-i11y** | 🟢 Active | 27 | Git | Accessibility primitives |
| **eva-i18n** | 🟢 Active | 14 | Git | i18n catalog (en-US, fr-FR) |
| **eva-infra** | ⚪ Scaffold | 0 | Git | Terraform landing zone |
| **eva-mcp** | 🟢 Active | 17 | Git | MCP client + servers |
| **eva-metering** | 🟢 Active | 24 | Git | Token/cost calculation |
| **eva-openai** | 🟢 Active | 26 | Git | Azure OpenAI abstractions |
| **eva-ops** | 🟢 Mature | 105 | Git | Live Ops, feature flags, scheduler |
| **eva-rag** | 🟢 Active | 40 | Git | Hybrid search, citations |
| **eva-safety** | 🟢 Active | 23 | Git | Content moderation, filters |
| **eva-seed** | ⚪ Scaffold | 0 | Git | Data seeding scripts |
| **eva-utils** | 🟢 Active | 19 | Git | Logging, retry, circuit breakers |

### EVA UI & Admin Repositories

| Folder | Status | Files | Type | Description |
|--------|--------|-------|------|-------------|
| **eva-admin** | 🟡 Started | 5 | Git | Admin management interface |
| **eva-da-2** | 🟢 Mature | 74 | Git | Dashboard Admin 2.0 |
| **eva-suite** | 🟢 Active | 18 | Git | Demo/showcase (GitHub Pages) |
| **eva-ui** | 🟢 Mature | 76 | Git | **Chat UI + Unified Chat Frame MVP** |

### EVA Meta & Orchestration

| Folder | Status | Files | Type | Description |
|--------|--------|-------|------|-------------|
| **eva-enterprise** | ⚪ Scaffold | 0 | Git | Integration tests, BOM |
| **eva-meta** | ⚪ Scaffold | 0 | Git | Architecture docs, backlogs |
| **eva-orchestrator** | 🟡 Started | 5 | Git | Workspace orchestration, sprint mgmt |

### Special Purpose Folders (Non-Git)

| Folder | Type | Purpose |
|--------|------|---------|
| **_SeniorAdv-office** | Dir | Senior advisor reports, task queue, briefs |
| **-empty-workspace** | Dir | Placeholder/template directory |
| **eva-apim-governance-poc** | Dir | APIM governance PoC (BACKLOG.md, PROJECT-PLAN.md) |
| **eva-docs** | Dir | Documentation repository (eva-docs design notes) |
| **eva-sandbox** | Dir | Demo scenarios, PoCs, sample apps |
| **eva-devtools** | Dir | CLI tools, VS Code tasks, templates |

### External/Reference Repositories

| Folder | Status | Files | Type | Description |
|--------|--------|-------|------|-------------|
| **OpenWebUI** | 🟢 Mature | 56 | Git | **Fork of open-webui/open-webui** |
| **PubSec-Info-Assistant** | ⚪ Scaffold | 0 | Git | Reference implementation (Protected B) |

---

## 📈 STATISTICS

### By Status
- **🟢 Mature** (50+ files): 4 folders (eva-ops, eva-ui, eva-da-2, OpenWebUI)
- **🟢 Active** (11-49 files): 13 folders
- **🟡 Started** (1-10 files): 2 folders (eva-orchestrator, eva-admin)
- **⚪ Scaffold** (0 files): 12 folders

### By Type
- **Git Repositories**: 25 folders (83%)
- **Directories**: 6 folders (17%)

### Total Source Files (TypeScript/TSX)
- **Active Development**: ~570 TypeScript files across all active repos
- **Most Mature**: eva-ops (105 files), eva-ui (76 files), eva-da-2 (74 files)

---

## 🎯 WORKSPACE PURPOSE

This workspace consolidates **all EVA Suite development** plus:
- **OpenWebUI** (primary workspace owner) - Forked external UI for customization
- **PubSec-Info-Assistant** - Reference architecture for Protected B compliance
- **Senior Advisor Office** - Planning, reports, task queues, briefs
- **Proof-of-Concepts** - APIM governance, demos, sandboxes

---

## 🔑 KEY FOLDERS DETAIL

### 1. **OpenWebUI** (Workspace Owner)
- **Status**: 🟢 Mature (56 TypeScript files)
- **Type**: Forked from `open-webui/open-webui`
- **Remote**: `https://github.com/MarcoPolo483/OpenWebUI.git`
- **Purpose**: External chat UI with customizations for EVA integration
- **Config**: Contains `OpenWebUI.code-workspace` (this file)

### 2. **eva-ui** (Primary EVA Chat Interface)
- **Status**: 🟢 Mature (76 TypeScript files)
- **Branch**: `feature/eva-ui-unified-chat-frame`
- **Latest Work**: Unified Chat Frame MVP (commit `c9fdfe9`)
- **Features**: 
  - Semantic HTML with ARIA accessibility
  - i18n (en-CA/fr-CA)
  - Chat components with telemetry
  - Responsive layout
- **Route**: `/demo/unified-chat-frame`

### 3. **eva-ops** (Most Mature)
- **Status**: 🟢 Mature (105 TypeScript files)
- **Capabilities**:
  - Feature flag management
  - Event bus system
  - Batch scheduler
  - Prometheus exporter
  - Audit trail
  - Health checks & diagnostics

### 4. **eva-da-2** (Dashboard Admin 2.0)
- **Status**: 🟢 Mature (74 TypeScript files)
- **Purpose**: Enhanced admin UI for EVA operations
- **Tech**: React + TypeScript

### 5. **_SeniorAdv-office** (Planning Hub)
- **Type**: Directory (non-Git)
- **Contents**:
  - `eva-suite-full-tree.txt` - Complete repo structure
  - `P02-as-master-conceptual-idea.md` - Conceptual design
  - `p02-reports/` - Reports directory
  - `p02-task-queue/` - Task management
  - `sm-briefs/` - Scrum Master briefs
  - `eva-orchestrator/templates/` - Orchestrator templates

### 6. **eva-apim-governance-poc**
- **Type**: Directory (non-Git)
- **Purpose**: API Management governance proof-of-concept
- **Files**: `BACKLOG.md`, `PROJECT-PLAN.md`

### 7. **eva-docs**
- **Type**: Directory (non-Git)
- **Purpose**: Documentation repository design notes
- **Audience**: Scrum Master, Agile Crew, Humans

### 8. **eva-sandbox**
- **Type**: Directory (non-Git)
- **Purpose**: Demo scenarios, sample apps, PoCs
- **Note**: Keeps experimental code separate from core repos

---

## 🏗️ ARCHITECTURE OVERVIEW

### POD Organization (from Core EVA Repos)

**POD-F (Foundation)**
- eva-core, eva-agent, eva-auth, eva-foundation

**POD-S (Services)**
- eva-openai, eva-rag, eva-mcp, eva-safety, eva-metering, eva-i18n, eva-i11y

**POD-X (Experience)**
- eva-api, eva-ui, eva-admin, eva-suite

**POD-O (Operations)**
- eva-ops, eva-da-2, eva-seed

**Infrastructure**
- eva-infra, eva-utils

**Tools & Meta**
- eva-devtools, eva-enterprise, eva-orchestrator, eva-meta

---

## 🔗 GIT REPOSITORIES

All Git-tracked folders are under **github.com/MarcoPolo483**:

```
OpenWebUI              https://github.com/MarcoPolo483/OpenWebUI.git
PubSec-Info-Assistant  https://github.com/MarcoPolo483/PubSec-Info-Assistant.git
eva-admin              https://github.com/MarcoPolo483/eva-admin.git
eva-agent              https://github.com/MarcoPolo483/eva-agent.git
eva-api                https://github.com/MarcoPolo483/eva-api.git
eva-auth               https://github.com/MarcoPolo483/eva-auth.git
eva-core               https://github.com/MarcoPolo483/eva-core.git
eva-da-2               https://github.com/MarcoPolo483/eva-da-2.git
eva-enterprise         https://github.com/MarcoPolo483/eva-enterprise.git
eva-foundation         https://github.com/MarcoPolo483/eva-foundation.git
eva-i11y               https://github.com/MarcoPolo483/eva-i11y.git
eva-i18n               https://github.com/MarcoPolo483/eva-i18n.git
eva-infra              https://github.com/MarcoPolo483/eva-infra.git
eva-mcp                https://github.com/MarcoPolo483/eva-mcp.git
eva-meta               https://github.com/MarcoPolo483/eva-meta.git
eva-metering           https://github.com/MarcoPolo483/eva-metering.git
eva-openai             https://github.com/MarcoPolo483/eva-openai.git
eva-ops                https://github.com/MarcoPolo483/eva-ops.git
eva-orchestrator       https://github.com/MarcoPolo483/eva-orchestrator.git
eva-rag                https://github.com/MarcoPolo483/eva-rag.git
eva-safety             https://github.com/MarcoPolo483/eva-safety.git
eva-seed               https://github.com/MarcoPolo483/eva-seed.git
eva-suite              https://github.com/MarcoPolo483/eva-suite.git
eva-ui                 https://github.com/MarcoPolo483/eva-ui.git
eva-utils              https://github.com/MarcoPolo483/eva-utils.git
```

---

## 🚀 CURRENT DEVELOPMENT STATE

### Active Feature Branch
- **Repo**: eva-ui
- **Branch**: `feature/eva-ui-unified-chat-frame`
- **Commit**: `c9fdfe9` (10 files, 452 lines)
- **Status**: ✅ MVP Complete

### Recent Activity
- ✅ Unified Chat Frame MVP scaffolded (eva-ui)
- ✅ Workspace inventory documented (eva-suite)
- ✅ 27 repositories synchronized with GitHub
- ✅ OpenWebUI forked and configured

---

## 📝 WORKSPACE CONFIGURATION

### VS Code Multi-Root Workspace
- **File**: `OpenWebUI.code-workspace` (JSON)
- **Folders**: 31 (relative paths using `../`)
- **Navigation**: Unified search and IntelliSense across all folders
- **Git**: Each folder maintains independent Git status

### Benefits
- Single workspace for entire EVA Suite ecosystem
- Cross-repository code navigation
- Centralized search and find/replace
- Consistent VS Code settings across repos

---

## 🎯 NEXT STEPS

### Immediate (Current Sprint)
1. ✅ Unified Chat Frame MVP complete
2. 🔜 Wire mock APIM integration (eva-ui issue #5)
3. 🔜 Add telemetry events
4. 🔜 Test responsive behavior

### Short-term
- Document OpenWebUI customization strategy
- Implement eva-dal Data Access Layer
- Create eva-seed seeding scripts
- Scaffold eva-devtools CLI

### Medium-term
- Complete eva-enterprise integration tests
- Deploy eva-infra Terraform modules
- Finalize PubSec-Info-Assistant integration

---

**Workspace Owner**: OpenWebUI (forked external UI)  
**Workspace Purpose**: Unified development environment for EVA Suite + external references  
**Last Updated**: November 27, 2025  
**Maintained by**: EVA Agile Command (Scrum Master: GitHub Copilot)
