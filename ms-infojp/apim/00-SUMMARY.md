# APIM Repo Scan Summary

**Date**: 2026-01-25  
**Repo**: `I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\base-platform`  
**Status**: Phase 1 Complete - Stack Identified & Scan Plan Ready  
**Next Phase**: Execute ripgrep scans and produce API call inventory

---

## What We Know (Evidence-Based)

### 1. Tech Stack (Confirmed)
✅ **Frontend**: React 18.3.1 + TypeScript 4.9.5 + Vite 5.4.11  
✅ **Backend**: Python FastAPI 0.115.0 + Uvicorn 0.30.6  
✅ **Workers**: Azure Functions Python 1.21.0  
✅ **Enrichment**: FastAPI + sentence-transformers 3.1.1  
✅ **Streaming**: Server-Sent Events (SSE) via `ndjson-readablestream` + `StreamingResponse`

**Evidence**: Package manifests, framework imports, config files

---

### 2. Azure Service Access Pattern (Critical for APIM)
✅ **All Azure services use typed SDKs** (not raw HTTP):
- `azure-search-documents==11.5.1` (SearchClient)
- `azure-storage-blob==12.23.0` (BlobServiceClient)
- `azure-cosmos==4.7.0` (CosmosClient)
- `openai==1.55.3` (AsyncAzureOpenAI)
- `azure-identity==1.18.0` (ManagedIdentityCredential)

**Implication**: APIM **cannot intercept** Azure SDK calls (they use internal Azure endpoints).  
**APIM Scope**: Front **only** the backend API routes (`/chat`, `/upload`, `/logstatus`, etc.)

**Evidence**: Requirements files, import statements in `app.py` and approaches

---

### 3. API Surface (Preliminary Count)
📊 **Backend Routes**: ~25-30 endpoints in `app.py`  
📊 **Frontend API Functions**: ~30-40 in `api/api.ts`  
📊 **Streaming Endpoints**: `/chat` (SSE), possibly others

**Next Step**: Run ripgrep scans to extract exact list with line numbers

---

### 4. Streaming Implementation
✅ **Backend**: `StreamingResponse(r, media_type="application/x-ndjson")`  
✅ **Frontend**: `ndjson-readablestream` library parses SSE chunks  
✅ **Dev Proxy**: Vite proxies `/ask` and `/chat` to `http://localhost:5000`

**APIM Requirement**: Must support chunked transfer encoding and SSE passthrough

**Evidence**: `app.py` line 293, `api.ts` imports, `vite.config.ts` lines 20-24

---

### 5. Authentication Pattern (Detected)
✅ **Backend Auth**: Azure Managed Identity + `DefaultAzureCredential`  
✅ **Token Provider**: `get_bearer_token_provider()` for machine-to-machine  
❓ **Frontend Auth**: Need to inspect `app/backend/auth/` folder (if exists)

**APIM Requirement**: Validate Entra ID tokens or pass them through transparently

**Evidence**: `app.py` lines 129-138

---

### 6. Configuration Pattern
✅ **Env Vars**: All config via `os.environ[]` in `app.py`  
✅ **Key Endpoints**:
- `AZURE_OPENAI_ENDPOINT`
- `AZURE_SEARCH_SERVICE_ENDPOINT`
- `AZURE_BLOB_STORAGE_ENDPOINT`
- `COSMOSDB_URL`
- `ENRICHMENT_APPSERVICE_URL` (HTTP call target - potential APIM route)

**APIM Task**: Map these to APIM named values for policy enforcement

**Evidence**: `app.py` lines throughout, requirements for `.env` files

---

## What We Need to Find (Phase 2)

### Critical Gaps
1. ❓ **Complete route inventory** with request/response schemas
2. ❓ **Frontend → Backend call mapping** (which UI component calls which endpoint)
3. ❓ **Existing custom headers** (X-Request-Id, X-Correlation-Id, etc.)
4. ❓ **Auth middleware** implementation (if any)
5. ❓ **CORS configuration** details
6. ❓ **Enrichment service API contract** (if backend → enrichment should go through APIM)

### Where to Look
- `app/backend/app.py` (lines 1-904) - All routes
- `app/frontend/src/api/api.ts` (lines 1-490) - All API calls
- `app/backend/core/` (if exists) - Shared utilities
- `app/backend/auth/` (if exists) - Auth middleware
- `.env.template` or `backend.env` - Required env vars

---

## APIM Integration Strategy (Preliminary)

### Phase 1: Frontend → Backend APIM Gateway
**Scope**: Front the FastAPI backend with APIM

**Changes Required**:
1. Deploy APIM instance in Azure
2. Import OpenAPI spec (generate from FastAPI `/docs`)
3. Update frontend `API_BASE_URL` env var to APIM gateway
4. Configure APIM policies:
   - Validate Entra ID tokens
   - Add correlation IDs (X-Correlation-Id)
   - Add cost attribution headers (X-Run-Id, X-User-Id, etc.)
   - Enable SSE passthrough (chunked transfer encoding)
   - Set CORS for frontend origins
