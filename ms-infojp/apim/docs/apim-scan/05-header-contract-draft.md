# Header Contract Draft

**Scope**: HTTP headers for governance, cost tracking, request correlation, and authentication  
**Discovery Method**: Backend source code inspection, API patterns, APIM requirements  
**Generated**: Header specification for APIM injection and backend propagation  

---

## Executive Summary

**Current State**: Backend has **NO header extraction or propagation** (all endpoints accept any headers silently)

**Proposed Header Contract**: 7 headers for governance + 3 existing HTTP standards

**Injection Points**:
- **Level 1 (APIM)**: Generated/injected at APIM gateway (inbound policy)
- **Level 2 (Backend)**: Extracted by new middleware (requires code addition)
- **Level 3 (Cosmos DB)**: Logged with upload/status records (requires new field)

---

## Existing HTTP Headers (Observed in Codebase)

### Response Headers Emitted by Backend

| Header | Emitted By | Value | Evidence |
|--------|-----------|-------|----------|
| `Content-Type` | FastAPI/StreamingResponse | `application/x-ndjson` \| `text/event-stream` \| `application/json` | app.py:293, 818 |
| `Transfer-Encoding` | FastAPI (chunked responses) | `chunked` | Implicit in StreamingResponse |
| `Content-Disposition` | File download handler | `inline; filename={blob_name}` | app.py:927 |
| `Cache-Control` | FastAPI default | `no-cache` | Implicit in FastAPI |

### Request Headers Sent by Frontend

| Header | Sent By | Value | Evidence |
|--------|---------|-------|----------|
| `Content-Type` | Frontend fetch() | `application/json` \| `multipart/form-data` | api.ts:28, 260 |
| `User-Agent` | Browser | Browser version | Implicit |
| `Accept` | (none explicit) | Default browser behavior | Not set in api.ts |

### Observed Gaps

| Header | Use Case | Status | Notes |
|--------|----------|--------|-------|
| `Authorization` | Service-to-service auth | Implicit in SDKs | Not in HTTP headers; in SDK token provider |
| `X-Correlation-Id` | Request tracing | ❌ Missing | Not generated or propagated |
| `X-Request-Id` | Request identification | ❌ Missing | Not generated or propagated |
| `User-Id` / `X-User-Id` | User identification | ❌ Missing | No user auth implemented |

---

## Proposed Header Contract

### Category 1: Client-Sent Headers (External APIM ↔ Backend)

These headers are **sent by external callers** through APIM. Backend should **extract and use** them.

#### 1.1 X-Correlation-Id (REQUIRED)

| Property | Value |
|----------|-------|
| **Direction** | Client → APIM → Backend → Response |
| **Format** | UUID v4 or trace ID |
| **Source** | Frontend generates (if not present, APIM generates) |
| **Backend Action** | Extract and log with every request |
| **Cosmos Logging** | Add `correlation_id` field to status log |
| **Example** | `X-Correlation-Id: 550e8400-e29b-41d4-a716-446655440000` |

**Rationale**: Essential for distributed tracing across APIM → Backend → Azure services

**Implementation Required** (Backend):
```python
@app.middleware("http")
async def extract_correlation_id(request: Request, call_next):
    correlation_id = request.headers.get("X-Correlation-Id", str(uuid.uuid4()))
    request.state.correlation_id = correlation_id
    
    response = await call_next(request)
    response.headers["X-Correlation-Id"] = correlation_id
    return response

# In status logging:
statusLog.upsert_document(
    document_path=path,
    ...,
    correlation_id=request.state.correlation_id  # NEW field
)
```

**Evidence Gap**: Currently not used in app.py; would require middleware addition

---

#### 1.2 X-Run-Id (REQUIRED)

| Property | Value |
|----------|-------|
| **Direction** | Client → APIM → Backend → Response |
| **Format** | Unique string per batch/execution |
| **Source** | APIM generates (set by inbound policy) |
| **Backend Action** | Extract and associate with operation |
| **Cosmos Logging** | Add `run_id` field to status log |
| **Example** | `X-Run-Id: batch-2024-01-25-001` |

