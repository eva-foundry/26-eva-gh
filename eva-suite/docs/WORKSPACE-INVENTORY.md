# EVA SUITE WORKSPACE - COMPLETE INVENTORY

**Date**: November 27, 2025  
**Total Repositories**: 27  
**Active Branch**: feature/eva-ui-unified-chat-frame (eva-ui)

---

## 📊 REPOSITORY OVERVIEW BY POD

### POD-F: FOUNDATION (Core Platform) - 4 repos

| Repo | Status | Files | Description |
|------|--------|-------|-------------|
| **eva-core** | 🟢 Active | 33 | Domain model, orchestrators, provider SPI |
| **eva-agent** | 🟢 Active | 23 | Planner/executor loop, tool registry, memory, budgets |
| **eva-auth** | 🟢 Active | 12 | Entra ID JWT validation, role/tenant mapping, middleware |
| **eva-foundation** | ⚪ Scaffold | 0 | Azure Functions runtime (being migrated) |

**Key Dependencies**: zod, uuid, jose

---

### POD-S: SERVICES (AI & Data) - 7 repos

| Repo | Status | Files | Description |
|------|--------|-------|-------------|
| **eva-openai** | 🟢 Active | 26 | Azure OpenAI chat/tool calling abstractions |
| **eva-rag** | 🟢 Active | 40 | Ingestion, chunking, hybrid search, citations |
| **eva-mcp** | 🟢 Active | 17 | MCP client + servers (azure, sharepoint, search, tools) |
| **eva-safety** | 🟢 Active | 23 | Pre/post filters, moderation, injection defense |
| **eva-metering** | 🟢 Active | 24 | Event pipeline, token/cost calculation, FinOps |
| **eva-i18n** | 🟢 Active | 14 | Catalog management (en-US, fr-FR), ICU formatting |
| **eva-i11y** | 🟢 Active | 27 | Accessibility primitives (SkipLink, RouteFocus, focus-visible) |

**Key Features**:
- MCP server architecture with stdio communication
- Hybrid search (vector + keyword)
- Token budget management
- Bilingual support (en-CA, fr-CA)

---

### POD-X: EXPERIENCE (UIs & APIs) - 4 repos

| Repo | Status | Files | Description |
|------|--------|-------|-------------|
| **eva-api** | 🟢 Active | 42 | REST/GraphQL + SSE/WebSockets |
| **eva-ui** | 🟢 Mature | 76 | Chat UI with telemetry + **Unified Chat Frame MVP** |
| **eva-admin** | 🟡 Started | 5 | Admin/management interface (React + Vite) |
| **eva-suite** | 🟢 Active | 18 | Demo/showcase site (GitHub Pages) |