5. Test streaming endpoints (`/chat`)

**APIM Backend**: FastAPI backend (App Service or Container Apps)

---

### Phase 2: Backend → Enrichment APIM Route (Optional)
**Scope**: Route backend → enrichment calls through APIM

**Changes Required**:
1. Add enrichment API to APIM
2. Update `ENRICHMENT_APPSERVICE_URL` to point to APIM gateway
3. Propagate headers from frontend → backend → enrichment

**Benefit**: End-to-end header propagation for embedding generation cost tracking

---

### Phase 3: Header Contract Enforcement
**Headers to Add** (draft):
- `X-Correlation-Id` (APIM-generated, unique per request)
- `X-User-Id` (mapped from Entra ID token claims)
- `X-Run-Id` (for ingestion batch tracking)
- `X-Ingestion-Variant` (for A/B testing ingestion pipelines)
- `X-Caller-App` (frontend, worker, batch job)
- `X-Env` (dev, staging, prod)
- `X-Cost-Center` (for chargeback)

**Injection Points**:
- APIM inbound policy (generate correlation ID)
- Frontend request constructor (set caller app, user context)
- Backend approach classes (read and log headers)
- Workers (set run ID and variant)

---

## Deliverables (Phase 2 Target)

### 1. API Call Inventory (`apim/04-api-call-inventory.md`)
Table with:
| Frontend Function | Backend Route | Method | Path | Streaming? | Request Body | Response Type | Evidence |

### 2. Auth & Identity Notes (`apim/05-auth-and-identity.md`)
- Current auth flow (Entra ID? JWT validation?)
- Where user identity is available server-side
- Middleware implementation (if any)

### 3. Config & Base URLs (`apim/06-config-and-base-urls.md`)
- Complete env var list
- Where frontend decides API endpoint
- APIM named value mapping

### 4. Streaming Analysis (`apim/07-streaming-analysis.md`)
- SSE implementation details
- APIM policy requirements
- Testing plan for streaming through APIM

### 5. Header Contract Draft (`apim/08-header-contract-draft.md`)
- Headers to add
- Where to inject/propagate
- APIM policy snippets

---

## Next Steps (Actionable)

### Step 1: Run Ripgrep Scans
```powershell
cd "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\base-platform"

# Create output directory
mkdir -p apim/scan-results

# Extract backend routes
rg -n '@app\.(get|post|put|delete)\("([^"]+)"' app/backend/app.py > apim/scan-results/routes.txt

# Extract frontend API calls
rg -n 'export async function|await fetch\(' app/frontend/src/api/api.ts > apim/scan-results/api-calls.txt

# Extract Azure SDK usage
rg -n 'from azure\.|import azure\.' app/backend/ --type python > apim/scan-results/azure-sdks.txt

# Extract streaming code
rg -n 'StreamingResponse|EventSource' app/ --type python --type typescript > apim/scan-results/streaming.txt
```

### Step 2: Inspect Top 10 Files
Follow the priority order in `03-inspection-priority.md`:
1. `app/backend/app.py` - Extract all routes
2. `app/frontend/src/api/api.ts` - Map to backend routes
3. `app/backend/approaches/chatreadretrieveread.py` - Verify SDK usage
4. (Continue through priority list)

### Step 3: Produce Deliverables
Create the 5 markdown files (04-08) using evidence from scans and file inspections.

### Step 4: Design APIM Policies
Based on deliverables, create:
- OpenAPI spec (from FastAPI `/docs`)
- Inbound policy (auth, headers, CORS)
- Backend policy (SSE passthrough, timeout)
- Outbound policy (response transformation if needed)

---

## Success Criteria (Definition of Done)

✅ Every backend route has:
- Line number reference in `app.py`
- Corresponding frontend call in `api.ts` (or marked as internal)
- HTTP method, path, request/response types
- Streaming flag (Y/N)

✅ Azure SDK usage confirmed:
- No raw HTTP calls to Azure services (except enrichment)
- All Azure access via typed clients

✅ Streaming implementation documented:
- Backend SSE pattern
- Frontend parsing pattern
- APIM policy requirements

✅ Auth pattern documented:
- Token validation mechanism
- Where user identity is extracted
- Middleware or decorator pattern

✅ Header contract drafted:
- List of headers to add
- Injection points identified
- Propagation path mapped

✅ Gaps/unknowns explicitly listed:
- What we couldn't find
- Where to look next
- Follow-up inspection paths

---

## References

- **Tech Stack Evidence**: [evidences/01-stack-evidence.md](./evidences/01-stack-evidence.md)
- **Scan Commands**: [evidences/02-scan-command-plan.md](./evidences/02-scan-command-plan.md)
- **Inspection Priority**: [evidences/03-inspection-priority.md](./evidences/03-inspection-priority.md)
- **Base Platform Repo**: `I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\base-platform`

---

**Status**: Ready to execute Phase 2 (ripgrep scans + file inspections)  
**Owner**: APIM Integration Team  
**Next Review**: After deliverables 04-08 complete

---

**End of APIM Repo Scan Summary**