**Rationale**: Track all operations within a single batch/run for cost allocation and debugging

**Use Case**: "Show me all uploads from Run #batch-2024-01-25-001"

**Implementation Required** (Backend):
```python
@app.middleware("http")
async def extract_run_id(request: Request, call_next):
    run_id = request.headers.get("X-Run-Id", "unknown")
    request.state.run_id = run_id
    
    response = await call_next(request)
    response.headers["X-Run-Id"] = run_id
    return response

# In all operations:
statusLog.upsert_document(
    ...,
    run_id=request.state.run_id  # NEW field
)
```

**Evidence Gap**: Currently not used in app.py; would require middleware addition

---

#### 1.3 X-Caller-App (REQUIRED)

| Property | Value |
|----------|-------|
| **Direction** | Client → APIM → Backend |
| **Format** | Application identifier |
| **Source** | APIM sets based on subscription/cert |
| **Backend Action** | Extract for audit logging |
| **Cosmos Logging** | Add `caller_app` field to status log |
| **Example** | `X-Caller-App: infojp-web` \| `infojp-batch-service` \| `infojp-mobile` |

**Rationale**: Identify which application/client is making the request (multi-tenant scenario)

**APIM Configuration**:
```xml
<inbound>
    <set-header name="X-Caller-App" exists-action="skip">
        <value>@(context.Subscription.Name)</value>  <!-- Or custom logic -->
    </set-header>
</inbound>
```

**Implementation Required** (Backend):
```python
request.state.caller_app = request.headers.get("X-Caller-App", "unknown")

statusLog.upsert_document(
    ...,
    caller_app=request.state.caller_app  # NEW field
)
```

**Evidence Gap**: Currently not extracted in app.py; would require middleware addition

---

#### 1.4 X-Env (OPTIONAL)

| Property | Value |
|----------|-------|
| **Direction** | Client → APIM → Backend |
| **Format** | Environment name |
| **Source** | APIM sets based on instance |
| **Backend Action** | Log for debugging environment issues |
| **Cosmos Logging** | Add `environment` field |
| **Example** | `X-Env: dev` \| `staging` \| `prod` |

**Rationale**: Distinguish logs from different deployment environments

**APIM Configuration**:
```xml
<inbound>
    <set-header name="X-Env" exists-action="skip">
        <value>@(context.Deployment.Region == "westus" ? "staging" : "prod")</value>
    </set-header>
</inbound>
```

**Implementation** (Backend):
```python
environment = request.headers.get("X-Env", ENV.get("LOCAL_DEBUG") and "dev" or "unknown")
request.state.environment = environment
```

**Evidence Gap**: Currently uses ENV["LOCAL_DEBUG"] but not from header

---

### Category 2: Cost & Governance Headers (APIM-Authoritative)

These headers are **set by APIM and backend should NOT override**. Used for cost tracking and governance.

#### 2.1 X-Cost-Center (OPTIONAL)

| Property | Value |
|----------|-------|
| **Direction** | APIM → Backend (read-only) |
| **Format** | Cost center code |
| **Source** | APIM policy (from JWT claims or API key metadata) |
| **Backend Action** | Extract and log for billing |
| **Cosmos Logging** | Add `cost_center` field |
| **Example** | `X-Cost-Center: CC-12345` |

**Rationale**: Allocate Azure costs to business units (optional billing feature)

**APIM Configuration**:
```xml
<inbound>
    <set-header name="X-Cost-Center" exists-action="skip">
        <value>@(context.Request.Headers.GetValueOrDefault("X-Cost-Center", "UNKNOWN"))</value>
    </set-header>
</inbound>
```

**Backend Usage**:
```python
cost_center = request.headers.get("X-Cost-Center", "UNALLOCATED")

# Log with Cosmos DB for downstream cost analysis
cosmos_log_entry["cost_center"] = cost_center
```

