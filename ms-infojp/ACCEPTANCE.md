# MS-InfoJP Acceptance Criteria

**Project**: MS-InfoJP - Jurisprudence AI Assistant MVP  
**Date**: January 24, 2026  
**Status**: Baseline - Automated Testing Framework  
**Source**: Derived from README.md "Success Criteria (Testable)"

---

## Overview

This document defines the testable success criteria for MS-InfoJP MVP and provides the automated testing framework to validate each criterion. All criteria must pass before considering the MVP complete.

**Testing Approach**: Self-validating project with automated test generation from acceptance criteria.

---

## Functional Criteria

### AC-001: User Authentication

**Criterion**: User can sign in via Entra ID

**Test Method**: Automated  
**Test Location**: `tests/acceptance/test_authentication.py`

**Test Implementation**:
```python
async def test_ac_001_user_authentication():
    """AC-001: User can sign in via Entra ID"""
    # Test Entra ID OAuth 2.0 PKCE flow
    auth_response = await attempt_entra_id_login(test_user_credentials)
    
    assert auth_response.status_code == 200, "[FAIL] Authentication request failed"
    assert "access_token" in auth_response.json(), "[FAIL] No access token returned"
    assert auth_response.json()["token_type"] == "Bearer", "[FAIL] Invalid token type"
    
    print("[PASS] AC-001: User authentication via Entra ID successful")
```

**Evidence Required**:
- Authentication flow logs
- Token validation results
- Session establishment confirmation

**Status**: ⏸️ Pending Implementation

---

### AC-002: Query Submission and Response Time

**Criterion**: User can submit a jurisprudence question and receive an answer within 30 seconds

**Test Method**: Automated  
**Test Location**: `tests/acceptance/test_query_response.py`

**Test Implementation**:
```python
async def test_ac_002_query_submission_30s():
    """AC-002: Query response within 30 seconds"""
    test_query = "What are the conditions for EI eligibility?"
    
    start_time = time.time()
    response = await submit_query_to_backend(test_query)
    response_time = time.time() - start_time
    
    assert response.status_code == 200, "[FAIL] Query submission failed"
    assert response_time < 30.0, f"[FAIL] Response time {response_time:.1f}s exceeds 30s limit"
    assert len(response.json()["answer"]) > 0, "[FAIL] Empty answer returned"
    
    print(f"[PASS] AC-002: Query answered in {response_time:.1f}s (< 30s)")
```

**Evidence Required**:
- Query submission timestamp
- Response receipt timestamp
- Response time measurement
- Answer content validation

**Status**: ⏸️ Pending Implementation

---

### AC-003: Citation Quality

**Criterion**: 90% of answers include at least one case citation with a valid link

**Test Method**: Automated  
**Test Location**: `tests/acceptance/test_citation_quality.py`

**Test Implementation**:
```python
async def test_ac_003_citation_quality_90_percent():
    """AC-003: 90% of answers include valid citations"""
    test_queries = load_test_queries("tests/test_data/ei_queries.json")
    
    total_queries = len(test_queries)
    queries_with_citations = 0
    citation_pattern = r'\d{4}\s+[A-Z]{2,5}\s+\d+'  # e.g., "2024 FC 679"
    
    for query in test_queries:
        response = await submit_query_to_backend(query)
        answer = response.json()["answer"]
        
        citations = re.findall(citation_pattern, answer)
        has_valid_link = any("[Link:" in answer or "http" in answer)
        
        if citations and has_valid_link:
            queries_with_citations += 1
    
    citation_rate = (queries_with_citations / total_queries) * 100
    
    assert citation_rate >= 90.0, f"[FAIL] Citation rate {citation_rate:.1f}% < 90%"
    print(f"[PASS] AC-003: Citation quality {citation_rate:.1f}% (>= 90%)")
```

**Evidence Required**:
- Test query dataset (minimum 20 queries)
- Citation extraction results per query
- Link validation results
- Aggregated citation rate

**Status**: ⏸️ Pending Implementation

---

### AC-004: Source Access

**Criterion**: User can click on a citation and access the full case document

**Test Method**: Automated  
**Test Location**: `tests/acceptance/test_source_access.py`

