# GitHub Copilot Instructions - MS-InfoJP

**Project Type**: RAG-based Jurisprudence AI Assistant MVP  
**Base Platform**: Microsoft PubSec-Info-Assistant (Fresh Clone - Commit 807ee181)  
**Deployment Root**: `base-platform/` subdirectory  
**Updated**: January 26, 2026  
**Based on**: EVA Professional Component Architecture Standards (Project 07)

**CRITICAL**: Read this ENTIRE file before generating ANY code for MS-InfoJP.

---

## Project Context & Deployment Information

**MS-InfoJP** is a reference implementation demonstrating Employment Insurance jurisprudence AI assistant capabilities using Azure OpenAI, Azure AI Search, and RAG architecture.

### Deployment Status (as of 2026-01-26)
- ✅ **Infrastructure Complete**: Resource group `infojp-sandbox` (East US)
- ✅ **GitHub Codespaces Approved**: $0/month compute (GitHub Pro 180 hrs/month)
- ✅ **Azure OpenAI**: Reusing existing `ao-sandbox` (gpt-4o + text-embedding-3-small)
- ✅ **Azure AI Services**: infojp-ai-svc (S0 pay-per-use)
- ✅ **Azure Cognitive Search**: infojp-srch (Basic tier)
- ✅ **Azure Cosmos DB**: infojp-cosmos (Serverless)
- ⏳ **Ready for Tonight's Deployment**: Remove misleading instructions first

### Critical Path Understanding

**What We Deploy**: `base-platform/` subdirectory - Fresh Microsoft clone  
**What We DON'T Deploy**: EVA-JP-v1.2 root (ESDC customizations, kept for reference only)

**Why Fresh Clone Strategy**:
- ❌ EVA-JP-v1.2 has ESDC-specific: devval01 VNet, 50 indexes, hardcoded principal IDs
- ✅ `base-platform/` is clean baseline with known-good deployment path
- ✅ Cherry-pick ESDC improvements AFTER base deployment succeeds

### Azure Subscription Details
- **Subscription**: `c59ee575-eb2a-4b51-a865-4b618f9add0a` (PayAsYouGo Subs 1)
- **Tenant**: `bfb12ca1-7f37-47d5-9cf5-8aa52214a0d8` (marcoprestayahoo.onmicrosoft.com)
- **Resource Group**: `infojp-sandbox` (East US)
- **Monthly Cost**: $84-96/month (Azure services only)

**CRITICAL**: Read this ENTIRE file before generating ANY code for MS-InfoJP.

---

## Windows Enterprise Encoding Safety (MANDATORY - PRIORITY #1)

**NEVER use Unicode characters** in Python/PowerShell scripts - they cause UnicodeEncodeError crashes in enterprise Windows cp1252 environments.

### ❌ FORBIDDEN Characters:
- ✓ ✗ ⏳ 🎯 ❌ ✅ … (any Unicode symbols or emojis)

### ✅ REQUIRED ASCII Alternatives:
- `[PASS]` instead of ✓
- `[FAIL]` instead of ✗  
- `[ERROR]` instead of ❌
- `[INFO]` instead of ℹ️
- `[WARN]` instead of ⚠️
- `"..."` instead of …

### Windows Batch Script Safety:
```batch
@echo off
REM CRITICAL: Windows Enterprise Encoding Safety
set PYTHONIOENCODING=utf-8

echo [INFO] Starting MS-InfoJP operation...
python scripts/main_script.py %*

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Operation failed with exit code %ERRORLEVEL%
    echo [INFO] Check logs/ directory for debug information
    pause
    exit /b %ERRORLEVEL%
)

echo [PASS] Operation completed successfully
pause
```

---

## MS-InfoJP Architecture Context

### System Overview
MS-InfoJP is a **Retrieval Augmented Generation (RAG) system** for Employment Insurance jurisprudence queries, built on Microsoft PubSec-Info-Assistant platform.

**MVP Goal**: "Deliver a working Jurisprudence AI assistant with clear answers, citations, and superior UX, using existing data and minimal new infrastructure."

