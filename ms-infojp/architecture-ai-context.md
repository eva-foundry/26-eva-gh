# MS-InfoJP Architecture Context for AI Assistants

**Last Updated**: 2026-01-26  
**Purpose**: AI-optimized architecture reference for MS-InfoJP (Project 11)  
**For**: GitHub Copilot and other AI coding assistants  
**See Also**: [Project README](./README.md) for full project documentation

---

## CRITICAL: Project Identity

**Active Project**: MS-InfoJP - Jurisprudence AI Assistant MVP  
**Base Platform**: Fresh Microsoft PubSec-Info-Assistant clone (commit 807ee181, Jan 2026)  
**Deployment Location**: `I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\base-platform\`  

**⚠️ IMPORTANT DISTINCTION**:
- InfoJP uses `base-platform/` (clean Microsoft clone) for deployment
- **NOT** deploying from parent `EVA-JP-v1.2/` (ESDC-customized, devval01 VNet, 50 indexes, multi-tenant)
- Parent EVA-JP-v1.2 used **ONLY** for cherry-picking RAG improvements after base deployment succeeds

**Why Fresh Clone**:
- ✅ No ESDC-specific dependencies (devval01 VNet, hardcoded principals)
- ✅ Latest Microsoft bug fixes (Jan 2026)
- ✅ Simple single-tenant MVP architecture
- ✅ One jurisprudence index (cost-effective)
- ✅ Known-good deployment path

---

## Azure Infrastructure (Deployed January 26, 2026)

### Subscription Details
- **Subscription**: `c59ee575-eb2a-4b51-a865-4b618f9add0a` (PayAsYouGo Subs 1)
- **Tenant**: `bfb12ca1-7f37-47d5-9cf5-8aa52214a0d8` (marcoprestayahoo.onmicrosoft.com)
- **Resource Group**: `infojp-sandbox` (East US)
- **Deployment Method**: Raw Azure CLI (copy-paste commands)
- **Monthly Cost**: $84-96/month (Azure services only)

### Deployed Azure Resources

| Resource | Name | Type | SKU | Status | Purpose |
|----------|------|------|-----|--------|---------|
| **Azure OpenAI** | `ao-sandbox` | Cognitive Services | S0 | ✅ Existing (reused) | GPT-4o + text-embedding-3-small |
| **Azure AI Services** | `infojp-ai-svc` | Cognitive Services | S0 | ✅ Deployed | Query optimization, content safety |
| **Azure Search** | `infojp-srch` | Search Service | Basic | ✅ Deployed | Hybrid vector + keyword search |
| **Azure Cosmos DB** | `infojp-cosmos` | Database Account | Serverless | ✅ Deployed | Session logs + CDC state |
| **Azure Storage** | `infojpst01` | Storage V2 | Standard_LRS | ✅ Deployed | Document storage |
| **Azure Storage** | `infojpstfunc01` | Storage V2 | Standard_LRS | ✅ Deployed | Function app storage |
| **Azure Key Vault** | `infojp-kv` | Key Vault | Standard | ✅ Deployed | Secrets management |
| **Azure Document Intelligence** | `infojp-doc-intel` | Form Recognizer | S0 | ✅ Deployed | PDF OCR |

**Connectivity Status** (verified 2026-01-26 11:44 UTC):
- `ao-sandbox`: ✅ HTTP 200, TCP Connected
- `infojp-doc-intel`: ✅ HTTP 200, TCP Connected
- `infojp-ai-svc`: ✅ HTTP 200, TCP Connected
- `af-sandbox`: ✅ HTTP 200, TCP Connected (legacy AI Services)

### Development Environment

**Approved Solution**: GitHub Codespaces  
**Cost**: $0/month (GitHub Pro 180 hrs/month free tier)  
**Reason**: No Azure VM quota required, instant setup, portable

**Alternative**: Local Windows development (`I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\base-platform\`)

---

## System Architecture

### High-Level Architecture

**Type**: Retrieval Augmented Generation (RAG) system for jurisprudence Q&A  
**Stack**: Python/Quart backend + React/TypeScript/Vite frontend + Azure OpenAI + Azure Functions

**Fallback Pattern** (for local dev without private endpoints):
```python
optional_service = os.getenv("SERVICE_OPTIONAL", "false").lower() == "true"
try:
    result = await call_external_service()