**Test Implementation**:
```python
async def test_ac_004_source_access():
    """AC-004: Clickable citations lead to source documents"""
    test_query = "What are the conditions for EI eligibility?"
    response = await submit_query_to_backend(test_query)
    answer = response.json()["answer"]
    
    # Extract citation links from answer
    link_pattern = r'\[([^\]]+)\]\(([^)]+)\)'
    links = re.findall(link_pattern, answer)
    
    assert len(links) > 0, "[FAIL] No citation links found in answer"
    
    # Validate each link
    for link_text, link_url in links:
        print(f"[INFO] Validating link: {link_text} -> {link_url}")
        
        link_response = await http_get(link_url)
        assert link_response.status_code == 200, f"[FAIL] Link unreachable: {link_url}"
        
        # Verify document content
        content_type = link_response.headers.get("Content-Type", "")
        assert "pdf" in content_type or "html" in content_type, "[FAIL] Invalid document type"
    
    print(f"[PASS] AC-004: All {len(links)} citation links validated")
```

**Evidence Required**:
- Extracted citation links
- HTTP response codes for each link
- Content type validation
- Document accessibility confirmation

**Status**: ⏸️ Pending Implementation

---

### AC-005: Chat History Persistence

**Criterion**: User's chat session persists for the duration of the browser session

**Test Method**: Automated  
**Test Location**: `tests/acceptance/test_chat_history.py`

**Test Implementation**:
```python
async def test_ac_005_chat_history_persistence():
    """AC-005: Chat history persists during browser session"""
    # Create new session
    session_id = await create_new_session()
    
    # Submit multiple queries
    queries = ["Query 1", "Query 2", "Query 3"]
    for query in queries:
        await submit_query_to_backend(query, session_id=session_id)
    
    # Retrieve session history
    history = await get_session_history(session_id)
    
    assert len(history) == len(queries), "[FAIL] Incomplete chat history"
    assert all(q in str(history) for q in queries), "[FAIL] Missing queries in history"
    
    print(f"[PASS] AC-005: Chat history with {len(queries)} messages persisted")
```

**Evidence Required**:
- Session creation confirmation
- Query submission logs
- Retrieved history content
- History completeness validation

**Status**: ⏸️ Pending Implementation

---

### AC-006: CanLII Ingestion

**Criterion**: CanLII CDC process successfully ingests at least 100 EI-related cases

**Test Method**: Semi-Automated  
**Test Location**: `tests/acceptance/test_canlii_ingestion.py`

**Test Implementation**:
```python
async def test_ac_006_canlii_ingestion_100_cases():
    """AC-006: Ingest 100+ EI cases via CanLII CDC"""
    # Run CDC pipeline
    cdc_result = await run_canlii_cdc_pipeline(topics=["employment_insurance"])
    
    ingested_cases = cdc_result["ingested_count"]
    
    assert ingested_cases >= 100, f"[FAIL] Only {ingested_cases} cases ingested (< 100)"
    
    # Validate indexed cases in Azure Search
    indexed_count = await count_indexed_cases_in_search()
    assert indexed_count >= 100, f"[FAIL] Only {indexed_count} cases indexed"
    
    print(f"[PASS] AC-006: {ingested_cases} cases ingested and {indexed_count} indexed")
```

**Evidence Required**:
- CDC pipeline execution logs
- Case download confirmations
- Azure Search index count
- Sample indexed document verification

**Status**: ⏸️ Pending Implementation

---

### AC-007: Deterministic Re-runs

**Criterion**: Re-ingestion of the same document produces identical indexed content

**Test Method**: Automated  
**Test Location**: `tests/acceptance/test_deterministic_ingestion.py`

**Test Implementation**:
```python
async def test_ac_007_deterministic_reingestion():
    """AC-007: Deterministic re-runs produce identical results"""
    test_document_id = "test_case_2024_FC_001"
    
    # First ingestion
    result_1 = await ingest_document(test_document_id)
    indexed_content_1 = await get_indexed_document(test_document_id)
    
    # Delete and re-ingest
    await delete_indexed_document(test_document_id)
    result_2 = await ingest_document(test_document_id)
    indexed_content_2 = await get_indexed_document(test_document_id)
    
    # Compare indexed content
    assert indexed_content_1 == indexed_content_2, "[FAIL] Non-deterministic ingestion"
    
    print("[PASS] AC-007: Deterministic re-ingestion validated")
```