**Current Work**: 
- ✅ Unified Chat Frame MVP completed in eva-ui
- Branch: `feature/eva-ui-unified-chat-frame`
- Commit: `c9fdfe9` (10 files, 452 lines)
- Features: Semantic HTML, ARIA accessibility, i18n (en-CA/fr-CA), demo-ready
- Next: Wire mock APIM + telemetry (issue #5)

---

### POD-O: OPERATIONS (Data & Ops) - 5 repos

| Repo | Status | Files | Description |
|------|--------|-------|-------------|
| **eva-ops** | 🟢 Mature | 105 | Live Ops dashboard, feature flags, scheduler, queue, events |
| **eva-da-2** | 🟢 Mature | 74 | Dashboard Admin 2.0 (enhanced admin UI) |
| **eva-seed** | ⚪ Scaffold | 0 | Data seeding scripts (Cosmos, Search, catalogs, tenants) |
| **eva-dal** | ⚪ Scaffold | 0 | Data Access Layer abstraction |
| **eva-directory** | ⚪ Scaffold | 0 | App/agent registry with metadata, cost center, RBAC |

**eva-ops Capabilities**:
- Prometheus exporter
- Event bus system
- Audit trail
- Feature flag management
- Health checks & diagnostics
- Batch scheduler

---

### INFRASTRUCTURE - 2 repos

| Repo | Status | Files | Description |
|------|--------|-------|-------------|
| **eva-infra** | ⚪ Scaffold | 0 | Terraform landing zone (networking, Key Vault, APIM, monitoring) |
| **eva-utils** | 🟢 Active | 19 | Logging, config, retry/backoff, circuit breakers, token budgets |

**eva-utils Features**:
- OpenTelemetry integration
- Circuit breaker pattern
- Exponential backoff retry
- Token budget enforcement
- Config management with Key Vault

---

### TOOLS & META - 3 repos

| Repo | Status | Files | Description |
|------|--------|-------|-------------|
| **eva-devtools** | ⚪ Scaffold | 0 | CLI, VS Code tasks, GitHub templates, Codespaces configs |
| **eva-enterprise** | ⚪ Scaffold | 0 | Integration tests, version BOM, one-click deploy orchestration |
| **eva-orchestrator** | 🟡 Started | 5 | Workspace orchestration, sprint management, health checks |

---

### EXTERNAL/REFERENCE - 4 repos

| Repo | Status | Type | Description |
|------|--------|------|-------------|
| **eva-meta** | ⚪ Scaffold | Docs | Architecture docs, backlogs, sprint manifests |
| **eva-matrix** | ⚪ Redirect | Legacy | Old dashboard (redirects to eva-suite) |
| **OpenWebUI** | 🟢 Fork | External | Forked from open-webui/open-webui for customization |
| **PubSec-Info-Assistant** | 🟢 Fork | Reference | Reference implementation (Protected B compliance) |
| **ux-accessibility** | 🟡 Started | Library | ESDC accessibility UI library (WCAG 2.1 AA) |

---

## 📈 MATURITY STATISTICS

- **🟢 Active/Mature**: 17 repositories (63%)
- **🟡 Started**: 3 repositories (11%)
- **⚪ Scaffold**: 7 repositories (26%)

### Most Mature Repositories
1. **eva-ops** - 105 files (feature flags, scheduler, metrics, health)
2. **eva-ui** - 76 files (chat UI + Unified Chat Frame MVP)
3. **eva-da-2** - 74 files (admin dashboard)
4. **eva-api** - 42 files (REST/GraphQL + real-time)
5. **eva-rag** - 40 files (hybrid search + citations)

---

## 🔑 KEY ARCHITECTURAL PATTERNS

### Authentication & Authorization
- **eva-auth**: Entra ID JWT validation, role mapping
- Pattern: Middleware-based, tenant-aware RBAC

### AI Services
- **eva-openai**: Provider abstraction over Azure OpenAI
- **eva-rag**: Hybrid search (vector + keyword) with citations
- **eva-mcp**: Model Context Protocol for tool integration
- **eva-safety**: Pre/post filters, content moderation

### Operations
- **eva-ops**: Feature flags, scheduler, event bus
- **eva-utils**: Circuit breakers, retry logic, budgets
- **eva-metering**: Token/cost tracking, FinOps attribution

### User Experience
- **eva-ui**: React + Vite, accessibility-first, bilingual
- **eva-i11y**: Reusable a11y primitives (SkipLink, RouteFocus)
- **eva-i18n**: ICU message formatting, catalog management

---

## 🚀 CURRENT DEVELOPMENT STATE

### Active Feature Branch
- **Repo**: eva-ui
- **Branch**: `feature/eva-ui-unified-chat-frame`
- **Commit**: `c9fdfe9`
- **Status**: ✅ MVP Complete (10 files, 452 lines)

### Unified Chat Frame MVP Components
```
src/features/unified-chat/
├── UnifiedChatFrame.tsx              # Main component
├── components/
│   ├── ChatHeader.tsx                # Title + locale/mode toggles
│   ├── ChatMessageList.tsx           # Scrollable transcript (role="log")
│   ├── ChatInputBar.tsx              # Input + send button
│   ├── ChatStatusBar.tsx             # Token/cost display
│   └── ChatContextPanel.tsx          # Thread list placeholder
└── lib/
    ├── messages.ts                   # en-CA / fr-CA catalog
    └── useI18n.ts                    # i18n hook
```

### Issues Mapped
- ✅ Issue #2: Basic UI layout scaffold
- ✅ Issue #3: Two-column responsive layout
- ✅ Issue #4: i18n foundation (en-CA / fr-CA)
- ✅ Issue #6: Accessibility (ARIA roles, labels, focus)
- 🔜 Issue #5: Wire mock APIM + telemetry

---

## 🔗 REPOSITORY REMOTES

All 27 repositories are hosted under **github.com/MarcoPolo483**:

```
eva-admin              https://github.com/MarcoPolo483/eva-admin.git
eva-agent              https://github.com/MarcoPolo483/eva-agent.git
eva-api                https://github.com/MarcoPolo483/eva-api.git
eva-auth               https://github.com/MarcoPolo483/eva-auth.git
eva-core               https://github.com/MarcoPolo483/eva-core.git
eva-da-2               https://github.com/MarcoPolo483/eva-da-2.git
eva-devtools           (scaffold - not yet pushed)
eva-directory          (scaffold - not yet pushed)
eva-enterprise         https://github.com/MarcoPolo483/eva-enterprise.git
eva-foundation         https://github.com/MarcoPolo483/eva-foundation.git
eva-i11y               https://github.com/MarcoPolo483/eva-i11y.git
eva-i18n               https://github.com/MarcoPolo483/eva-i18n.git
eva-infra              https://github.com/MarcoPolo483/eva-infra.git
eva-matrix             https://github.com/MarcoPolo483/eva-matrix.git
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
OpenWebUI              https://github.com/MarcoPolo483/OpenWebUI.git
PubSec-Info-Assistant  https://github.com/MarcoPolo483/PubSec-Info-Assistant.git
ux-accessibility       https://github.com/MarcoPolo483/ux-accessibility.git
```

---

## 📦 TECHNOLOGY STACK

### Languages & Runtimes
- **TypeScript** (primary) - All repos use ESM modules
- **React 18** - UI layer (eva-ui, eva-admin, eva-suite)
- **Node.js** - Backend services

### Key Dependencies
- **Zod** - Schema validation (eva-agent, eva-auth, eva-utils)
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool & dev server
- **Vitest** - Unit testing
- **OpenTelemetry** - Observability (eva-utils)
- **jose** - JWT handling (eva-auth)

### Azure Services
- Azure OpenAI Service
- Azure Cosmos DB (vector search capable)
- Azure AI Search (hybrid search)
- Azure Blob Storage
- Azure Key Vault
- Azure API Management
- Azure Functions

---

## 🎯 NEXT STEPS

### Immediate (Sprint Current)
1. ✅ Complete Unified Chat Frame MVP scaffold
2. 🔜 Wire mock APIM integration (issue #5)
3. 🔜 Add telemetry events (chat_message_sent, etc.)
4. 🔜 Test responsive layout on mobile widths

### Short-term (Next Sprint)
- Implement eva-dal Data Access Layer
- Create eva-seed seeding scripts
- Set up eva-infra Terraform modules
- Build eva-devtools CLI

### Medium-term
- Complete eva-enterprise integration tests
- Deploy eva-matrix redirect to GitHub Pages
- Finalize ux-accessibility library

---

## 📝 WORKSPACE CONFIGURATION

This workspace uses a **multi-root workspace** configuration in VS Code:
- Workspace file: `OpenWebUI.code-workspace`
- All 27 repos are folders in the workspace
- Centralized navigation and search across entire EVA Suite

### Git Workflow
- Feature branches per repo (e.g., `feature/eva-ui-unified-chat-frame`)
- Protected main branches
- PR-based merges with QA gate checks
- GitHub Actions for CI/CD

---

**Last Updated**: November 27, 2025  
**Maintained by**: EVA Agile Command (Scrum Master: GitHub Copilot)