except Exception as e:
    if optional_service:
        log.warning(f"Service failed but OPTIONAL; degrading gracefully: {e}")
        result = fallback_value
    else:
        raise
```

**Citation Enforcement System Prompt**:
```
You are an AI assistant for Employment Insurance jurisprudence. ALWAYS cite case law.
Format: "Decision: [Summary]. [Year Court CaseNumber](link). Key principle: [...]"
Required elements: case name, citation (YYYY COURT ###), link to CanLII.
```

---

## Key File Paths

### Base Platform (External Dependency)
- `base-platform/app/backend/app.py` - Main backend entry point (Quart app)
- `base-platform/app/backend/approaches/chatreadretrieveread.py` - Primary RAG approach
- `base-platform/app/backend/core/shared_constants.py` - Azure client initialization
- `base-platform/app/frontend/src/pages/Chat.tsx` - Main chat interface
- `base-platform/functions/` - Document processing pipeline

### MS-InfoJP Custom Components
- `scripts/components/canlii_cdc_component.py` - CanLII Change Data Capture
- `scripts/components/citation_enforcer_component.py` - Citation validation
- `scripts/components/azure_validator_component.py` - Azure resource verification
- `scripts/run_ms_infojp.py` - Professional runner with pre-flight validation

### Configuration & Evidence
- `base-platform/app/backend/backend.env` - Backend environment config
- `scripts/environments/.env` - Terraform variables (if deployed)
- `evidence/` - Structured evidence collection at system boundaries
- `debug/` - Debug artifacts (screenshots, HTML, traces)
- `logs/` - Execution logs with timestamps

### Tests & Data
- `tests/acceptance/` - Automated acceptance tests (AC-001 to AC-013)
- `tests/test_data/ei_queries.json` - Sample EI jurisprudence queries
- `tests/test_data/expected_citations.json` - Citation validation patterns
- `input/metadata/` - CanLII CDC tracking metadata

---

## Critical Code Patterns

### 1. MSInfoJPComponent Base Class

**All custom components MUST extend this base**:

```python
from datetime import datetime
from pathlib import Path
import json

class MSInfoJPComponent:
    """Base class for MS-InfoJP components following Project 07 standards"""
    
    def __init__(self, name: str):
        self.name = name
        self.project_root = self._find_project_root()
        self.evidence_dir = self.project_root / "evidence"
        self.debug_dir = self.project_root / "debug"
        self.logs_dir = self.project_root / "logs"
        
    def _find_project_root(self) -> Path:
        """Auto-detect project root from any subdirectory"""
        current = Path(__file__).resolve()
        for parent in [current] + list(current.parents):
            if (parent / "README.md").exists() and (parent / "ACCEPTANCE.md").exists():
                return parent
        raise RuntimeError("Cannot find MS-InfoJP project root")
    
    def _save_evidence(self, operation: str, data: dict):
        """Save evidence with timestamp at system boundary"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{self.name}_{operation}_{timestamp}.json"
        filepath = self.evidence_dir / filename
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        return filepath
    
    def _log(self, level: str, message: str):
        """Enterprise-safe logging - ASCII only, no Unicode"""
        # Use ASCII markers: [INFO], [WARN], [ERROR], [PASS], [FAIL]
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_line = f"[{timestamp}] [{level}] {self.name}: {message}"
        print(log_line)  # PYTHONIOENCODING=utf-8 set by runner
```

### 2. Azure Service Client Initialization

**NEVER create Azure clients directly**:

```python
# From base-platform/app/backend/core/shared_constants.py
from core.shared_constants import AZURE_CREDENTIAL, app_clients

# Use shared clients
search_client = app_clients["azure_search"]
cosmosdb_client = app_clients["azure_cosmosdb"]
blob_client = app_clients["azure_blob"]
openai_client = app_clients["azure_openai"]
```

### 3. Streaming Responses

**Pattern for SSE streaming to frontend**:

```python
from quart import Response

@app.route("/chat", methods=["POST"])
async def chat():
    async def generate():
        async for chunk in approach.run(...):
            yield f"data: {json.dumps(chunk)}\n\n"
    return Response(generate(), mimetype="text/event-stream")
```

### 4. Citation Extraction & Validation

**Pattern for citation quality checks (AC-003)**:

```python
import re

def extract_citations(text: str) -> list[str]:
    """Extract Canadian case citations (YYYY COURT ###)"""
    pattern = r'\b(\d{4})\s+([A-Z]{2,5})\s+(\d+)\b'
    matches = re.findall(pattern, text)
    return [f"{year} {court} {number}" for year, court, number in matches]

def validate_citation_quality(response: str, min_citations: int = 1) -> dict:
    """Validate citation presence and format"""
    citations = extract_citations(response)
    
    # Valid courts for EI jurisprudence
    valid_courts = {"FC", "FCA", "SST", "SCC", "ONCA", "BCCA"}
    valid_citations = [c for c in citations if any(court in c for court in valid_courts)]
    
    return {
        "passed": len(valid_citations) >= min_citations,
        "citations_found": len(valid_citations),
        "citations": valid_citations,
        "quality_score": len(valid_citations) / max(len(citations), 1) if citations else 0
    }
```

### 5. Chunking Strategy

**Microsoft platform default: 1000 tokens, 200 overlap**:

```python
# From base-platform/functions/TextEnrichment/__init__.py
CHUNK_SIZE = 1000  # tokens
CHUNK_OVERLAP = 200  # tokens

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> list[str]:
    """Sliding window chunking with overlap for context preservation"""
    # Implementation in base platform uses tiktoken for accurate token counting
    pass
```

---

## Azure Service Dependencies

### Required Services (Azure Subscription: c59ee575-eb2a-4b51-a865-4b618f9add0a)

| Service | Purpose | Config Variable |
|---------|---------|----------------|
| **Azure OpenAI** | GPT-4 completions, text-embedding-ada-002 | `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_CHAT_DEPLOYMENT` |
| **Azure AI Services** | Query optimization, content safety | `AZURE_AI_SERVICES_ENDPOINT` |
| **Azure Cognitive Search** | Hybrid vector + keyword search | `AZURE_SEARCH_ENDPOINT`, index: `index-jurisprudence` |
| **Azure Cosmos DB** | Session and log storage | `AZURE_COSMOSDB_ENDPOINT`, database: `conversations` |
| **Azure Blob Storage** | Document storage | `AZURE_STORAGE_ACCOUNT`, container: `documents` |
| **Azure Functions** | Document processing pipeline | (Deployed separately) |
| **Azure Document Intelligence** | PDF OCR | `AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT` |

### Network Architecture

**Production (Secure Mode)**:
- All services in `hccld2` VNet
- Private endpoint access only
- Requires VPN or Microsoft DevBox

**Local Dev Workaround**:
```bash
# In base-platform/app/backend/backend.env
OPTIMIZED_KEYWORD_SEARCH_OPTIONAL=true
ENRICHMENT_OPTIONAL=true
```

---

## API Endpoints Reference

### Backend Routes (base-platform/app/backend/app.py)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/ask` | POST | Single-turn Q&A (legacy) |
| `/chat` | POST | Multi-turn chat with streaming |
| `/upload` | POST | Upload document for processing |
| `/documents` | GET | List user's documents |
| `/documents/<id>` | DELETE | Delete document |
| `/sessions` | GET | List chat sessions |
| `/sessions/<id>` | GET/DELETE | Get/delete specific session |
| `/translate` | POST | Translate text |
| `/health` | GET | Health check |

---

## Environment Configuration

### Backend Environment Variables (backend.env)

**Azure OpenAI**:
```bash
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
AZURE_OPENAI_CHAT_DEPLOYMENT=gpt-4o
AZURE_OPENAI_EMBEDDING_DEPLOYMENT=text-embedding-ada-002
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

**Azure Cognitive Search**:
```bash
AZURE_SEARCH_ENDPOINT=https://your-search.search.windows.net
AZURE_SEARCH_INDEX=index-jurisprudence
```

**Azure Cosmos DB**:
```bash
AZURE_COSMOSDB_ENDPOINT=https://your-cosmos.documents.azure.com:443/
AZURE_COSMOSDB_DATABASE=conversations
```

**Fallback Configuration**:
```bash
OPTIMIZED_KEYWORD_SEARCH_OPTIONAL=true  # For local dev
ENRICHMENT_OPTIONAL=true  # For local dev
```

**CORS**:
```bash
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5000
```

---

## Common Tasks

### Adding a New API Endpoint

1. **Add route in `base-platform/app/backend/app.py`**:
```python
@app.route("/jurisprudence/stats", methods=["GET"])
async def get_jurisprudence_stats():
    data = await query_cosmos_for_stats()
    return jsonify({"stats": data})
```

2. **Create custom component** (if needed):
```python
# scripts/components/stats_component.py
from scripts.run_ms_infojp import MSInfoJPComponent

class JurisprudenceStatsComponent(MSInfoJPComponent):
    def __init__(self):
        super().__init__("jurisprudence_stats")
    
    async def get_stats(self):
        # Implementation
        evidence = {"operation": "get_stats", "result": stats}
        self._save_evidence("get_stats", evidence)
        return stats
```

3. **Update frontend API client**:
```typescript
// base-platform/app/frontend/src/api/api.ts
export async function getJurisprudenceStats(): Promise<Stats> {
    const response = await fetch(`${API_BASE}/jurisprudence/stats`);
    return await response.json();
}
```

### Modifying Document Processing

1. **Locate function** in `base-platform/functions/` (e.g., `TextEnrichment/__init__.py`)
2. **Update function logic**
3. **Deploy**: `make build-deploy-functions` (from base-platform/)
4. **Test**: `make functional-tests` (from base-platform/)

### Running Professional Runner

**From any subdirectory**:
```bash
# Windows (use batch wrapper for encoding safety)
run_ms_infojp.bat validate
run_ms_infojp.bat run --mode local

# Direct Python (requires PYTHONIOENCODING=utf-8)
set PYTHONIOENCODING=utf-8
python scripts/run_ms_infojp.py validate
```

---

## Troubleshooting

### 403 Errors on Private Endpoints

**Symptom**: Backend can't reach Azure AI Services or Enrichment  
**Cause**: Not connected to `hccld2` VNet  
**Fix**: Set fallback flags in `backend.env`:
```bash
OPTIMIZED_KEYWORD_SEARCH_OPTIONAL=true
ENRICHMENT_OPTIONAL=true
```

### Search Returns No Results

**Debug steps**:
1. **Check Azure Search index**: Azure Portal → Cognitive Search → `index-jurisprudence`
2. **Verify embeddings generated**: Check `text-enrichment-queue` in Storage Explorer
3. **Review approach logs**: Look for query transformation issues
4. **Test search directly**: Use Azure Portal search explorer

### Citation Quality Issues

**Debug steps**:
1. **Check system prompt**: Verify citation enforcement in approach
2. **Run AC-003 test**: `pytest tests/acceptance/test_citation_quality.py`
3. **Review GPT responses**: Check debug/traces/ for completion prompts
4. **Validate extraction regex**: Test pattern against known good citations

### UnicodeEncodeError Crashes

**Symptom**: Script crashes with `UnicodeEncodeError: 'charmap' codec can't encode...`  
**Cause**: Windows enterprise cp1252 encoding, Unicode symbols in output  
**Fix**: 
1. Use batch wrapper: `run_ms_infojp.bat` (sets PYTHONIOENCODING=utf-8)
2. Use ASCII only: `[PASS]`, `[FAIL]`, `[ERROR]`, `[INFO]` not Unicode symbols

---

## Performance Considerations

### Backend
- **Connection Pooling**: Shared Azure clients in `shared_constants.py`
- **Async Operations**: Quart async framework for concurrent requests
- **Response Time Target**: <30 seconds (AC-002)

### Search
- **Hybrid Search**: Vector + keyword for best recall
- **Top-K Optimization**: Default `top_k=3`, adjust based on latency/quality
- **Index Tuning**: Review scoring profiles in Azure Search

### Citation Quality
- **Target**: ≥90% citation rate (AC-003)
- **Strategy**: Enforce in system prompt + post-processing validation
- **Fallback**: If no citations, query CanLII directly

---

## Documentation Hierarchy

**For AI Assistants**:
- This file - Architecture reference
- `.github/copilot-instructions.md` - Workflows, conventions, critical patterns
- `ACCEPTANCE.md` - Self-validating test framework

**For Developers**:
- `README.md` - Project overview, success criteria, delivery phases
- `base-platform/README.md` - Microsoft platform documentation
- `VALIDATION-REPORT.md` - Compliance analysis (92/100 score)

**For Operations**:
- `scripts/run_ms_infojp.py` - Professional runner with pre-flight validation
- `Makefile` - Build commands (from base-platform/)
- `logs/` - Execution logs with timestamps

---

## Acceptance Criteria Quick Reference

| AC | Description | Status | Test File |
|----|-------------|--------|-----------|
| AC-001 | Authentication via Entra ID | 🔴 Not Started | `test_authentication.py` |
| AC-002 | Response time <30s | 🔴 Not Started | `test_response_time.py` |
| AC-003 | Citation quality ≥90% | 🔴 Not Started | `test_citation_quality.py` |
| AC-004 | Multi-turn context (5 exchanges) | 🔴 Not Started | `test_multi_turn.py` |
| AC-005 | Bilingual support (EN/FR) | 🔴 Not Started | `test_bilingual.py` |
| AC-006 | CanLII ingestion 100+ EI cases | 🔴 Not Started | `test_canlii_ingestion.py` |
| AC-007 | Document upload (PDF/HTML) | 🔴 Not Started | `test_document_upload.py` |
| AC-008 | Session persistence | 🔴 Not Started | `test_session_persistence.py` |
| AC-009 | Access control (RBAC) | 🔴 Not Started | `test_access_control.py` |
| AC-010 | Audit logging | 🔴 Not Started | `test_audit_logging.py` |
| AC-011 | Performance 90% <30s | 🔴 Not Started | `test_performance.py` |
| AC-012 | Search recall ≥85% | 🔴 Not Started | `test_search_recall.py` |
| AC-013 | Error handling graceful | 🔴 Not Started | `test_error_handling.py` |

---

## Change Log

- **2026-01-24**: Initial architecture context created for MS-InfoJP project
- **Repository**: Base platform cloned from microsoft/PubSec-Info-Assistant (commit 807ee181)
- **Pre-flight**: Python 3.13, all directories validated, dependencies available

---

## Quick Commands

**Start Backend** (from base-platform/):
```bash
cd base-platform/app/backend
.venv\Scripts\activate
python app.py  # Port 5000
```

**Start Frontend** (from base-platform/):
```bash
cd base-platform/app/frontend
npm run dev  # Port 5173
```

**Run Acceptance Tests**:
```bash
set PYTHONIOENCODING=utf-8
pytest tests/acceptance/ -v
```

**Professional Runner**:
```bash
run_ms_infojp.bat validate
run_ms_infojp.bat run --mode local
```