**Evidence Required**:
- First ingestion output hash
- Second ingestion output hash
- Hash comparison result
- Content diff (should be empty)

**Status**: ⏸️ Pending Implementation

---

## UX Criteria

### AC-008: Processing State Indicators

**Criterion**: User sees visual feedback during answer generation

**Test Method**: Manual with Evidence  
**Test Location**: `tests/acceptance/test_processing_state.md`

**Test Procedure**:
1. Submit query to frontend
2. Observe UI during answer generation
3. Capture screenshots of each state indicator
4. Verify all expected states appear

**Expected States**:
- "Thinking..." (initial phase)
- "Search Agent Federal Court of Appeals" (search phase)
- "Document analysis..." (analysis phase)
- "Summary Agent" (summary phase)
- Final formatted response

**Evidence Required**:
- Screenshots of each processing state
- Timestamp log showing state transitions
- Video recording of full query-to-answer flow

**Status**: ⏸️ Pending Implementation

---

### AC-009: Citation Clarity

**Criterion**: Citations are clearly distinguishable from answer text (e.g., bold, hyperlinked)

**Test Method**: Manual with Evidence  
**Test Location**: `tests/acceptance/test_citation_clarity.md`

**Test Procedure**:
1. Submit query and receive answer with citations
2. Inspect citation formatting
3. Verify citations are visually distinct
4. Test hyperlink functionality

**Expected Formatting**:
- Citations in bold or distinct color
- Hyperlinked to source documents
- Clearly separated from answer text

**Evidence Required**:
- Screenshot of formatted answer
- HTML/CSS inspection of citation styling
- Link click validation

**Status**: ⏸️ Pending Implementation

---

### AC-010: One-Click Navigation

**Criterion**: User can navigate from answer to source document in one click

**Test Method**: Manual with Evidence  
**Test Location**: `tests/acceptance/test_navigation.md`

**Test Procedure**:
1. Submit query and receive answer with citations
2. Click on citation link
3. Measure clicks and navigation steps
4. Verify source document opens

**Expected Behavior**:
- Single click on citation opens source document
- No intermediate pages or pop-ups
- Document opens in new tab/window

**Evidence Required**:
- Video recording of click-to-document flow
- Click count validation (must be 1)
- Document accessibility confirmation

**Status**: ⏸️ Pending Implementation

---

## Non-Functional Criteria

### AC-011: Response Time Performance

**Criterion**: 90% of queries return answers within 30 seconds

**Test Method**: Automated  
**Test Location**: `tests/acceptance/test_performance.py`

**Test Implementation**:
```python
async def test_ac_011_performance_90_percent_under_30s():
    """AC-011: 90% of queries under 30s response time"""
    test_queries = load_test_queries("tests/test_data/ei_queries.json")
    
    response_times = []
    for query in test_queries:
        start_time = time.time()
        await submit_query_to_backend(query)
        response_time = time.time() - start_time
        response_times.append(response_time)
    
    under_30s_count = sum(1 for t in response_times if t < 30.0)
    performance_rate = (under_30s_count / len(response_times)) * 100
    
    assert performance_rate >= 90.0, f"[FAIL] Only {performance_rate:.1f}% under 30s"
    
    print(f"[PASS] AC-011: {performance_rate:.1f}% of queries under 30s")
    print(f"[INFO] Mean: {statistics.mean(response_times):.1f}s, P95: {statistics.quantiles(response_times, n=20)[18]:.1f}s")
```

**Evidence Required**:
- Response time distribution
- P50, P95, P99 percentiles
- Performance report with graphs

**Status**: ⏸️ Pending Implementation

---

### AC-012: System Availability

**Criterion**: System uptime of 95% during test period

**Test Method**: Automated Monitoring  
**Test Location**: `tests/acceptance/test_availability.py`