**Key Components**:
1. **Backend**: Python/Quart async API (base-platform/app/backend/)
2. **Frontend**: React/TypeScript/Vite SPA (base-platform/app/frontend/)
3. **Document Pipeline**: Azure Functions for OCR, chunking, embedding (base-platform/functions/)
4. **Enrichment Service**: Flask API for embedding generation (base-platform/app/enrichment/)
5. **CanLII CDC**: Custom ingestion pipeline for case law documents (this project)

### MVP Success Criteria (Testable)

**Functional**:
1. Authentication via Entra ID
2. Query response within 30 seconds
3. 90% of answers include at least one valid case citation with link
4. Clickable citations access full case documents
5. Chat session persistence
6. 100+ EI cases successfully ingested
7. Deterministic re-runs of ingestion pipeline
8. Traceable CDC provenance (poll_run + change_event records)
9. All 26 CDC acceptance tests pass

**UX**:
10. Visual feedback during answer generation
11. Citations clearly distinguishable (bold, hyperlinked)
12. One-click navigation from answer to source

**Non-Functional**:
13. 90% of queries < 30 seconds
14. 95% uptime during test period
15. All endpoints require authentication

### CanLII CDC Architecture (Change Data Capture)

**Core Documentation** (see [cdc/CDC-INDEX.md](../cdc/CDC-INDEX.md) for navigation):
- [CDC MVP Design](../cdc/cdc-mvp-design.md) - Comprehensive CDC architecture
- [CDC MVP Artifacts](../cdc/cdc-mvp-artifacts.md) - Build-ready deliverables
- [CDC Change Policy](../cdc/change-policy.yaml) - Classification rules (v0.1.0)
- [CDC Acceptance Tests](../cdc/acceptance-tests.md) - 26 Given/When/Then specs
- [CDC Database Schema](../cdc/minimal-schema-ddl.md) - 11-table Cosmos DB schema

**Tiered CDC Approach** (Evidence-First, Minimal Recompute):

**Tier 1 - Registry Polling** (Metadata-based):
1. Poll CanLII metadata API for EI cases within scope_id (e.g., `SST-GD-EN-rolling-24mo`)
2. Detect changes via content-addressable hashing
3. Maintain Case Registry with stable internal case_id

**Tier 2 - Artifact Verification** (Content-based):
4. Conditionally download when: new case, metadata hash change, or missing artifact
5. Execute ingestion pipeline: parse → enrich → chunk → embed → index

**CDC Principles**:
- **Evidence-first**: Every poll produces poll_run + change_event for audit/replay
- **Minimal recompute**: Only reprocess changed cases/chunks
- **Versioned corpus**: Track case_version for every meaningful change
- **Language-aware**: Separate EN/FR outputs; deterministic bilingual handling
- **Cost control**: Immutability classes prevent unnecessary work

### Critical Architecture Patterns

#### 1. RAG Execution Flow
```python
# All RAG approaches follow this 5-step pattern:
async def run_rag_query(self, user_query: str):
    # 1. Query Optimization (with fallback)
    optimized_query = await self.optimize_query(user_query)
    
    # 2. Embedding Generation (with fallback)
    query_embedding = await self.enrichment.generate_embeddings([optimized_query])
    
    # 3. Hybrid Search (vector + keyword)
    results = await self.search_client.search(
        search_text=optimized_query,
        vector_queries=[VectorizedQuery(
            vector=query_embedding,
            k_nearest_neighbors=top_k,
            fields="embedding"
        )]
    )
    
    # 4. Context Assembly
    context = self.format_context_for_gpt(results)
    
    # 5. GPT Completion with Citation Enforcement
    async for chunk in self.generate_completion_streaming(context, query):
        yield chunk
```

#### 2. Fallback Pattern for Secure Mode
```python
# When private endpoints unreachable, degrade gracefully
optional_service = os.getenv("SERVICE_OPTIONAL", "false").lower() == "true"
try:
    result = await call_azure_service()
except Exception as e:
    if optional_service:
        print("[WARN] Service unavailable; degrading to fallback mode")
        result = fallback_implementation()
    else:
        raise
```