**Evidence Gap**: No cost tracking in current implementation

---

#### 2.2 X-Project-Id (OPTIONAL)

| Property | Value |
|----------|-------|
| **Direction** | APIM → Backend (read-only) |
| **Format** | Project identifier |
| **Source** | APIM policy (from JWT or metadata) |
| **Backend Action** | Extract for project-based quotas |
| **Cosmos Logging** | Add `project_id` field |
| **Example** | `X-Project-Id: proj-infojp-001` |

**Rationale**: Enable per-project rate limiting or storage quotas (future multi-tenant feature)

**Backend Usage**:
```python
project_id = request.headers.get("X-Project-Id", "default")

# Could enforce per-project limits:
# if get_project_usage(project_id) > quota: return 429
```

**Evidence Gap**: No project isolation in current implementation

---

#### 2.3 X-Ingestion-Variant (OPTIONAL)

| Property | Value |
|----------|-------|
| **Direction** | Client → APIM → Backend |
| **Format** | Experiment/variant identifier |
| **Source** | Frontend or APIM policy |
| **Backend Action** | Extract for A/B testing |
| **Cosmos Logging** | Add `ingestion_variant` field |
| **Example** | `X-Ingestion-Variant: control` \| `variant-a` \| `variant-b` |

**Rationale**: Track which approach/algorithm variant was used (e.g., different RAG strategies)

**Related Current Field**: `tags` in metadata (similar purpose but different scope)

**Backend Usage** (Already Partially Implemented):
```python
# Current: selected via form/body
approach = json_body.get("approach")  # Enum: 0=ReadRetrieveRead, 1=ChatWebRetrieveRead, etc.

# Enhanced: Also check header
variant = request.headers.get("X-Ingestion-Variant", "control")
request.state.variant = variant

# Log with approach:
cosmos_log["approach"] = approach
cosmos_log["variant"] = variant
```

**Evidence**: Similar to existing "tags" feature; header would supplement it

---

### Category 3: Response Correlation Headers

These headers **backend should echo back** in response to enable client-side correlation.

#### 3.1 X-Correlation-Id (RESPONSE)

| Property | Value |
|----------|-------|
| **Direction** | Backend → APIM → Client |
| **Action** | Echo request header in response |
| **Middleware** | Extract (1.1) and echo in response |
| **Example** | Same as request; enables client to match response |

**Implementation** (see 1.1 middleware example)

---

#### 3.2 X-Run-Id (RESPONSE)

| Property | Value |
|----------|-------|
| **Direction** | Backend → APIM → Client |
| **Action** | Echo request header in response |
| **Middleware** | Extract (1.2) and echo in response |
| **Example** | Same as request; enables client to match response |

**Implementation** (see 1.2 middleware example)

---

## Detailed Insertion Points

### Insertion Point 1: HTTP Request Entry (APIM Inbound Policy)

```xml
<!-- apim-policy.xml: Inbound Processing -->
<policies>
    <inbound>
        <!-- 1. Generate/Set governance headers (APIM authoritative) -->
        <set-header name="X-Run-Id" exists-action="skip">
            <value>@(context.RequestId)</value>
        </set-header>
        
        <set-header name="X-Caller-App" exists-action="skip">
            <value>@(context.Subscription?.Name ?? "unknown")</value>
        </set-header>
        
        <set-header name="X-Env" exists-action="skip">
            <value>@(context.Deployment.Region == "westus" ? "staging" : "prod")</value>
        </set-header>
        
        <!-- 2. Ensure correlation ID exists (generate if missing) -->
        <set-header name="X-Correlation-Id" exists-action="skip">
            <value>@(context.Request.Headers.GetValueOrDefault("X-Correlation-Id", context.RequestId))</value>
        </set-header>
        
        <!-- 3. Pass cost/project headers through (from JWT or API key) -->
        <set-header name="X-Cost-Center" exists-action="skip">
            <value>@(context.Request.Headers.GetValueOrDefault("X-Cost-Center", "UNALLOCATED"))</value>
        </set-header>
        
        <set-header name="X-Project-Id" exists-action="skip">
            <value>@(context.Request.Headers.GetValueOrDefault("X-Project-Id", "default"))</value>
        </set-header>
        
        <!-- 4. Allow client to specify variant (for A/B testing) -->
        <!-- (passed through as-is if present) -->
    </inbound>
</policies>
```

