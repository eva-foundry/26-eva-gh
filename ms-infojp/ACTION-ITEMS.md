# MS-InfoJP Action Items

**Last Updated**: January 26, 2026 (Post-Cleanup)  
**Project Status**: Phase 1 Infrastructure Complete, Ready for Phase 2 Application Deployment  
**Monthly Cost**: $84-96 (Azure services only) + $0 compute (GitHub Pro 180 hrs/month)

---

## Immediate Next Actions (Phase 2 - Application Deployment)

### 1. Launch GitHub Codespace
**Priority**: HIGH  
**Estimated Time**: 5-10 minutes  
**Status**: Not Started

**Steps**:
1. Navigate to `base-platform/` directory in GitHub web interface
2. Click "Code" → "Codespaces" → "Create codespace on main"
3. Wait ~5 minutes for container build (Python, Azure CLI, Node.js pre-installed)
4. Verify devcontainer loaded successfully

**Evidence**: Screenshot of running Codespace

---

### 2. Authenticate Azure CLI in Codespace
**Priority**: HIGH  
**Estimated Time**: 2 minutes  
**Dependencies**: Action #1  
**Status**: Not Started

**Steps**:
```bash
az login --use-device-code
az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
az account show  # Verify correct subscription
```

**Evidence**: Azure CLI confirmation showing MarcoSub subscription

---

### 3. Configure Backend Environment
**Priority**: HIGH  
**Estimated Time**: 10 minutes  
**Dependencies**: Action #2  
**Status**: Not Started

**Steps**:
1. Create `app/backend/backend.env` from template
2. Update with infojp-sandbox endpoints:
   - AZURE_OPENAI_ENDPOINT (from ao-sandbox)
   - AZURE_SEARCH_ENDPOINT (from infojp-srch)
   - AZURE_COSMOSDB_ENDPOINT (from infojp-cosmos)
   - AZURE_STORAGE_CONNECTION_STRING (from infojpst01)
3. Set fallback flags for local dev:
   - OPTIMIZED_KEYWORD_SEARCH_OPTIONAL=true
   - ENRICHMENT_OPTIONAL=true
4. Verify Key Vault access for OpenAI keys

**Evidence**: backend.env file (redacted) + connection test logs

---

### 4. Start Backend Server
**Priority**: HIGH  
**Estimated Time**: 5 minutes  
**Dependencies**: Action #3  
**Status**: Not Started

**Steps**:
```bash
cd app/backend
python app.py  # Should start on port 5000
```

**Success Criteria**:
- Server starts without errors
- Health check responds: `curl http://localhost:5000/health`
- Log shows "Quart running on http://0.0.0.0:5000"

**Evidence**: Terminal output showing successful startup

---

### 5. Start Frontend Development Server
**Priority**: HIGH  
**Estimated Time**: 5 minutes  
**Dependencies**: Action #4  
**Status**: Not Started

**Steps**:
```bash
cd app/frontend
npm install
npm run dev  # Should start on port 5173
```

**Success Criteria**:
- Vite dev server starts
- Port forwarding enabled automatically by Codespace
- Can access UI via forwarded port

**Evidence**: Browser screenshot of frontend UI

---

### 6. Test Document Upload Pipeline
**Priority**: MEDIUM  
**Estimated Time**: 15 minutes  
**Dependencies**: Actions #4, #5  
**Status**: Not Started

**Steps**:
1. Access frontend via Codespace port forwarding (port 5173)
2. Click "Upload Document"
3. Select test PDF from `tests/test_data/` (create sample if needed)
4. Monitor Azure Portal:
   - Storage Account (infojpst01): Check `documents` container
   - Functions logs: Check OCR processing
   - Search index: Check `index-jurisprudence` for new chunks
5. Wait 2-5 minutes for processing

**Success Criteria**:
- Document appears in `documents` container
- Chunks indexed in Azure Search
- No errors in function logs

**Evidence**: Azure Portal screenshots + search results

---

### 7. Test RAG Query
**Priority**: MEDIUM  
**Estimated Time**: 10 minutes  
**Dependencies**: Action #6  
**Status**: Not Started

**Steps**:
1. In frontend chat interface, submit query: "What is the key decision in this case?"
2. Verify streaming response appears
3. Check for inline citations
4. Verify citations link to source documents

**Success Criteria**:
- Answer streams successfully
- Citations appear in response
- Citation links work (point to CanLII or uploaded docs)
- Response relevant to uploaded content

**Evidence**: Screenshot of chat with answer + citations

---

## Medium Priority (After Phase 2 Complete)

### 8. Configure Storage Containers
**Priority**: MEDIUM  
**Status**: Not Started

Create required containers in infojpst01:
- `documents` (for uploaded PDFs)
- `text-enrichment-output` (for chunked text)
- `text-enrichment-queue` (for processing queue)

### 9. Configure Cosmos DB Containers
**Priority**: MEDIUM  
**Status**: Not Started

Create required containers in infojp-cosmos:
- `conversations` (for chat history)
- `sessions` (for user sessions)

### 10. Run Acceptance Tests
**Priority**: MEDIUM  
**Status**: Not Started

Execute 13 acceptance tests from ACCEPTANCE.md:
- AC-001: Authentication
- AC-002: Response time <30s
- AC-003: Citation quality >=90%
- ... (see ACCEPTANCE.md for full list)

---

## Low Priority (Future Enhancements)

### 11. CanLII CDC Implementation (Phase 3)
**Priority**: LOW  
**Status**: Planned

Implement Change Data Capture for CanLII:
- Tier 1: Registry polling (metadata changes)
- Tier 2: Artifact verification (conditional download)
- 26 acceptance tests (see cdc/acceptance-tests.md)

### 12. APIM Integration (Phase 4)
**Priority**: LOW  
**Status**: Planned

Deploy Azure API Management:
- Cost attribution headers
- Rate limiting policies
- OpenAPI specification
- (See apim/README.md for details)

---

## Resolved Items (No Action Needed)

### ~~VM Quota Request~~
**Status**: RESOLVED - Using GitHub Codespaces instead  
**Decision**: No Azure App Services needed for sandbox MVP

### ~~Cost Approval~~
**Status**: RESOLVED - $84-96/month approved  
**Decision**: Within personal Azure budget, no blocker

### ~~Azure OpenAI Access~~
**Status**: RESOLVED - Using existing ao-sandbox  
**Decision**: Reusing existing gpt-4o + text-embedding-3-small deployment

---

## Lessons Learned

### Deployment Philosophy
**10 minutes raw Azure CLI vs 1+ day Terraform troubleshooting**

For sandbox MVP deployments:
- ✅ Use raw Azure CLI commands (copy-paste, deterministic)
- ❌ Avoid Terraform/Bicep abstractions (adds complexity without value)
- ✅ Document command history (DEPLOYMENT-STATUS.md)
- ✅ Verify with connectivity reports (azure-connectivity-*.md)

### Azure CLI Gotchas
- **Storage naming**: No hyphens allowed (`infojpst` not `infojp-st`)
- **Subscription context**: Must set explicitly with `az account set`
- **Key Vault RBAC**: 1-2 minute propagation delay after role assignment
- **Region matching**: Deploy to same region as existing resources when possible

### Documentation Hygiene
- Remove template sections not applicable to project scope
- Explicitly mark decisions as RESOLVED/APPROVED
- Timestamp all action items and status updates
- Separate templates (architecture-ai-context.md) from project docs (README.md)

---

**Next Review**: After Phase 2 application deployment complete