#### 3. Citation Enforcement Pattern
```python
# ALWAYS enforce citations in GPT responses
system_prompt = """
You are a jurisprudence assistant. CRITICAL: You MUST cite sources for all claims.

Citation Format:
- Case name and citation number (e.g., "2024 FC 679")
- Include clickable link to source document
- Place citations inline or at end of answer

NEVER make claims without citing a source from the retrieved documents.
"""
```

---

## Professional Component Architecture (MANDATORY)

### MS-InfoJP Component Structure

```python
from pathlib import Path
from datetime import datetime
import json
import asyncio
from typing import Any, Dict, List

class MSInfoJPComponent:
    """Base class for all MS-InfoJP components"""
    
    def __init__(self, component_name: str):
        self.component_name = component_name
        self.project_root = self._find_project_root()
        self.debug_collector = DebugArtifactCollector(component_name, self.project_root)
        self.session_manager = SessionManager(component_name, self.project_root)
        self.error_handler = StructuredErrorHandler(component_name, self.project_root)
        
    def _find_project_root(self) -> Path:
        """Auto-detect MS-InfoJP project root from any subdirectory"""
        current = Path.cwd()
        while current != current.parent:
            if (current / "11-MS-InfoJP").exists() or current.name == "11-MS-InfoJP":
                return current if current.name == "11-MS-InfoJP" else current / "11-MS-InfoJP"
            current = current.parent
        raise RuntimeError("[ERROR] MS-InfoJP project root not found")
        
    async def execute_with_observability(self, operation_name: str, operation):
        """Execute operation with full evidence collection"""
        print(f"[INFO] Executing {operation_name}...")
        
        # 1. ALWAYS capture pre-state
        await self.debug_collector.capture_state(f"{operation_name}_before")
        await self.session_manager.save_checkpoint("before_operation", {
            "operation": operation_name,
            "timestamp": datetime.now().isoformat()
        })
        
        try:
            # 2. Execute operation
            result = await operation()
            
            # 3. ALWAYS capture success state
            await self.debug_collector.capture_state(f"{operation_name}_success")
            await self.session_manager.save_checkpoint("operation_success", {
                "operation": operation_name,
                "result_preview": str(result)[:200] if result else "None",
                "timestamp": datetime.now().isoformat()
            })
            
            print(f"[PASS] {operation_name} completed successfully")
            return result
            
        except Exception as e:
            # 4. ALWAYS capture error state
            await self.debug_collector.capture_state(f"{operation_name}_error")
            await self.error_handler.log_structured_error(operation_name, e)
            await self.session_manager.save_checkpoint("operation_error", {
                "operation": operation_name,
                "error": str(e),
                "error_type": type(e).__name__,
                "timestamp": datetime.now().isoformat()
            })
            print(f"[ERROR] {operation_name} failed: {e}")
            raise
```

### CanLII CDC Component Pattern

```python
class CanLIICDCComponent(MSInfoJPComponent):
    """Professional CDC implementation for CanLII case law ingestion"""
    
    def __init__(self):
        super().__init__("canlii_cdc")
        self.metadata_cache = self.project_root / "input" / "metadata" / "canlii_metadata_cache.json"
        self.last_sync_file = self.project_root / "input" / "metadata" / "last_sync.json"
        
    async def poll_metadata(self, topics: List[str] = ["employment_insurance"]):
        """Poll CanLII for metadata changes with evidence preservation"""
        return await self.execute_with_observability(
            "poll_canlii_metadata",
            lambda: self._fetch_metadata(topics)
        )
    
    async def detect_changes(self, new_metadata: List[Dict], cached_metadata: List[Dict]):
        """Detect new/updated cases with state capture"""
        return await self.execute_with_observability(
            "detect_metadata_changes",
            lambda: self._compare_metadata(new_metadata, cached_metadata)
        )
    
    async def download_documents(self, case_ids: List[str]):
        """Download case documents with retry and evidence collection"""
        return await self.execute_with_retry(
            "download_case_documents",
            lambda: self._download_batch(case_ids),
            max_attempts=3
        )
```

### Azure Resource Validation Pattern

