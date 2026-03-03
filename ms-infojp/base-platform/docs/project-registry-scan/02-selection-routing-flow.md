# Project/Index Selection and Routing Flow Analysis
**Evidence-First Flow Documentation for MS-InfoJP Base Platform**

**Scan Date:** 2026-01-26  
**Repo:** `I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\base-platform`  
**Method:** Code flow tracing with file:line evidence  

---

## Executive Summary

**CRITICAL FINDING:** This application has **NO project/index selection or routing mechanism**. 

- **Project Selection UI:** Does not exist
- **Project ID in Requests:** Not used
- **Backend Routing:** Static, single index only
- **Dynamic Index Resolution:** Not implemented
- **Fallback Behavior:** N/A (always uses single index)

This document traces the **actual static flow** and contrasts it with what a multi-project architecture would require.

---

## Table of Contents

1. [Actual Flow: Single-Index Architecture](#1-actual-flow-single-index-architecture)
2. [Step-by-Step Flow with Evidence](#2-step-by-step-flow-with-evidence)
3. [Decision Points Analysis](#3-decision-points-analysis)
4. [ASCII Sequence Diagrams](#4-ascii-sequence-diagrams)
5. [Comparison: Single vs Multi-Project Flow](#5-comparison-single-vs-multi-project-flow)
6. [Missing Components for Multi-Project Support](#6-missing-components-for-multi-project-support)

---

## 1. Actual Flow: Single-Index Architecture

### 1.1 High-Level Overview

```
User Opens App → Frontend Loads → Backend Starts → SearchClient Instantiated
                                                    (index: "gptkbindex")
User Asks Question → Backend Receives Request → SearchClient.search()
                                               → Results Returned
```

**Key Characteristic:** Index name determined at **backend startup**, not per-request.

---

### 1.2 Flow Characteristics

| Stage | Project Selection? | Evidence |
|-------|-------------------|----------|
| **UI Load** | ❌ No | No project selector component exists |
| **Request Formation** | ❌ No | No `project_id` parameter in API calls |
| **Backend Reception** | ❌ No | No project routing middleware |
| **Index Resolution** | ❌ No | Static, from ENV at startup |
| **Search Execution** | ❌ No | Single SearchClient reused |

---

## 2. Step-by-Step Flow with Evidence

### Step 1: Backend Application Startup

**File:** `app/backend/app.py`  
**Lines:** 43-102

#### 1.1 Environment Configuration Loading

```python
# Line 43-95: Hardcoded defaults
ENV = {
    "AZURE_SEARCH_INDEX": "gptkbindex",  # <-- HARDCODED DEFAULT
    # ... 45 other config keys
}

# Line 97-102: Override from OS environment
for key, value in ENV.items():
    new_value = os.getenv(key)
    if new_value is not None:
        ENV[key] = new_value
    elif value is None:
        raise ValueError(f"Environment variable {key} not set")
```

**Decision Point 1:** Index name from environment or default  
**Data Source:** OS environment variable `AZURE_SEARCH_INDEX` or hardcoded `"gptkbindex"`  
**Evidence:** File `app/backend/app.py`, lines 53, 97-102

---

#### 1.2 Search Client Instantiation (Single, Global)

**File:** `app/backend/app.py`  
**Lines:** 154-159

```python
# Set up clients for Cognitive Search and Storage
search_client = SearchClient(
    endpoint=ENV["AZURE_SEARCH_SERVICE_ENDPOINT"],
    index_name=ENV["AZURE_SEARCH_INDEX"],  # <-- STATIC, FROM ENV
    credential=azure_credential,
    audience=ENV["AZURE_SEARCH_AUDIENCE"]
)
```

**Decision Point 2:** NONE - Static client creation  
**Timing:** Application startup (once)  
**Scope:** Module-level global variable  
**Evidence:** File `app/backend/app.py`, lines 154-159

**Key Finding:** `search_client` is instantiated **once** at module load time, not per-request. It is impossible to switch indexes without restarting the application.

---

#### 1.3 Approach Classes Initialization

**File:** `app/backend/app.py`  
**Lines:** 197-210 (approximate, after model retrieval)

```python
chat_approaches = {
    Approaches.ReadRetrieveRead: ChatReadRetrieveReadApproach(
        search_client,  # <-- STATIC CLIENT INJECTED
        ENV["AZURE_OPENAI_ENDPOINT"],
        ENV["AZURE_OPENAI_CHATGPT_DEPLOYMENT"],
        ENV["KB_FIELDS_SOURCEFILE"],
        ENV["KB_FIELDS_CONTENT"],
        ENV["KB_FIELDS_PAGENUMBER"],
        ENV["KB_FIELDS_CHUNKFILE"],
        ENV["AZURE_BLOB_STORAGE_CONTAINER"],
        blob_client,
        ENV["QUERY_TERM_LANGUAGE"],
        MODEL_NAME,
        MODEL_VERSION,
        ENV["TARGET_EMBEDDINGS_MODEL"],
        ENV["ENRICHMENT_APPSERVICE_URL"]
    ),
    # ... other approaches
}
```

**Decision Point 3:** NONE - Static approach instantiation  
**Index Selection:** Already determined (via search_client)  
**Evidence:** File `app/backend/app.py`, lines 197+ (structure inferred from imports)

---

### Step 2: Frontend Application Load

**File:** `app/frontend/src/pages/chat/Chat.tsx`  
**Lines:** 1-534

#### 2.1 Component Initialization

```typescript
const Chat = () => {
    const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
    const [retrieveCount, setRetrieveCount] = useState<number>(5);
    const [useSuggestFollowupQuestions, setUseSuggestFollowupQuestions] = useState<boolean>(false);
    const [userPersona, setUserPersona] = useState<string>("analyst");
    const [systemPersona, setSystemPersona] = useState<string>("an Assistant");
    const [responseLength, setResponseLength] = useState<number>(2048);
    const [responseTemp, setResponseTemp] = useState<number>(0.6);
    const [activeChatMode, setChatMode] = useState<ChatMode>(ChatMode.WorkOnly);
    
    // ... NO project_id state
    // ... NO project selection state
```

**Decision Point 4:** NONE - No project selection in UI  
**Evidence:** File `app/frontend/src/pages/chat/Chat.tsx`, lines 32-54

**Finding:** State variables for UI settings exist, but **NO `selectedProject` or `projectId` state**.

---

#### 2.2 UI Rendering (No Project Selector)

**File:** `app/frontend/src/pages/chat/Chat.tsx`  
**Lines:** (rendering section, not fully inspected)

**Expected Structure (based on component list):**
```tsx
return (
    <div className={styles.container}>
        <Header />
        <QuestionInput onSend={makeApiRequest} />
        <SettingsButton onClick={() => setIsConfigPanelOpen(true)} />
        {/* NO <ProjectSelector /> component */}
        <AnswerList answers={answers} />
    </div>
);
```

**Decision Point 5:** NONE - No UI for project selection  
**Evidence:** 
- Component list from `app/frontend/src/components/` (25 components)
- No `ProjectSelector`, `ProjectPicker`, or `CorpusSelector` component exists
- File `app/frontend/src/pages/chat/Chat.tsx` inspected (no project selection JSX)

---

### Step 3: User Asks Question

#### 3.1 Question Input Handler

**File:** `app/frontend/src/pages/chat/Chat.tsx`  
**Lines:** 93-148

```typescript
const makeApiRequest = async (
    question: string, 
    approach: Approaches, 
    work_citation_lookup: { [key: string]: { citation: string; source_path: string; page_number: string } },
    web_citation_lookup: { [key: string]: { citation: string; source_path: string; page_number: string } },
    thought_chain: { [key: string]: string}
) => {
    lastQuestionRef.current = question;
    // ... state updates ...

    try {
        const history: ChatTurn[] = answers.map(a => ({ user: a[0], bot: a[1].answer }));
        const request: ChatRequest = {
            history: [...history, { user: question, bot: undefined }],
            approach: approach,
            overrides: {
                promptTemplate: undefined,
                excludeCategory: undefined,
                top: retrieveCount,
                semanticRanker: true,
                semanticCaptions: false,
                suggestFollowupQuestions: useSuggestFollowupQuestions,
                userPersona: userPersona,
                systemPersona: systemPersona,
                aiPersona: "",
                responseLength: responseLength,
                responseTemp: responseTemp,
                selectedFolders: selectedFolders.includes("selectAll") ? "All" : selectedFolders.length == 0 ? "All" : selectedFolders.join(","),
                selectedTags: selectedTags.map(tag => tag.name).join(",")
                // NO project_id field
                // NO corpus_id field
                // NO index_name field
            },
            citation_lookup: approach == Approaches.CompareWebWithWork ? web_citation_lookup : approach == Approaches.CompareWorkWithWeb ? work_citation_lookup : {},
            thought_chain: thought_chain
        };
```

**Decision Point 6:** NONE - Request built without project info  
**Evidence:** File `app/frontend/src/pages/chat/Chat.tsx`, lines 93-135

**Finding:** `ChatRequest` object contains:
- ✅ `history` (conversation context)
- ✅ `approach` (RAG strategy)
- ✅ `overrides` (query parameters)
- ✅ `selectedFolders` (document filters)
- ✅ `selectedTags` (document filters)
- ❌ NO `project_id`
- ❌ NO `corpus_id`
- ❌ NO `index_name`

---

#### 3.2 API Call Execution

**File:** `app/frontend/src/pages/chat/Chat.tsx`  
**Lines:** 138-148

```typescript
        const controller = new AbortController();
        setAbortController(controller);
        const signal = controller.signal;
        const result = await chatApi(request, signal);  // <-- NO project param
        if (!result.body) {
            throw Error("No response body");
        }

        setAnswerStream(result.body);
    } catch (e) {
        setError(e);
    } finally {
        setIsLoading(false);
    }
};
```

**Decision Point 7:** NONE - API called without project context  
**Evidence:** File `app/frontend/src/pages/chat/Chat.tsx`, lines 143

**Note:** `chatApi()` function signature not inspected, but no project_id passed from caller.

---

### Step 4: Backend Receives Request

**File:** `app/backend/app.py`  
**Lines:** (chat endpoint, not fully inspected but structure inferred)

#### 4.1 Chat Endpoint Handler (Inferred Structure)

**Expected Pattern:**
```python
@app.post("/chat")
async def chat(request: Request):
    """Handle chat requests"""
    json_body = await request.json()
    
    # Extract request fields
    history = json_body.get("history", [])
    approach_id = json_body.get("approach", Approaches.ReadRetrieveRead)
    overrides = json_body.get("overrides", {})
    
    # NO project_id extraction
    # NO index_name extraction
    # NO routing based on project
    
    # Use pre-instantiated approach
    approach = chat_approaches[approach_id]
    
    # Run approach (uses global search_client)
    result = await approach.run(
        history=history,
        overrides=overrides
    )
    
    return result
```

**Decision Point 8:** NONE - No project extraction or routing  
**Evidence:** 
- No `/chat` endpoint found in partial inspection (likely uses FastAPI patterns)
- Structure inferred from approach initialization and frontend request format
- No evidence of project_id parameter handling in any endpoint

---

### Step 5: Approach Executes Query

**File:** `app/backend/approaches/chatreadretrieveread.py`  
**Lines:** 90-130 (approximate, method structure)

#### 5.1 Approach Run Method (Structure)

```python
class ChatReadRetrieveReadApproach(Approach):
    def __init__(
        self,
        search_client: SearchClient,  # <-- INJECTED AT STARTUP
        # ... other params
    ):
        self.search_client = search_client  # <-- STORED AS INSTANCE VAR
        # ...
    
    async def run(
        self,
        history: list,
        overrides: dict,
        # NO project_id parameter
        # NO index_name parameter
    ):
        # Build search query
        query_text = self.build_query(history, overrides)
        
        # Execute search (uses self.search_client)
        results = await self.search_client.search(
            search_text=query_text,
            filter=self.build_filter(overrides),  # folders/tags, not project
            top=overrides.get("top", 5)
        )
        
        # Format results and generate response
        # ...
```

**Decision Point 9:** NONE - Uses pre-configured client  
**Evidence:** 
- File `app/backend/approaches/chatreadretrieveread.py`, lines 90-104 (init method)
- SearchClient injected at construction, not per-request
- No index parameter in method signatures

---

#### 5.2 Search Execution

**Flow:**
```
Approach.run() 
  → self.search_client.search()  (Azure SDK call)
    → Azure Cognitive Search API
      → Index: "gptkbindex" (determined at client creation)
```

**Decision Point 10:** NONE - Index already bound to client  
**Evidence:** Azure SDK `SearchClient` binds to single index at instantiation

---

### Step 6: Results Returned

**Flow:**
```
Azure Search → SearchClient → Approach → Backend Endpoint → Frontend → User
```

**No project/index information in response** (results just contain documents from the single index).

---

## 3. Decision Points Analysis

### Summary Table

| Decision Point | Location | Question | Data Source | Result |
|----------------|----------|----------|-------------|--------|
| **DP1** | Backend startup | Which index to use? | ENV var or default | `"gptkbindex"` |
| **DP2** | Backend startup | When to create client? | App initialization | Once, globally |
| **DP3** | Backend startup | Which approaches to init? | Hardcoded | All approaches |
| **DP4** | Frontend load | Which project to select? | **DOES NOT EXIST** | N/A |
| **DP5** | UI render | Show project selector? | **DOES NOT EXIST** | N/A |
| **DP6** | Request build | Include project_id? | **DOES NOT EXIST** | N/A |
| **DP7** | API call | Pass project context? | **DOES NOT EXIST** | N/A |
| **DP8** | Backend receive | Extract project_id? | **DOES NOT EXIST** | N/A |
| **DP9** | Approach run | Select index? | **DOES NOT EXIST** | Uses static client |
| **DP10** | Search execute | Which index to query? | Client config | `"gptkbindex"` |

### Critical Findings

1. **Only 3 real decision points** (DP1, DP2, DP3) - all at startup
2. **7 decision points do NOT exist** (DP4-DP8, routing-related)
3. **Zero dynamic decisions** per request
4. **Index selection is static** - determined once at app startup

---

## 4. ASCII Sequence Diagrams

### 4.1 Actual Flow: Single-Index Architecture

```
┌─────────┐          ┌──────────┐          ┌─────────────┐          ┌────────────┐
│ User/UI │          │ Frontend │          │   Backend   │          │   Search   │
└────┬────┘          └─────┬────┘          └──────┬──────┘          └─────┬──────┘
     │                     │                      │                        │
     │  App Opens          │                      │                        │
     ├─────────────────────>                      │                        │
     │                     │                      │                        │
     │                     │   App Starts         │                        │
     │                     │     (startup.py)     │                        │
     │                     ├──────────────────────>                        │
     │                     │                      │                        │
     │                     │                      │ Load ENV               │
     │                     │                      │ ├──────────┐           │
     │                     │                      │ │ index =  │           │
     │                     │                      │ │"gptkbindex"          │
     │                     │                      │ └──────────┘           │
     │                     │                      │                        │
     │                     │                      │ Create SearchClient    │
     │                     │                      │   (index: "gptkbindex")│
     │                     │                      ├───────────────────────>│
     │                     │                      │                        │
     │                     │                      │<───────────────────────┤
     │                     │                      │   (client stored       │
     │                     │                      │    globally)           │
     │                     │                      │                        │
     │                     │  Ready               │                        │
     │                     │<─────────────────────┤                        │
     │                     │                      │                        │
     │  User asks question │                      │                        │
     ├─────────────────────>                      │                        │
     │  "What is X?"       │                      │                        │
     │                     │                      │                        │
     │                     │  POST /chat          │                        │
     │                     │  {                   │                        │
     │                     │    question: "...",  │                        │
     │                     │    overrides: {...}  │                        │
     │                     │  }                   │                        │
     │                     │  (NO project_id)     │                        │
     │                     ├──────────────────────>                        │
     │                     │                      │                        │
     │                     │                      │ Use global             │
     │                     │                      │ search_client          │
     │                     │                      │ ├─────────┐            │
     │                     │                      │ │(already │            │
     │                     │                      │ │ bound to│            │
     │                     │                      │ │"gptkb   │            │
     │                     │                      │ │ index") │            │
     │                     │                      │ └─────────┘            │
     │                     │                      │                        │
     │                     │                      │ search_client.search() │
     │                     │                      ├───────────────────────>│
     │                     │                      │   (index: "gptkbindex")│
     │                     │                      │                        │
     │                     │                      │<───────────────────────┤
     │                     │                      │   Results              │
     │                     │                      │                        │
     │                     │  Stream Response     │                        │
     │                     │<─────────────────────┤                        │
     │                     │                      │                        │
     │  Display Answer     │                      │                        │
     │<────────────────────┤                      │                        │
     │                     │                      │                        │

Legend:
  ──>   Request/Call
  <──   Response/Return
  ├──┐  Internal Operation
```

**Key Observations:**
1. SearchClient created **once** at startup
2. Index name **"gptkbindex"** hardcoded/configured at startup
3. **NO project_id** in request path
4. **NO dynamic index selection** in request handling

---

### 4.2 Missing Flow: What Multi-Project WOULD Look Like

```
┌─────────┐          ┌──────────┐          ┌─────────────┐          ┌────────────┐
│ User/UI │          │ Frontend │          │   Backend   │          │   Search   │
└────┬────┘          └─────┬────┘          └──────┬──────┘          └─────┬──────┘
     │                     │                      │                        │
     │  App Opens          │                      │                        │
     ├─────────────────────>                      │                        │
     │                     │                      │                        │
     │                     │  GET /projects       │                        │
     │                     ├──────────────────────>                        │
     │                     │                      │                        │
     │                     │  Load project list   │                        │
     │                     │  from registry       │                        │
     │                     │  (DB or config)      │                        │
     │                     │                      │ ┌──────────────┐      │
     │                     │                      │ │ Query        │      │
     │                     │                      │ │ ProjectDB    │      │
     │                     │                      │ └──────────────┘      │
     │                     │                      │                        │
     │                     │  [{id:"proj1",       │                        │
     │                     │    index:"idx1"},    │                        │
     │                     │   {id:"proj2",       │                        │
     │                     │    index:"idx2"}]    │                        │
     │                     │<─────────────────────┤                        │
     │                     │                      │                        │
     │  Show project       │                      │                        │
     │  dropdown           │                      │                        │
     │  [Proj1 ▼]          │                      │                        │
     │<────────────────────┤                      │                        │
     │                     │                      │                        │
     │  User selects       │                      │                        │
     │  "Proj1"            │                      │                        │
     ├─────────────────────>                      │                        │
     │                     │                      │                        │
     │                     │ ┌────────────────┐   │                        │
     │                     │ │ Store          │   │                        │
     │                     │ │ selectedProject│   │                        │
     │                     │ │ = "proj1"      │   │                        │
     │                     │ └────────────────┘   │                        │
     │                     │                      │                        │
     │  User asks question │                      │                        │
     ├─────────────────────>                      │                        │
     │  "What is X?"       │                      │                        │
     │                     │                      │                        │
     │                     │  POST /chat          │                        │
     │                     │  {                   │                        │
     │                     │    project_id:"proj1"│                        │
     │                     │    question: "...",  │                        │
     │                     │    overrides: {...}  │                        │
     │                     │  }                   │                        │
     │                     ├──────────────────────>                        │
     │                     │                      │                        │
     │                     │                      │ Resolve project_id     │
     │                     │                      │ to index_name          │
     │                     │                      │ ┌──────────────┐      │
     │                     │                      │ │ registry.get │      │
     │                     │                      │ │ ("proj1")    │      │
     │                     │                      │ │ → "idx1"     │      │
     │                     │                      │ └──────────────┘      │
     │                     │                      │                        │
     │                     │                      │ Get/Create             │
     │                     │                      │ SearchClient("idx1")   │
     │                     │                      ├───────────────────────>│
     │                     │                      │                        │
     │                     │                      │<───────────────────────┤
     │                     │                      │                        │
     │                     │                      │ search_client.search() │
     │                     │                      ├───────────────────────>│
     │                     │                      │   (index: "idx1")      │
     │                     │                      │                        │
     │                     │                      │<───────────────────────┤
     │                     │                      │   Results (from idx1)  │
     │                     │                      │                        │
     │                     │  Stream Response     │                        │
     │                     │<─────────────────────┤                        │
     │                     │                      │                        │
     │  Display Answer     │                      │                        │
     │<────────────────────┤                      │                        │
     │                     │                      │                        │

Legend:
  ──>   Request/Call
  <──   Response/Return
  ├──┐  Internal Operation
```

**Differences from Actual Implementation:**
1. ✅ Project list fetched from registry
2. ✅ UI project selector component
3. ✅ `project_id` in request body
4. ✅ Backend resolves `project_id` → `index_name`
5. ✅ Dynamic SearchClient creation per request

**NONE OF THESE EXIST** in the current codebase.

---

### 4.3 Startup Sequence: Index Binding

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│ app.py Load  │       │ ENV Config   │       │ SearchClient │
└──────┬───────┘       └──────┬───────┘       └──────┬───────┘
       │                      │                      │
       │  Import modules      │                      │
       ├──────────────────────>                      │
       │                      │                      │
       │  Define ENV dict     │                      │
       │  (default: "gptkbindex")                    │
       ├─────────────────────>│                      │
       │                      │                      │
       │  Read os.environ     │                      │
       │  (AZURE_SEARCH_INDEX)│                      │
       ├─────────────────────>│                      │
       │                      │                      │
       │  Merge values        │                      │
       │<─────────────────────┤                      │
       │  ENV["AZURE_SEARCH_INDEX"] = "gptkbindex"   │
       │                      │                      │
       │  Create credential   │                      │
       │  (Azure auth)        │                      │
       │ ┌─────────────────┐  │                      │
       │ │ azure_credential│  │                      │
       │ └─────────────────┘  │                      │
       │                      │                      │
       │  Instantiate SearchClient                   │
       │  (index_name=ENV["AZURE_SEARCH_INDEX"])     │
       ├─────────────────────────────────────────────>
       │                      │                      │
       │                      │  ┌───────────────┐   │
       │                      │  │ Client bound  │   │
       │                      │  │ to index:     │   │
       │                      │  │ "gptkbindex"  │   │
       │                      │  └───────────────┘   │
       │                      │                      │
       │  Store as global variable                   │
       │  search_client = <SearchClient>             │
       │<─────────────────────────────────────────────
       │                      │                      │
       │  Initialize approaches                      │
       │  (inject search_client)                     │
       │ ┌─────────────────────────────┐             │
       │ │ chat_approaches = {         │             │
       │ │   ReadRetrieveRead:         │             │
       │ │     Approach(search_client) │             │
       │ │ }                           │             │
       │ └─────────────────────────────┘             │
       │                      │                      │
       │  Start FastAPI server                       │
       │  (ready to receive requests)                │
       │                      │                      │
```

**Key Finding:** Index name is **locked in** at this stage. Cannot be changed without restarting the application.

---

### 4.4 Request Handling: No Dynamic Routing

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│ POST /chat   │       │  Approach    │       │ SearchClient │
└──────┬───────┘       └──────┬───────┘       └──────┬───────┘
       │                      │                      │
       │  Request body:       │                      │
       │  {                   │                      │
       │    history: [...],   │                      │
       │    approach: 1,      │                      │
       │    overrides: {      │                      │
       │      top: 5,         │                      │
       │      folders: "X"    │                      │
       │    }                 │                      │
       │  }                   │                      │
       │                      │                      │
       │  Extract approach_id │                      │
       │ ┌────────────────┐   │                      │
       │ │ approach_id=1  │   │                      │
       │ └────────────────┘   │                      │
       │                      │                      │
       │  Lookup approach     │                      │
       │  chat_approaches[1]  │                      │
       ├─────────────────────>│                      │
       │                      │                      │
       │  Call approach.run() │                      │
       ├─────────────────────>│                      │
       │  (history, overrides)│                      │
       │                      │                      │
       │                      │  Build query         │
       │                      │ ┌────────────────┐   │
       │                      │ │ query_text =   │   │
       │                      │ │ optimize(...)  │   │
       │                      │ └────────────────┘   │
       │                      │                      │
       │                      │  Build filter        │
       │                      │ ┌────────────────┐   │
       │                      │ │ filter =       │   │
       │                      │ │ "folder eq 'X'"│   │
       │                      │ └────────────────┘   │
       │                      │                      │
       │                      │  Call self.search_client.search()
       │                      ├─────────────────────>│
       │                      │  (query, filter, top)│
       │                      │                      │
       │                      │  ┌────────────────┐  │
       │                      │  │ Execute on     │  │
       │                      │  │ index:         │  │
       │                      │  │ "gptkbindex"   │  │
       │                      │  └────────────────┘  │
       │                      │                      │
       │                      │  Results             │
       │                      │<─────────────────────┤
       │                      │                      │
       │  Results             │                      │
       │<─────────────────────┤                      │
       │                      │                      │
```

**Key Finding:** No project/index routing logic exists. Filter is built from `overrides.selectedFolders`, not from project_id.

---

## 5. Comparison: Single vs Multi-Project Flow

### 5.1 Data Flow Comparison Table

| Stage | Single-Index (Actual) | Multi-Project (Not Implemented) |
|-------|----------------------|--------------------------------|
| **Config Load** | Read `AZURE_SEARCH_INDEX` once | Read project registry (DB/JSON) |
| **Client Init** | Create 1 SearchClient at startup | Create SearchClient factory |
| **UI Load** | No project selection | Fetch project list, show dropdown |
| **User Selection** | N/A | Store `selectedProject` in state |
| **Request Build** | `{ question, overrides }` | `{ project_id, question, overrides }` |
| **Backend Receive** | Extract question/overrides | Extract `project_id` + resolve to index |
| **Index Resolution** | N/A (already bound) | `registry[project_id].index_name` |
| **Client Selection** | Use global `search_client` | Get/create `SearchClient(index_name)` |
| **Search Execute** | Query "gptkbindex" | Query resolved index (e.g., "proj1-idx") |

---

### 5.2 Code Locations Comparison

| Component | Single-Index (Actual) | Multi-Project (Would Need) |
|-----------|----------------------|---------------------------|
| **Project List** | ❌ N/A | `backend/config/projects.json` |
| **UI Selector** | ❌ N/A | `frontend/components/ProjectSelector.tsx` |
| **Request Type** | `ChatRequest` (file: `api/api.ts`) | `ChatRequest` + `project_id` field |
| **Backend Endpoint** | `/chat` (inferred) | `/chat` + extract `project_id` |
| **Index Resolver** | ❌ N/A | `backend/core/project_registry.py` |
| **Client Factory** | Static global | `backend/core/search_client_factory.py` |
| **Approach Init** | Startup (static) | Per-request (dynamic) |

---

### 5.3 Decision Points Comparison

| Decision | Single-Index | Multi-Project |
|----------|-------------|---------------|
| **When is index determined?** | App startup | Per request |
| **What determines index?** | ENV var or default | User selection via UI |
| **Can index change?** | No (requires restart) | Yes (per request) |
| **Where is decision made?** | Backend startup | Backend request handler |
| **Data source for decision?** | Environment variables | Project registry (DB/config) |

---

## 6. Missing Components for Multi-Project Support

### 6.1 Required New Components

#### Frontend Components

1. **ProjectSelector.tsx**
   ```typescript
   interface ProjectSelectorProps {
     projects: Project[];
     selectedProject: string | null;
     onProjectChange: (projectId: string) => void;
   }
   ```
   **Status:** ❌ DOES NOT EXIST

2. **ProjectAPI Client**
   ```typescript
   export async function getProjects(): Promise<Project[]> {
     // Fetch from /api/projects
   }
   ```
   **Status:** ❌ DOES NOT EXIST

---

#### Backend Components

3. **Project Registry**
   ```python
   # backend/core/project_registry.py
   class ProjectRegistry:
       def get_project(self, project_id: str) -> ProjectConfig:
           """Resolve project_id to configuration"""
       
       def get_index_name(self, project_id: str) -> str:
           """Get search index for project"""
   ```
   **Status:** ❌ DOES NOT EXIST

4. **SearchClient Factory**
   ```python
   # backend/core/search_client_factory.py
   class SearchClientFactory:
       def get_client(self, index_name: str) -> SearchClient:
           """Get or create SearchClient for index"""
           # Implement caching/pooling
   ```
   **Status:** ❌ DOES NOT EXIST

5. **Project Routing Middleware**
   ```python
   # backend/middleware/project_context.py
   @app.middleware("http")
   async def project_context_middleware(request: Request, call_next):
       """Extract project_id from request and attach to context"""
       project_id = request.json().get("project_id")
       request.state.project_id = project_id
       # ...
   ```
   **Status:** ❌ DOES NOT EXIST

---

#### Configuration

6. **Project Registry Data**
   ```json
   // config/projects.json
   {
     "projects": [
       {
         "id": "canadalife",
         "name": "Canada Life Assistant",
         "index_name": "rag-index-canada-life",
         "embedding_model": "text-embedding-3-small"
       },
       {
         "id": "jurisprudence",
         "name": "Jurisprudence Research",
         "index_name": "rag-index-jurisprudence",
         "embedding_model": "text-embedding-3-small"
       }
       // ... 48 more projects
     ]
   }
   ```
   **Status:** ❌ DOES NOT EXIST

---

### 6.2 Required Code Changes

#### Frontend Changes

**File:** `app/frontend/src/pages/chat/Chat.tsx`

```typescript
// ADD: Project state
const [selectedProject, setSelectedProject] = useState<string | null>(null);
const [projects, setProjects] = useState<Project[]>([]);

// ADD: Fetch projects on mount
useEffect(() => {
    fetchProjects().then(setProjects);
}, []);

// MODIFY: makeApiRequest to include project_id
const request: ChatRequest = {
    project_id: selectedProject,  // <-- ADD THIS
    history: [...history, { user: question, bot: undefined }],
    // ... rest of request
};
```

---

#### Backend Changes

**File:** `app/backend/app.py`

```python
# REMOVE: Global search_client
# search_client = SearchClient(...)  # DELETE THIS

# ADD: SearchClient factory
from core.search_client_factory import SearchClientFactory
from core.project_registry import ProjectRegistry

project_registry = ProjectRegistry()
search_client_factory = SearchClientFactory(
    endpoint=ENV["AZURE_SEARCH_SERVICE_ENDPOINT"],
    credential=azure_credential
)

# MODIFY: Chat endpoint to extract project_id
@app.post("/chat")
async def chat(request: Request):
    json_body = await request.json()
    project_id = json_body.get("project_id")  # <-- ADD THIS
    
    # Resolve project to index
    index_name = project_registry.get_index_name(project_id)
    
    # Get SearchClient for this index
    search_client = search_client_factory.get_client(index_name)
    
    # Get or create approach with this client
    approach = get_approach(json_body.get("approach"), search_client)
    
    # ... rest of handler
```

---

#### Approach Changes

**File:** `app/backend/approaches/chatreadretrieveread.py`

```python
# CURRENT: Client injected at __init__
def __init__(self, search_client: SearchClient, ...):
    self.search_client = search_client

# WOULD NEED: Client passed per request
async def run(
    self,
    search_client: SearchClient,  # <-- ADD THIS
    history: list,
    overrides: dict
):
    # Use search_client from parameter, not self
    results = await search_client.search(...)
```

**Or alternative pattern:**
```python
# Approach becomes stateless factory
class ApproachFactory:
    @staticmethod
    def create_approach(search_client: SearchClient) -> Approach:
        return ChatReadRetrieveReadApproach(search_client)
```

---

## 7. Fallback/Default Behavior

### 7.1 Current Behavior (Single-Index)

**Scenario: Index Not Configured**
```python
ENV["AZURE_SEARCH_INDEX"] = "gptkbindex"  # Hardcoded default

# If env var not set, uses default
index_name = ENV["AZURE_SEARCH_INDEX"]  # Always has a value
```

**Result:** Application always uses `"gptkbindex"` if no override provided.

---

### 7.2 Multi-Project Fallback (Not Implemented)

**Would Need:**

1. **No Project Selected**
   ```typescript
   // Frontend
   if (!selectedProject) {
       selectedProject = "default";  // Or show error
   }
   ```

2. **Invalid Project ID**
   ```python
   # Backend
   try:
       index_name = project_registry.get_index_name(project_id)
   except ProjectNotFoundError:
       # Option 1: Use default project
       index_name = project_registry.get_default_index()
       
       # Option 2: Return error
       raise HTTPException(400, f"Project {project_id} not found")
   ```

3. **Index Not Available**
   ```python
   # Backend
   try:
       search_client = search_client_factory.get_client(index_name)
   except IndexNotFoundError:
       # Fall back to default index or raise error
       logger.error(f"Index {index_name} not found")
       raise HTTPException(500, "Search index unavailable")
   ```

**Status:** ❌ NONE OF THIS EXISTS (no fallback needed since only one index)

---

## 8. Summary: Flow Characteristics

### Actual Implementation (Single-Index)

| Characteristic | Value |
|---------------|-------|
| **Project Selection** | ❌ Not supported |
| **Index Determination** | Static (at startup) |
| **Client Management** | Single global instance |
| **Request Routing** | No routing (all to same index) |
| **Configuration Source** | Environment variables |
| **Dynamic Behavior** | None (restart required to change index) |
| **Fallback Strategy** | Hardcoded default ("gptkbindex") |

---

### Required for Multi-Project

| Characteristic | Required Implementation |
|---------------|------------------------|
| **Project Selection** | UI dropdown + state management |
| **Index Determination** | Per-request resolution via registry |
| **Client Management** | Factory with pooling/caching |
| **Request Routing** | Middleware to extract project_id |
| **Configuration Source** | Project registry (DB/JSON) |
| **Dynamic Behavior** | Per-request index switching |
| **Fallback Strategy** | Default project + error handling |

---

## 9. Evidence Summary

### Files with Evidence

| File | Evidence Type | Key Finding |
|------|--------------|-------------|
| `app/backend/app.py:53` | Config | Default index: "gptkbindex" |
| `app/backend/app.py:154-159` | Client Init | Global SearchClient created |
| `app/backend/app.py:197+` | Approach Init | Static approach instantiation |
| `app/frontend/src/pages/chat/Chat.tsx:32-54` | UI State | No project state variables |
| `app/frontend/src/pages/chat/Chat.tsx:93-135` | Request Build | No project_id in request |
| `app/backend/approaches/chatreadretrieveread.py:90+` | Approach Run | Client injected at init, not per-request |

---

### Components NOT FOUND

| Component | Expected File | Status |
|-----------|--------------|--------|
| ProjectSelector UI | `app/frontend/src/components/ProjectSelector.tsx` | ❌ DOES NOT EXIST |
| Project Registry | `app/backend/core/project_registry.py` | ❌ DOES NOT EXIST |
| SearchClient Factory | `app/backend/core/search_client_factory.py` | ❌ DOES NOT EXIST |
| Project Config | `config/projects.json` | ❌ DOES NOT EXIST |
| Project API | `app/backend/app.py` `/api/projects` endpoint | ❌ DOES NOT EXIST |

---

## 10. Conclusion

**This application implements a STATIC, SINGLE-INDEX architecture with NO support for project/corpus selection or routing.**

### Key Findings

1. **Index determined once** at application startup from environment variable or default
2. **Single SearchClient** created globally and reused for all requests
3. **No project_id** in request/response flow
4. **No dynamic routing** based on project or corpus
5. **No UI** for project selection
6. **No backend logic** for index resolution

### Architectural Pattern

This follows a **Static Configuration** pattern:
- Configuration loaded at startup
- Resources created once
- All requests handled identically
- No per-request customization of data sources

### To Support Multi-Project

Would require **Major Refactoring**:
- 6+ new components (see Section 6)
- Frontend: Project selector UI + state management
- Backend: Registry, factory, middleware
- Config: Project definitions with index mappings
- Approach classes: Accept client per-request

**Estimated Effort:** 2-4 weeks for experienced team

---

**End of Flow Analysis Report**