**Test Implementation**:
```python
async def test_ac_012_availability_95_percent():
    """AC-012: 95% uptime during test period"""
    # Monitor health endpoint every 5 minutes for test period
    test_duration_hours = 24  # 24-hour test period
    check_interval_seconds = 300  # 5 minutes
    
    total_checks = (test_duration_hours * 3600) // check_interval_seconds
    successful_checks = 0
    
    for i in range(total_checks):
        try:
            health_response = await http_get(f"{backend_url}/health")
            if health_response.status_code == 200:
                successful_checks += 1
        except Exception as e:
            print(f"[WARN] Health check {i+1} failed: {e}")
        
        await asyncio.sleep(check_interval_seconds)
    
    uptime_rate = (successful_checks / total_checks) * 100
    
    assert uptime_rate >= 95.0, f"[FAIL] Uptime {uptime_rate:.1f}% < 95%"
    
    print(f"[PASS] AC-012: System uptime {uptime_rate:.1f}% over {test_duration_hours}h")
```

**Evidence Required**:
- Health check log with timestamps
- Downtime incidents report
- Uptime percentage calculation

**Status**: ⏸️ Pending Implementation

---

### AC-013: Security - Authenticated Access Only

**Criterion**: All API endpoints require authentication; no unauthenticated access

**Test Method**: Automated  
**Test Location**: `tests/acceptance/test_security.py`

**Test Implementation**:
```python
async def test_ac_013_authentication_required():
    """AC-013: No unauthenticated access to API endpoints"""
    endpoints = [
        "/ask",
        "/chat",
        "/upload",
        "/documents",
        "/sessions"
    ]
    
    for endpoint in endpoints:
        # Attempt access without auth token
        response = await http_get(f"{backend_url}{endpoint}")
        
        assert response.status_code in [401, 403], \
            f"[FAIL] Endpoint {endpoint} accessible without auth (status: {response.status_code})"
    
    print(f"[PASS] AC-013: All {len(endpoints)} endpoints require authentication")
```

**Evidence Required**:
- Unauthenticated request attempts
- HTTP 401/403 response confirmations
- Security audit report

**Status**: ⏸️ Pending Implementation

---

## Automated Test Execution

### Running All Acceptance Tests

```bash
# Windows (encoding-safe)
set PYTHONIOENCODING=utf-8
python -m pytest tests/acceptance/ -v --tb=short

# Generate evidence report
python tests/acceptance/generate_evidence_report.py
```

### Test Execution Order

1. **Prerequisites**: AC-001 (Authentication)
2. **Core Functionality**: AC-002, AC-003, AC-004, AC-005
3. **Data Pipeline**: AC-006, AC-007
4. **UX Validation**: AC-008, AC-009, AC-010
5. **Non-Functional**: AC-011, AC-012, AC-013

### Evidence Collection

All test runs MUST generate:
- Timestamped test execution logs in `logs/`
- Debug artifacts (screenshots, HTML, traces) in `debug/`
- Structured evidence reports in `evidence/`
- Final acceptance report: `evidence/ACCEPTANCE-VALIDATION-{timestamp}.md`

---

## Definition of Done

MS-InfoJP MVP is considered **DONE** when:

- [ ] All 13 acceptance criteria pass
- [ ] Evidence collected for each criterion
- [ ] No blocking defects remain
- [ ] Documentation complete (README, this file, Architecture)
- [ ] Handoff to stakeholders scheduled

---

## Status Summary

| Criterion | Type | Test Method | Status | Evidence |
|-----------|------|-------------|--------|----------|
| AC-001 | Functional | Automated | ⏸️ Pending | - |
| AC-002 | Functional | Automated | ⏸️ Pending | - |
| AC-003 | Functional | Automated | ⏸️ Pending | - |
| AC-004 | Functional | Automated | ⏸️ Pending | - |
| AC-005 | Functional | Automated | ⏸️ Pending | - |
| AC-006 | Functional | Semi-Automated | ⏸️ Pending | - |
| AC-007 | Functional | Automated | ⏸️ Pending | - |
| AC-008 | UX | Manual + Evidence | ⏸️ Pending | - |
| AC-009 | UX | Manual + Evidence | ⏸️ Pending | - |
| AC-010 | UX | Manual + Evidence | ⏸️ Pending | - |
| AC-011 | Non-Functional | Automated | ⏸️ Pending | - |
| AC-012 | Non-Functional | Automated Monitoring | ⏸️ Pending | - |
| AC-013 | Security | Automated | ⏸️ Pending | - |

**Overall Status**: 0/13 Complete (0%)

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-24 | Initial acceptance criteria baseline created from README success criteria | MS-InfoJP Team |
