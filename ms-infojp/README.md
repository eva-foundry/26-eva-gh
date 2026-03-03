# MS-InfoJP: Jurisprudence AI Assistant MVP

## Overview

**MS-InfoJP** is a reference implementation of a Jurisprudence AI assistant, built on the [Microsoft Public Sector Information Assistant](https://github.com/microsoft/PubSec-Info-Assistant) platform. This MVP demonstrates the feasibility and UX quality achievable using Azure OpenAI, Azure AI Search, and RAG (Retrieval Augmented Generation) architecture for Employment Insurance (EI) case law queries.

The system ingests jurisprudence documents from CanLII, indexes them for hybrid search (vector + keyword), and generates answers with inline citations linking back to source case documents.

---

## Deployment Information

**Azure Subscription**: `c59ee575-eb2a-4b51-a865-4b618f9add0a` (PayAsYouGo Subs 1)  
**Tenant**: `bfb12ca1-7f37-47d5-9cf5-8aa52214a0d8` (marcoprestayahoo.onmicrosoft.com)  
**Resource Group**: `infojp-sandbox`  
**Location**: East US (matching existing `ao-sandbox`)  
**Deployment Method**: Raw Azure CLI commands (copy-paste)  
**Deployment Date**: January 26, 2026

**Deployment Status**: ✅ Infrastructure Complete + Codespaces Ready  
**Monthly Cost**: $84-96/month (Azure services only, $0 compute with GitHub Pro 180 hrs/month)  
**Azure OpenAI**: ✅ Using existing `ao-sandbox` (gpt-4o + text-embedding-3-small)  
**Development Environment**: ✅ GitHub Codespaces  
**Deployment Source**: `base-platform/` subdirectory (fresh Microsoft clone, commit 807ee181)

---

## 🚀 Quick Start with GitHub Codespaces (5 Minutes)

### 1. Create Codespace
- Click **Code** → **Codespaces** → **Create codespace on main**
- Wait ~3 minutes for devcontainer to build

### 2. Run Deployment
```bash
bash DEPLOY.sh
```
- Installs Azure CLI
- Authenticates to Azure (complete device code in browser)
- Generates environment config
- Creates storage/database containers
- Deploys search index

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd base-platform/app/backend
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd base-platform/app/frontend
npm install && npm run dev
```

**Access**: VS Code shows port forwarding notification → click to open frontend

📖 **Detailed guide**: See [CODESPACE-SETUP.md](./CODESPACE-SETUP.md)

---

## MVP Goal

**"Deliver a working Jurisprudence AI assistant with clear answers, citations, and superior UX, using existing data and minimal new infrastructure."**

### Advanced Features Roadmap

**Phase 1 - Core Infrastructure** (✅ Completed Jan 26):
- ✅ Resource Group: infojp-sandbox (East US)
- ✅ Azure OpenAI: ao-sandbox (gpt-4o + text-embedding-3-small) - existing, reused
- ✅ Azure AI Services: infojp-ai-svc (S0 pay-per-use)
- ✅ Azure Cognitive Search: infojp-srch (Basic tier)
- ✅ Azure Cosmos DB: infojp-cosmos (Serverless)
- ✅ Azure Storage Accounts: infojpst01, infojpstfunc01 (Standard_LRS)
- ✅ Azure Key Vault: infojp-kv (Standard, RBAC)
- ✅ Azure Document Intelligence: infojp-doc-intel (S0 pay-per-use)
- ✅ **GitHub Codespaces**: Approved compute solution ($0/month with GitHub Pro 180 hrs/month)

**Phase 2 - Case Law Customization**:
- Semantic chunking with legal section awareness
- Rich metadata extraction (citations, courts, judges, dates)
- Case law canonical model (precedents, citation graph)
- Bilingual processing (EN/FR)
- RAG enrichment for case law specifics

---

## Scope

### In-Scope for MVP

**Features:**
- User authentication (Entra ID)
- Chat-based query interface
- Display answers with inline citations
- Case reference links to source documents
- Chat history per session
- Question routing to RAG backend
- Prompt templates tuned for jurisprudence queries
- Citation enforcement in responses

**Data & Ingestion:**
- Incremental refresh using CanLII metadata (Change Data Capture approach)
- Support for PDF and HTML case documents
- Deterministic re-runs of ingestion pipeline
- Metadata enrichment (court, date, outcome, EI topics)

**UX Improvements:**
- Processing state indicators during answer generation
- Clearer citation presentation (inline or below answer)
- Direct links to source case documents
- Optional user feedback on answer usefulness

### Out-of-Scope for MVP

The following are **explicitly excluded** from the sandbox MVP:

- Multilingual UI (i18n)
- Accessibility (a11y) enhancements
- Advanced analytics dashboards
- Multi-language index separation
- Production deployment
- Azure App Services (using GitHub Codespaces instead)
- APIM integration
- Multi-tenant support

---

## Architecture Overview

### Logical Architecture (ABRG-aligned)

```
┌─────────────────────────────────────────────────────────────────┐
│                       User Browser                               │
│                    (Entra ID Auth)                               │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Azure API Management                          │
│                  (Shared Entry Point)                            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│               Web App + Backend API                              │
│           (App Service / Container-based)                        │
│                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  Chat UI     │───▶│  RAG Backend │───▶│  Prompts &   │      │
│  │              │    │              │    │  Templates   │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
└───────────────────────────┬─────────────────────────────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
    ┌────────────────┐ ┌──────────┐ ┌──────────────┐
    │ Azure OpenAI   │ │ Azure AI │ │ Azure Blob   │
    │ (GPT-4 + Ada)  │ │ Search   │ │ Storage      │
    └────────────────┘ └──────────┘ └──────────────┘
                            │
                            │ Indexed documents
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
    ┌──────────────────┐      ┌──────────────────┐
    │ CanLII CDC       │      │ Ingestion        │
    │ (Metadata Poll)  │─────▶│ Pipeline         │
    └──────────────────┘      │ (Parse, Chunk,   │
                               │  Embed, Index)   │
                               └──────────────────┘
```

### Key Components

1. **Web App + Backend API**: React frontend + Python/Quart backend from PubSec-Info-Assistant base
- **Azure OpenAI**: GPT-4 (gpt-4o) for answer generation, text-embedding-3-small for vector embeddings
3. **Azure AI Search**: Hybrid index (vector + keyword) for case document retrieval
4. **Azure Blob Storage**: Raw case documents (PDF/HTML)
5. **CanLII CDC**: Metadata polling to detect new/updated cases
6. **Ingestion Pipeline**: Azure Functions for document processing, chunking, embedding, indexing
7. **Azure Key Vault**: Secrets management

---

## Data Ingestion & CanLII CDC Approach

### Change Data Capture (CDC) Strategy

**Core Documentation** (see [cdc/CDC-INDEX.md](cdc/CDC-INDEX.md) for navigation guide):
- [CDC MVP Design Document](cdc/cdc-mvp-design.md) - Comprehensive CDC architecture and policies
- [CDC MVP Artifacts](cdc/cdc-mvp-artifacts.md) - Build-ready deliverables and acceptance criteria
- [CDC Change Policy](cdc/change-policy.yaml) - Authoritative classification rules (v0.1.0)
- [CDC Acceptance Tests](cdc/acceptance-tests.md) - 26 Given/When/Then test specifications
- [CDC Database Schema](cdc/minimal-schema-ddl.md) - 11-table schema with Cosmos DB mappings
- [CDC Downstream Contract](cdc/downstream-invalidation-contract.md) - Minimal recompute rules for RAG pipeline
- [CDC Operations/Admin UI](cdc/operations-admin-control-plane.md) - Phase 2+ reporting and admin features

CanLII does not provide a native CDC endpoint. The MVP implements a **tiered, evidence-first CDC approach**:

#### Tier 1 — Registry Polling (Metadata-based)
1. **Metadata Poll**: Periodically query CanLII metadata API for EI-related cases within defined **scope_id** (e.g., `SST-GD-EN-rolling-24mo`)
2. **Change Detection**: Compare metadata snapshots using content-addressable hashing
3. **Registry Management**: Maintain stable internal `case_id` mapped to external keys (CanLII identifiers, URLs)

#### Tier 2 — Artifact Verification (Content-based)
4. **Conditional Download**: Fetch full case documents (PDF or HTML) only when:
   - New case detected in registry
   - Metadata hash indicates meaningful change
   - Artifact missing or hash mismatch in blob storage
5. **Ingestion Pipeline**:
   - Parse and extract text from PDF/HTML
   - Enrich with metadata (court, date, outcome, EI topics)
   - Chunk text for optimal retrieval (e.g., 1000-token chunks with overlap)
   - Generate embeddings using text-embedding-3-small
   - Index in Azure AI Search with hybrid configuration

### CDC Core Principles

- **Evidence-first**: Every poll produces `poll_run` + `change_event` records for audit and replay
- **Minimal recompute**: Only re-process changed cases/chunks (no full corpus re-embed)
- **Versioned corpus**: Track `case_version` for every meaningful change
- **Language-aware**: Produce separate EN/FR outputs; handle bilingual artifacts deterministically
- **Cost control**: Use immutability classes and partitioned scopes to minimize unnecessary work

### Deterministic Re-runs

The ingestion pipeline supports deterministic re-runs through:
- **CDC evidence trail**: `poll_run` records enable exact replay of detection logic
- **Artifact provenance**: Hash-based change detection prevents duplicate processing
- **Versioned state**: Track processing state per `case_version`
- **Scope isolation**: Changes in one scope don't trigger work in another

---

## UX Principles and Improvements

### Current State (Baseline)

From the Job Aid extract, the existing jurisprudence UX is functional but has areas for improvement:
- Verbose answer presentation
- Clunky navigation between results and sources
- Citation presentation lacks clarity

### MVP UX Enhancements

1. **Clear Processing State**: Display "⏳ Thinking...", "Search Agent Federal Court of Appeals", etc., during answer generation
2. **Inline Citations**: Show case citations directly in the answer text (e.g., "2024 FC 679")
3. **Direct Source Links**: Clickable links to full case documents in Azure Blob Storage or CanLII
4. **Chat History**: Retain session history for context continuity
5. **Feedback Mechanism**: Optional thumbs-up/down on answer usefulness for prompt tuning
6. **Cleaner Layout**: Chat-first design with citations below or in a sidebar

### Design Philosophy

- **Clarity over complexity**: Prioritize clear answers and citations over advanced features
- **Minimal clicks**: Direct access to source cases without multi-step navigation
- **Context retention**: Maintain session state to support follow-up questions

---

## Success Criteria (Testable)

The MVP is considered successful if it meets the following testable criteria:

### Functional Criteria

1. **Authentication**: User can sign in via Entra ID
2. **Query Submission**: User can submit a jurisprudence question and receive an answer within 30 seconds
3. **Citation Quality**: 90% of answers include at least one case citation with a valid link
4. **Source Access**: User can click on a citation and access the full case document
5. **Chat History**: User's chat session persists for the duration of the browser session
6. **Ingestion**: CanLII CDC process successfully ingests at least 100 EI-related cases
7. **Deterministic Re-run**: Re-ingestion of the same document produces identical indexed content
8. **CDC Provenance**: Every indexed case has traceable `poll_run` and `change_event` records (see [CDC Artifacts](cdc/cdc-mvp-artifacts.md#cdc-state--evidence-output-d))
9. **CDC Test Coverage**: All 26 acceptance tests pass (see [CDC Acceptance Tests](cdc/acceptance-tests.md))

### UX Criteria

10. **Processing State**: User sees visual feedback during answer generation
11. **Citation Clarity**: Citations are clearly distinguishable from answer text (e.g., bold, hyperlinked)
12. **Navigation**: User can navigate from answer to source document in one click

### Non-Functional Criteria

13. **Response Time**: 90% of queries return answers within 30 seconds
14. **Availability**: System uptime of 95% during test period
15. **Security**: All API endpoints require authentication; no unauthenticated access

---

## Project Structure

**Project 11 Root**: `C:\Users\marco.presta\OneDrive - ESDC EDSC\Documents\AICOE\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\`

**Info-JP Deployment Root**: `base-platform/` (Fresh clone from microsoft/PubSec-Info-Assistant)
- **This is what we deploy** ✅
- Cloned: January 24, 2026
- Commit: 807ee181
- Source: https://github.com/microsoft/PubSec-Info-Assistant

**EVA-JP-v1.2** (grandparent directory): ESDC-customized version - **NOT DEPLOYED** ❌
- Location: `..\..\..\..\` (4 levels up)
- Kept for reference and code comparison only
- Contains ESDC-specific: secure mode, devval01 VNet, multi-tenant RBAC, 50 indexes
- Use for cherry-picking RAG improvements after base deployment succeeds

### Why Fresh Clone Instead of EVA-JP-v1.2?

**Risk Assessment Completed**: EVA-JP-v1.2 has ESDC enterprise customizations that pose deployment risks:
- ❌ Hardcoded principal IDs in commented code
- ❌ devval01 VNet (ESDC's secure mode infrastructure)
- ❌ 50-index configuration (cost overrun risk)
- ❌ Multi-tenant RBAC requiring ESDC Entra ID groups
- ❌ Unknown RAG modifications that may break

**Clean Baseline Advantages**:
- ✅ No ESDC-specific dependencies
- ✅ Latest Microsoft bug fixes (Jan 2026)
- ✅ Simple single-tenant MVP architecture
- ✅ One jurisprudence index (cost-effective)
- ✅ Known-good deployment path

---

## Developer Quickstart

### Prerequisites Status

**Already Configured** ✅:
- Azure CLI: v2.81.0
- Python: 3.13.5
- Node.js: 24.11.0
- Terraform: 1.9.8 (installed to C:\terraform)
- Git Bash: 5.2.21
- Azure subscription authenticated

**Azure Deployment Configuration**:
- Subscription: `c59ee575-eb2a-4b51-a865-4b618f9add0a` (MarcoSub - PayAsYouGo)
- Tenant: `bfb12ca1-7f37-47d5-9cf5-8aa52214a0d8` (marcoprestayahoo.onmicrosoft.com)
- Resource Group: `rg-msinfojp-marco` (will be created)
- Location: East US (matching existing `ao-sandbox`)
- Workspace: `msinfojp-marco`

**Existing Azure Resources** (verified 2026-01-25):
- Azure OpenAI: `ao-sandbox` in `rg-sandbox` (East US)
  - Deployment: `gpt-4o`
  - Deployment: `text-embedding-3-small`
- Azure AI Services: `af-sandbox` in `rg-sandbox` (East US)

### Quickstart: GitHub Codespaces (Recommended)

**Cost**: $0/month (within GitHub Pro 180 hrs/month free tier)

1. **Launch Codespace**:
   ```bash
   # From GitHub web UI:
   # 1. Navigate to base-platform directory
   # 2. Click "Code" → "Codespaces" → "Create codespace on main"
   # 3. Wait ~2 minutes for container build
   ```

2. **Configure Azure Connection**:
   ```bash
   # Authenticate to Azure (use device code for web auth)
   az login --use-device-code
   az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
   
   # Verify connection
   az account show
   ```

3. **Configure Backend Environment** (Create `app/backend/backend.env`):
   ```bash
   # Azure OpenAI
   AZURE_OPENAI_ENDPOINT=https://ao-sandbox.openai.azure.com/
   AZURE_OPENAI_CHAT_DEPLOYMENT=gpt-4o
   AZURE_OPENAI_EMBEDDING_DEPLOYMENT=text-embedding-3-small
   
   # Azure Search
   AZURE_SEARCH_ENDPOINT=https://infojp-srch.search.windows.net
   AZURE_SEARCH_INDEX=index-jurisprudence
   
   # Azure Cosmos DB
   AZURE_COSMOSDB_ENDPOINT=https://infojp-cosmos.documents.azure.com:443/
   AZURE_COSMOSDB_DATABASE=conversations
   
   # Azure Storage
   AZURE_STORAGE_ACCOUNT=infojpst01
   
   # Network mode (public endpoints)
   OPTIMIZED_KEYWORD_SEARCH_OPTIONAL=true
   ENRICHMENT_OPTIONAL=true
   ```

4. **Start Development Servers**:
   ```bash
   # Terminal 1 - Backend (port 5000)
   cd app/backend
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   python app.py
   
   # Terminal 2 - Frontend (port 5173)
   cd app/frontend
   npm install
   npm run dev
   ```

5. **Access Application**:
   - VS Code will show port forwarding notification
   - Click "Open in Browser" for port 5173
   - Frontend accessible at forwarded URL
   - Backend API at forwarded port 5000

**See**: [DEPLOYMENT-PLAN.md](./DEPLOYMENT-PLAN.md) Part 1 for `.devcontainer/devcontainer.json` configuration

---

### Alternative: Local Development Setup

1. **Navigate to Info-JP Deployment Root**:
   ```powershell
   cd 'C:\Users\marco.presta\OneDrive - ESDC EDSC\Documents\AICOE\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\base-platform'
   ```

2. **Configure Environment** (Create `scripts/environments/.env`):
   ```bash
   # MS-InfoJP Configuration
   export LOCATION="canadacentral"
   export WORKSPACE="msinfojp-marco"
   export SUBSCRIPTION_ID="c59ee575-eb2a-4b51-a865-4b618f9add0a"
   export TENANT_ID="bfb12ca1-7f37-47d5-9cf5-8aa52214a0d8"
   
   export AZURE_ENVIRONMENT="AzureCloud"
   export SECURE_MODE=false  # No private endpoints for personal subscription
   
   # MVP feature flags
   export ENABLE_WEB_CHAT=false
   export ENABLE_UNGROUNDED_CHAT=true
   export ENABLE_MATH_ASSISTANT=false
   export ENABLE_TABULAR_DATA_ASSISTANT=false
   export ENABLE_SHAREPOINT_CONNECTOR=false
   
   export REQUIRE_WEBSITE_SECURITY_MEMBERSHIP=false
   export SECRET_EXPIRATION_DAYS=365
   
   # Azure OpenAI (will deploy infrastructure, add key after approval)
   export USE_EXISTING_AOAI=false
   export USE_AZURE_OPENAI_EMBEDDINGS=true
   export AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME="text-embedding-3-small"
   export AZURE_OPENAI_CHATGPT_DEPLOYMENT="gpt-4o"
   
   export APPLICATION_TITLE="MS-InfoJP: Jurisprudence Assistant"
   export ENABLE_DEV_CODE=true
   ```

3. **Deploy Infrastructure** (30-45 minutes):
   ```powershell
   # Ensure Terraform in PATH
   $env:Path += ";C:\terraform"
   
   # Initialize Terraform
   cd infra
   terraform init
   terraform plan -out=tfplan
   terraform apply tfplan
   
   # Save outputs
   terraform output -json > ../inf_output.json
   cd ..
   ```

4. **Extract Terraform Outputs**:
   ```bash
   # Use provided scripts to convert outputs
   bash ./scripts/json-to-env.sh < inf_output.json > ./scripts/environments/infrastructure.env
   bash ./scripts/json-to-env.webapp.debug.sh < inf_output.json
   bash ./scripts/json-to-env.function.debug.sh < inf_output.json > ./functions/local.settings.json
   ```

5. **Build Application Packages**:
   ```bash
   bash ./scripts/build.sh
   ```

6. **Deploy Applications**:
   ```bash
   bash ./scripts/deploy-webapp.sh
   bash ./scripts/deploy-enrichment-webapp.sh
   bash ./scripts/deploy-functions.sh
   bash ./scripts/deploy-search-indexes.sh
   ```

7. **Configure Backend for Local Development**:
   - Update `app/backend/backend.env` with Terraform outputs
   - Azure OpenAI endpoints will be configured automatically from existing `ao-sandbox`

8. **Verify Deployment**:
   ```powershell
   curl https://[webapp-url]/health
   ```

3. **Configure Environment**:
   - Copy `app/backend/backend.env.example` to `backend.env`
   - Set Azure service endpoints, keys, and Entra ID credentials
   - Configure CanLII API credentials (if available)

4. **Run Backend Locally**:
   ```bash
   cd app/backend
   python -m venv .venv
   .venv\Scripts\Activate.ps1  # Windows
   pip install -r requirements.txt
   python app.py
   ```

5. **Run Frontend Locally**:
   ```bash
   cd app/frontend
   npm install
   npm run dev
   ```

6. **Deploy Ingestion Pipeline**:
   ```bash
   cd functions
   func azure functionapp publish <function-app-name>
   ```

7. **Test End-to-End**:
   - Navigate to `http://localhost:5173`
   - Sign in with Entra ID
   - Submit a test query: "What are the conditions for EI eligibility?"
   - Verify answer and citations

### Key Configuration Files

**Deployment Config**:
- `base-platform/scripts/environments/.env` - Terraform variables
- `base-platform/infra/main.tf` - Infrastructure as Code

**Application Config** (after deployment):
- `base-platform/app/backend/backend.env` - Backend environment
- `base-platform/app/frontend/.env` - Frontend settings
- `base-platform/functions/local.settings.json` - Function app settings

**Generated Outputs**:
- `inf_output.json` - Terraform outputs with resource details
- `scripts/environments/infrastructure.env` - Extracted variables

---

## Post-Deployment: Cherry-Picking from EVA-JP-v1.2

After successful Info-JP base deployment, selectively adopt ESDC improvements:

### 1. RAG Approach Enhancements
**Location**: `..\..\..\..\app\backend\approaches\`

Compare approaches files:
- `chatreadretrieveread.py` - Primary RAG implementation
- Prompt template improvements for jurisprudence
- Citation formatting enhancements

### 2. Jurisprudence-Specific Prompts
**Location**: `..\..\..\..\app\backend\approaches\*`

Look for:
- Legal terminology handling
- Citation extraction patterns
- Case law formatting

### 3. Testing with ESDC Enhancements
```powershell
# Copy specific files after validation
cp ..\..\..\..\app\backend\approaches\chatreadretrieveread.py base-platform\app\backend\approaches\
# Test thoroughly before committing
```

**Rule**: Only cherry-pick after base system is working end-to-end

---

## Delivery Phases

### Phase 0: Baseline Setup (Week 1)
- Clone PubSec-Info-Assistant
- Deploy Azure infrastructure
- Verify base application runs end-to-end
- Document baseline capabilities

### Phase 1: JP Ingestion Pipeline (Weeks 2-3)
- Implement CanLII CDC metadata polling (see [CDC MVP Design](cdc/cdc-mvp-design.md) and [Artifacts Spec](cdc/cdc-mvp-artifacts.md))
  - **Week 1**: Create CDC policy pack (scope.yaml, change-policy.yaml, immutability.yaml, language-policy.yaml)
  - **Week 1**: Define Cosmos DB schema (case, artifact, poll_run, change_event tables)
  - **Week 2**: Build Case Registry and Artifact Index
  - **Week 2**: Implement Tier 1 (metadata polling) and Tier 2 (artifact verification)
  - **Week 2**: Create CDC evidence trail (`poll_run`, `change_event`)
  - **Week 3**: Connect to existing ingestion pipeline with delta-only recompute
- Build document download and parsing logic
- Configure chunking and embedding pipeline
- Validate indexing in Azure AI Search
- **Exit Criteria**: 
  - 100+ EI cases successfully indexed with full provenance
  - All 26 CDC Hard Stop Tests pass (see [Artifacts Spec](cdc/cdc-mvp-artifacts.md#hard-stop-tests-binary-no-debate))
  - Can rebuild Case Registry from snapshots without re-downloading content

### Phase 2: RAG with Citations (Weeks 4-5)
- Tune prompt templates for jurisprudence queries
- Enforce citation generation in GPT responses
- Implement citation extraction and linking
- Test answer quality and citation accuracy
- **Exit Criteria**: 90% of answers include valid citations

### Phase 3: UX Polish and Prompt Tuning (Week 6)
- Implement processing state indicators
- Enhance citation presentation (inline, clickable)
- Add user feedback mechanism
- Refine prompt templates based on test queries
- Conduct user acceptance testing
- **Exit Criteria**: Meet all UX success criteria

### Phase 4: Hardening and Handoff (Week 7)
- Document architecture and configuration
- Create developer and user guides
- Perform security review
- Hand off to stakeholders for evaluation
- **Exit Criteria**: All success criteria met; documentation complete

---

## Risks and Mitigations

### Risk 1: CanLII API Limitations
**Risk**: CanLII may not provide metadata API or may rate-limit aggressively.  
**Impact**: High – Cannot implement CDC if metadata unavailable.  
**Status**: ✅ **MITIGATED** - CanLII API key obtained; metadata-only API confirmed  
**Mitigation**:
- Confirm CanLII API capabilities early (Phase 0) ✅
- Implement tiered CDC (metadata-first, artifact-conditional) per [CDC MVP Design](cdc/cdc-mvp-design.md)
- Build Case Registry independent of CanLII availability per [CDC Artifacts](cdc/cdc-mvp-artifacts.md#case-registry-output-a)
- Respect rate limits (60 req/min default) with exponential backoff
- Fallback: Manual document uploads or batch scraping approach
- Alternative: Use existing EVA-JP corpus as Day-0 bootstrap per [CDC Artifacts](cdc/cdc-mvp-artifacts.md#bootstrap-cutover-record-day-0)

### Risk 2: Citation Accuracy
**Risk**: GPT may hallucinate case citations or fail to cite sources.  
**Impact**: Medium – Undermines trust in answers.  
**Mitigation**:
- Enforce strict citation format in prompt templates
- Post-process GPT output to validate citations against retrieved documents
- Provide grounding context with explicit instructions to cite sources

### Risk 3: Response Time Exceeds 30 Seconds
**Risk**: Complex queries may take longer than target response time.  
**Impact**: Low – Poor UX, but functional.  
**Mitigation**:
- Optimize Azure AI Search query performance (top-k, filters)
- Use streaming responses to show partial results
- Implement query complexity detection and warn users

### Risk 4: Insufficient Azure OpenAI Quota
**Risk**: Azure OpenAI quota exhausted during testing.  
**Impact**: Low – Existing `ao-sandbox` resource has quota available.  
**Status**: ✅ **MITIGATED** - Using existing `ao-sandbox` with `gpt-4o` and `text-embedding-3-small` deployments.  
**Additional Mitigation**:
- Monitor quota usage via Azure Portal
- Implement rate limiting and retry logic if approaching limits
- Scale to Pay-as-you-go billing if needed

### Risk 5: Security / Authentication Issues
**Risk**: Entra ID integration misconfigured or blocks access.  
**Impact**: High – Users cannot access system.  
**Mitigation**:
- Test Entra ID authentication in Phase 0
- Use Microsoft's provided authentication samples
- Document configuration steps clearly

### Risk 6: Data Quality Issues
**Risk**: CanLII documents contain OCR errors, missing metadata, or irrelevant content.  
**Impact**: Medium – Degraded answer quality.  
**Mitigation**:
- Implement data quality checks in ingestion pipeline
- Filter out low-quality documents (e.g., too short, missing metadata)
- Manual review of sample indexed documents

### Risk 7: Scope Creep
**Risk**: Stakeholders request multilingual, a11y, or advanced features during MVP.  
**Impact**: Medium – Delays delivery.  
**Mitigation**:
- Reinforce MVP goal and out-of-scope items in kickoff
- Document requests as future work
- Use phased delivery to defer enhancements

---

## References

- **Base Platform**: [Microsoft Public Sector Information Assistant](https://github.com/microsoft/PubSec-Info-Assistant)
- **CDC Architecture**: 
  - [CDC Index](cdc/CDC-INDEX.md) - Complete navigation guide for all CDC documentation
  - [CDC MVP Design Document](cdc/cdc-mvp-design.md) - Comprehensive CDC policies and principles
  - [CDC MVP Artifacts](cdc/cdc-mvp-artifacts.md) - Build-ready deliverables, schemas, and acceptance tests
  - [CDC Change Policy](cdc/change-policy.yaml) - Authoritative classification rules (v0.1.0)
  - [CDC Downstream Contract](cdc/downstream-invalidation-contract.md) - Minimal recompute rules
- **Source Documents** (internal):
  - `sources/features_from_accenture.md`
  - `sources/architecture_from_d11.md`
  - `sources/ux_from_job_aid.md`
  - `sources/delivery_notes.md`

---

## Contact and Support

For questions or issues related to MS-InfoJP:
- Technical Lead: [TBD]
- Architecture Review: [TBD]
- Stakeholder Contact: [TBD]

---

## License

This project builds on the Microsoft Public Sector Information Assistant, which is licensed under the [MIT License](https://github.com/microsoft/PubSec-Info-Assistant/blob/main/LICENSE).