---

### Insertion Point 2: Backend Middleware (NEW - Code Addition Required)

```python
# app.py: Add new middleware function
from fastapi import Request
import uuid

@app.middleware("http")
async def extract_governance_headers(request: Request, call_next):
    """
    Extract APIM governance headers and store in request state.
    These headers are available to all route handlers and can be logged.
    """
    
    # Extract governance headers
    correlation_id = request.headers.get("X-Correlation-Id", str(uuid.uuid4()))
    run_id = request.headers.get("X-Run-Id", "unknown")
    caller_app = request.headers.get("X-Caller-App", "unknown")
    environment = request.headers.get("X-Env", ENV.get("LOCAL_DEBUG", "false") == "true" and "dev" or "unknown")
    cost_center = request.headers.get("X-Cost-Center", "UNALLOCATED")
    project_id = request.headers.get("X-Project-Id", "default")
    ingestion_variant = request.headers.get("X-Ingestion-Variant", "control")
    
    # Store in request state for handlers to access
    request.state.correlation_id = correlation_id
    request.state.run_id = run_id
    request.state.caller_app = caller_app
    request.state.environment = environment
    request.state.cost_center = cost_center
    request.state.project_id = project_id
    request.state.ingestion_variant = ingestion_variant
    
    # Process request
    response = await call_next(request)
    
    # Echo correlation headers in response
    response.headers["X-Correlation-Id"] = correlation_id
    response.headers["X-Run-Id"] = run_id
    
    # Log request with headers (optional: for audit trail)
    log.info(
        f"Request: {request.method} {request.url.path} | "
        f"Run={run_id} | Correlation={correlation_id} | App={caller_app} | "
        f"Env={environment} | Project={project_id}"
    )
    
    return response
```

**Placement**: After imports, before route definitions (around line 250)

**Evidence Location**: Would need new code block (not currently present)

---

### Insertion Point 3: Cosmos DB Status Logging (NEW - Schema Update Required)

```python
# In statusLog.upsert_document() calls throughout app.py
# Add new optional fields to Cosmos document

statusLog.upsert_document(
    document_path=path,
    status=status,
    status_classification=status_classification,
    state=state,
    # NEW: Governance fields
    correlation_id=request.state.correlation_id,  # 1.1
    run_id=request.state.run_id,                  # 1.2
    caller_app=request.state.caller_app,          # 1.3
    cost_center=request.state.cost_center,        # 2.1
    project_id=request.state.project_id,          # 2.2
    ingestion_variant=request.state.ingestion_variant,  # 2.3
    environment=request.state.environment,        # 1.4
)
```

**Affected Routes**:
- POST `/file` (upload) → line 879
- POST `/deleteItems` → line 382
- POST `/resubmitItems` → line 418
- POST `/logstatus` → line 527

**Cosmos DB Schema Update**:
```json
{
  "id": "doc-path-1",
  "document_path": "upload/file.pdf",
  "status": "Processing",
  "state": "PROCESSING",
  "timestamp": "2024-01-25T10:30:00Z",
  
  // NEW: Governance fields
  "correlation_id": "550e8400-e29b-41d4-a716-446655440000",
  "run_id": "batch-2024-01-25-001",
  "caller_app": "infojp-web",
  "cost_center": "CC-12345",
  "project_id": "proj-infojp-001",
  "ingestion_variant": "control",
  "environment": "prod"
}
```

---

## Header Propagation Diagram