```python
class AzureResourceValidator(MSInfoJPComponent):
    """Pre-flight validation of Azure resources"""
    
    def __init__(self):
        super().__init__("azure_validator")
        
    async def validate_all_resources(self) -> Dict[str, bool]:
        """Validate all required Azure resources before execution"""
        validations = {
            "azure_openai": await self.validate_openai(),
            "azure_search": await self.validate_search(),
            "azure_cosmosdb": await self.validate_cosmosdb(),
            "azure_blob": await self.validate_blob_storage(),
            "enrichment_service": await self.validate_enrichment()
        }
        
        all_valid = all(validations.values())
        
        if not all_valid:
            failed = [k for k, v in validations.items() if not v]
            print(f"[ERROR] Resource validation failed: {', '.join(failed)}")
            print("[INFO] Check configuration in base-platform/app/backend/backend.env")
        else:
            print("[PASS] All Azure resources validated successfully")
            
        return validations
    
    async def validate_openai(self) -> bool:
        """Validate Azure OpenAI endpoint and deployment"""
        try:
            endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
            if not endpoint:
                print("[ERROR] AZURE_OPENAI_ENDPOINT not configured")
                return False
            
            # Test connectivity (implement actual test)
            print("[PASS] Azure OpenAI endpoint reachable")
            return True
        except Exception as e:
            print(f"[ERROR] Azure OpenAI validation failed: {e}")
            return False
```

---

## RAG-Specific Patterns (MANDATORY)

### 1. Hybrid Search Implementation
```python
async def execute_hybrid_search(self, query: str, embedding: List[float], top_k: int = 3):
    """Execute hybrid vector + keyword search"""
    
    search_results = await search_client.search(
        search_text=query,  # Keyword search
        vector_queries=[
            VectorizedQuery(
                vector=embedding,  # Vector search
                k_nearest_neighbors=top_k,
                fields="embedding"
            )
        ],
        select=["content", "title", "case_id", "court", "date", "url"],
        top=top_k
    )
    
    # ALWAYS preserve search evidence
    await self.debug_collector.capture_search_results(search_results)
    
    return [result async for result in search_results]
```

### 2. Citation Extraction and Validation
```python
def extract_citations(self, gpt_response: str, retrieved_docs: List[Dict]) -> List[Dict]:
    """Extract and validate citations from GPT response"""
    
    # Pattern: "2024 FC 679", "2021 SST 188"
    citation_pattern = r'\d{4}\s+[A-Z]{2,5}\s+\d+'
    found_citations = re.findall(citation_pattern, gpt_response)
    
    valid_citations = []
    for citation in found_citations:
        # Validate against retrieved documents
        matching_doc = self._find_matching_document(citation, retrieved_docs)
        if matching_doc:
            valid_citations.append({
                "citation": citation,
                "document_id": matching_doc["case_id"],
                "url": matching_doc.get("url"),
                "court": matching_doc.get("court")
            })
        else:
            print(f"[WARN] Citation not found in retrieved docs: {citation}")
    
    # Enforce minimum citation rate
    citation_rate = len(valid_citations) / max(len(found_citations), 1)
    if citation_rate < 0.9:
        print(f"[WARN] Low citation validation rate: {citation_rate:.1%}")
    
    return valid_citations
```

### 3. Document Chunking Strategy
```python
def chunk_case_document(self, case_text: str, metadata: Dict) -> List[Dict]:
    """Chunk case document with overlap for optimal retrieval"""
    
    CHUNK_SIZE = 1000  # tokens
    CHUNK_OVERLAP = 200  # tokens
    
    chunks = []
    
    # Use semantic chunking for legal documents
    sections = self._identify_legal_sections(case_text)  # e.g., Facts, Analysis, Decision
    
    for section_name, section_text in sections:
        section_chunks = self._create_overlapping_chunks(
            section_text, 
            chunk_size=CHUNK_SIZE,
            overlap=CHUNK_OVERLAP
        )
        
        for i, chunk_text in enumerate(section_chunks):
            chunks.append({
                "content": chunk_text,
                "metadata": {
                    **metadata,
                    "section": section_name,
                    "chunk_index": i,
                    "total_chunks": len(section_chunks)
                }
            })
    
    print(f"[INFO] Created {len(chunks)} chunks from case document")
    return chunks
```