```
┌─────────────┐
│ External    │
│ Client      │
│ (Optional:  │
│  X-Cost-    │
│  Center,    │
│  X-Project- │
│  Id,        │
│  X-Ingestion │
│  -Variant)  │
└──────┬──────┘
       │
       │ Request (possibly with some headers)
       ↓
┌───────────────────────────────────────────┐
│ APIM Gateway (Inbound Policy)             │
│ ───────────────────────────────────────── │
│ IF X-Correlation-Id missing:              │
│   → Generate UUID                         │
│ SET X-Run-Id = context.RequestId          │
│ SET X-Caller-App = context.Subscription   │
│ SET X-Env = deployment region             │
│ PASS through: X-Cost-Center, X-Project-Id │
│ ALLOW: X-Ingestion-Variant                │
└──────┬──────────────────────────────────────┘
       │
       │ Request + Headers
       ↓
┌───────────────────────────────────────────┐
│ Backend App (Middleware)                  │
│ ───────────────────────────────────────── │
│ @app.middleware("http")                   │
│ EXTRACT all headers                       │
│ STORE in request.state                    │
│ ADD to log entry                          │
│ PASS to route handler                     │
└──────┬──────────────────────────────────────┘
       │
       │ Route Handler
       ↓
┌───────────────────────────────────────────┐
│ Route Handler (e.g., POST /file)          │
│ ───────────────────────────────────────── │
│ USE request.state.run_id                  │
│ USE request.state.correlation_id          │
│ USE request.state.project_id              │
│ LOG to Cosmos DB with headers             │
└──────┬──────────────────────────────────────┘
       │
       │ Cosmos DB insert
       ↓
┌───────────────────────────────────────────┐
│ Cosmos DB (statusdb/statuscontainer)      │
│ ───────────────────────────────────────── │
│ {                                         │
│   "document_path": "...",                 │
│   "run_id": "batch-...",                  │
│   "correlation_id": "UUID",               │
│   "caller_app": "infojp-web",             │
│   "cost_center": "CC-12345",              │
│   "project_id": "proj-...",               │
│   "environment": "prod",                  │
│   ...                                     │
│ }                                         │
└──────┬──────────────────────────────────────┘
       │
       │ Response
       ↓
┌───────────────────────────────────────────┐
│ Backend Response (Outbound)               │
│ ───────────────────────────────────────── │
│ ECHO X-Correlation-Id                     │
│ ECHO X-Run-Id                             │
│ (Middleware step 3)                       │
└──────┬──────────────────────────────────────┘
       │
       │ Response + Headers
       ↓
┌───────────────────────────────────────────┐
│ APIM Gateway (Outbound Policy)            │
│ ───────────────────────────────────────── │
│ (Optional: massage response headers)      │
│ PASS through: X-Correlation-Id, X-Run-Id │
└──────┬──────────────────────────────────────┘
       │
       │ Response
       ↓
┌─────────────────┐
│ Client receives │
│ response with   │
│ correlation IDs │
│ for logging     │
└─────────────────┘
```

---

## Backend Code Implementation Checklist

- [ ] **Add middleware** (see Insertion Point 2)
  - [ ] Import uuid, Request
  - [ ] Define `extract_governance_headers()` function
  - [ ] Call `@app.middleware("http")` decorator
  - [ ] Place before route definitions (~line 250)

- [ ] **Update status logging** (see Insertion Point 3)
  - [ ] Add governance fields to `statusLog.upsert_document()` calls
  - [ ] Update in POST `/file` handler (line ~879)
  - [ ] Update in POST `/deleteItems` handler (line ~382)
  - [ ] Update in POST `/resubmitItems` handler (line ~418)
  - [ ] Update in POST `/logstatus` handler (line ~527)

- [ ] **Update Cosmos DB schema** (optional but recommended)
  - [ ] Add indexing policy for `correlation_id`, `run_id`
  - [ ] Add indexing policy for `cost_center`, `project_id`
  - [ ] Update any queries to include new fields