---

## Anti-Patterns to NEVER Generate

### ❌ FORBIDDEN Pattern #1: Silent Exception Swallowing
```python
# NEVER DO THIS
try:
    result = process_document()
except:
    pass  # Silent failure - no evidence, no logging
```

### ❌ FORBIDDEN Pattern #2: Uncited GPT Claims
```python
# NEVER DO THIS
system_prompt = "Answer the user's question about jurisprudence."
# Missing citation enforcement!
```

### ❌ FORBIDDEN Pattern #3: Unicode in Scripts
```python
# NEVER DO THIS
print("✓ Document indexed successfully")  # Will crash in cp1252
```

### ❌ FORBIDDEN Pattern #4: Retry Without State Capture
```python
# NEVER DO THIS
for i in range(3):
    try:
        return operation()
    except:
        continue  # No evidence between attempts
```

---

## Quality Gates (MANDATORY)

### Before Code Generation Checklist:
- [ ] Windows encoding safety confirmed (ASCII only)
- [ ] Debug artifact collection implemented
- [ ] Session state management included
- [ ] Structured error handling with evidence preservation
- [ ] Citations enforced in GPT prompts
- [ ] Hybrid search properly configured
- [ ] Retry logic with state capture between attempts

### MS-InfoJP Success Criteria Alignment:
Every component must support these testable criteria:
1. Authentication via Entra ID
2. Query response within 30 seconds
3. 90% of answers include valid citations
4. Clickable links to source documents
5. Session persistence
6. 100+ EI cases ingested
7. Deterministic re-runs of ingestion

---

## Azure Service Configuration

### Required Environment Variables:
```bash
# Azure OpenAI
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
AZURE_OPENAI_CHAT_DEPLOYMENT=gpt-4o
AZURE_OPENAI_EMBEDDING_DEPLOYMENT=text-embedding-ada-002
AZURE_OPENAI_API_VERSION=2024-02-15-preview

# Azure Cognitive Search
AZURE_SEARCH_ENDPOINT=https://your-search.search.windows.net
AZURE_SEARCH_INDEX=index-jurisprudence

# Azure Cosmos DB
AZURE_COSMOSDB_ENDPOINT=https://your-cosmosdb.documents.azure.com:443/
AZURE_COSMOSDB_DATABASE=conversations

# Fallback Flags (for local dev without VPN)
OPTIMIZED_KEYWORD_SEARCH_OPTIONAL=true
ENRICHMENT_OPTIONAL=true
```

---

## Delivery Phases & Timeline

### Phase 0: Baseline Setup (Week 1)
- Clone PubSec-Info-Assistant ✅
- Deploy Azure infrastructure ✅
- Verify base application end-to-end
- Document baseline capabilities

### Phase 1: JP Ingestion Pipeline (Weeks 2-3)
- **Week 1**: Create CDC policy pack (scope.yaml, change-policy.yaml, immutability.yaml, language-policy.yaml)
- **Week 1**: Define Cosmos DB schema (case, artifact, poll_run, change_event tables)
- **Week 2**: Build Case Registry and Artifact Index
- **Week 2**: Implement Tier 1 (metadata polling) and Tier 2 (artifact verification)
- **Week 2**: Create CDC evidence trail
- **Week 3**: Connect to existing pipeline with delta-only recompute
- **Exit Criteria**: 100+ EI cases indexed with full provenance, all 26 CDC tests pass

### Phase 2: RAG with Citations (Weeks 4-5)
- Tune prompt templates for jurisprudence
- Enforce citation generation in GPT
- Implement citation extraction/linking
- Test answer quality and accuracy
- **Exit Criteria**: 90% of answers include valid citations

### Phase 3: UX Polish (Week 6)
- Processing state indicators
- Enhanced citation presentation
- User feedback mechanism
- Prompt tuning based on tests
- **Exit Criteria**: All UX success criteria met