- [ ] **Test header propagation**
  - [ ] POST request with `X-Correlation-Id` header
  - [ ] Verify header echoed in response
  - [ ] Verify Cosmos DB document contains field

---

## Separation of Concerns

### Client-Sent Headers (External)

| Header | Sent By | APIM Role | Backend Role |
|--------|---------|-----------|--------------|
| `X-Correlation-Id` | Client (or APIM generates) | Pass through | Extract, echo |
| `X-Cost-Center` | Client (JWT claim) | Extract, set header | Extract, log |
| `X-Project-Id` | Client (JWT claim) | Extract, set header | Extract, log |
| `X-Ingestion-Variant` | Client (optional) | Pass through | Extract, log |

### APIM-Authoritative Headers

| Header | Set By | Backend Role |
|--------|--------|--------------|
| `X-Run-Id` | APIM (inbound policy) | Extract, log, echo |
| `X-Caller-App` | APIM (from subscription) | Extract, log |
| `X-Env` | APIM (from deployment) | Extract, log |

**Key Rule**: Backend should **NOT override** APIM-authoritative headers; only extract and log them.

---

## Example Request/Response Flow

### Request

```http
POST https://apim.azure-api.net/infojp/file HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary
X-Correlation-Id: 550e8400-e29b-41d4-a716-446655440000
X-Cost-Center: CC-12345
X-Project-Id: proj-infojp-001

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="document.pdf"

[PDF file content]
------WebKitFormBoundary
Content-Disposition: form-data; name="file_path"

documents/report.pdf
------WebKitFormBoundary--
```

### APIM Inbound Policy Processing

```
X-Correlation-Id: 550e8400-e29b-41d4-a716-446655440000  (passed through)
X-Run-Id: api-call-123456  (APIM sets)
X-Caller-App: infojp-web  (APIM sets from subscription)
X-Env: prod  (APIM sets from region)
X-Cost-Center: CC-12345  (passed through from JWT)
X-Project-Id: proj-infojp-001  (passed through from JWT)
X-Ingestion-Variant: control  (client-provided, optional)
```

### Backend Middleware Processing

```
request.state.correlation_id = "550e8400-e29b-41d4-a716-446655440000"
request.state.run_id = "api-call-123456"
request.state.caller_app = "infojp-web"
request.state.environment = "prod"
request.state.cost_center = "CC-12345"
request.state.project_id = "proj-infojp-001"
request.state.ingestion_variant = "control"
```

### Cosmos DB Log Entry

```json
{
  "id": "doc-20240125-001",
  "document_path": "upload/documents/report.pdf",
  "status": "Processing",
  "state": "QUEUED",
  "timestamp": "2024-01-25T10:30:00Z",
  
  "correlation_id": "550e8400-e29b-41d4-a716-446655440000",
  "run_id": "api-call-123456",
  "caller_app": "infojp-web",
  "environment": "prod",
  "cost_center": "CC-12345",
  "project_id": "proj-infojp-001",
  "ingestion_variant": "control"
}
```

### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
X-Correlation-Id: 550e8400-e29b-41d4-a716-446655440000
X-Run-Id: api-call-123456

{
  "message": "File 'report.pdf' uploaded successfully"
}
```

---

## Evidence Summary

| Category | Status | File | Lines | Notes |
|----------|--------|------|-------|-------|
| **Current Headers** | ✅ | app.py | 272-293, 911-927 | Content-Type, Transfer-Encoding, Content-Disposition set |
| **Governance Headers** | ❌ | app.py | all | NOT extracted, NOT logged, NOT propagated |
| **Middleware** | ❌ | app.py | 1-904 | No middleware defined; no header extraction |
| **Cosmos Logging** | ⚠️ Partial | app.py | 380-385, 416-420, 525-530, 879 | Logs path/status but not governance headers |
| **Response Headers** | ⚠️ Partial | app.py | 293, 818, 927 | Some response headers set but no governance echo |