### Phase 4: APIM Integration (Post-MVP, First Priority)
- Deploy Azure API Management as gateway for InfoJP
- End-to-end cost attribution via standard headers (X-Run-Id, X-Variant, X-Correlation-Id)
- Header propagation: frontend → APIM → backend → downstream services
- OpenAPI specification for InfoJP API surface
- APIM policies: governance, rate limiting, correlation tracking
- **See**: [APIM Feature README](../apim/README.md) for complete implementation guide
- **Exit Criteria**: All InfoJP calls route through APIM with full observability

### Phase 5: Hardening (Week 7)
- Architecture documentation
- Developer/user guides
- Security review
- Stakeholder handoff
- **Exit Criteria**: All criteria met; docs complete

---

## Risk Mitigations (Key Items)

### ✅ MITIGATED: CanLII API Limitations
- **Status**: CanLII API key obtained; metadata-only API confirmed
- **Mitigation**: Tiered CDC (metadata-first, artifact-conditional) per CDC MVP Design
- **Fallback**: Use existing EVA-JP corpus as Day-0 bootstrap

### ✅ MITIGATED: Azure OpenAI Quota
- **Status**: Using existing `ao-sandbox` with gpt-4o and text-embedding-3-small
- **Mitigation**: Monitor quota via Azure Portal; implement rate limiting

### ⚠️ ACTIVE: Citation Accuracy
- **Risk**: GPT may hallucinate citations
- **Mitigation**: Strict citation format in prompts + post-process validation

### ⚠️ ACTIVE: Response Time > 30 Seconds
- **Risk**: Complex queries may exceed target
- **Mitigation**: Optimize search (top-k, filters), streaming responses, complexity detection

---

## Developer Quickstart Paths

### Path 1: GitHub Codespaces (Recommended - $0/month)

```bash
# 1. Launch Codespace from base-platform/ in GitHub UI
# 2. Authenticate to Azure
az login --use-device-code
az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a

# 3. Configure backend.env (see README for full template)
# 4. Start servers
cd app/backend && python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt && python app.py  # Terminal 1

cd app/frontend && npm install && npm run dev     # Terminal 2

# 5. Access via forwarded ports (VS Code shows notification)
```

### Path 2: Local Development (Windows)

```powershell
# 1. Navigate to deployment root
cd 'I:\EVA-JP-v1.2\docs\eva-foundry\projects\11-MS-InfoJP\base-platform'

# 2. Configure app/backend/backend.env with Azure resource endpoints
# (See README for full template with Azure OpenAI, Search, Cosmos DB, Storage)

# 3. Start backend
cd app\backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py  # Terminal 1

# 4. Start frontend
cd app\frontend
npm install
npm run dev  # Terminal 2

# 5. Access at http://localhost:5173
```

### Post-Deployment: Cherry-Picking from EVA-JP-v1.2

**ONLY after base system works end-to-end**, selectively adopt:
1. RAG approach enhancements from `../../../../app/backend/approaches/`
2. Jurisprudence-specific prompts
3. Citation formatting improvements

**Rule**: Test thoroughly after each cherry-pick; never batch-copy.

---

## References

- **Base Platform**: base-platform/ (Microsoft PubSec-Info-Assistant, commit 807ee181)
- **CDC Architecture**: [CDC Index](../cdc/CDC-INDEX.md) for complete navigation
- **APIM Integration**: [APIM README](../apim/README.md) - Phase 4 implementation guide
  - Header contract (X-Run-Id, X-Variant, X-Correlation-Id, X-Project-Id)
  - Cost attribution strategy
  - Governance policies and cutover plan
- **EVA Copilot Standards**: ../../07-copilot-instructions/
- **Project Documentation**: [README.md](../README.md), [DEPLOYMENT-PLAN.md](../DEPLOYMENT-PLAN.md)
- **Related Projects**: 
  - [Project 02](../../02-poc-agent-skills/) - Agent Skills Framework
  - [Project 04](../../04-OS-vNext/) - Predefined AI Workflows
  - [Project 07](../../07-copilot-instructions/) - Copilot Standards Baseline
