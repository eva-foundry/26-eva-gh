# MS-InfoJP Test Data

**Purpose**: Sample data for acceptance testing MS-InfoJP Jurisprudence RAG Assistant  
**Version**: 1.0  
**Last Updated**: 2026-01-24

---

## Contents

### 1. EI Queries (`ei_queries.json`)
- **Description**: 20 sample Employment Insurance jurisprudence queries covering 20 different categories
- **Structure**: Each query includes:
  - `id`: Unique identifier (query-001 to query-020)
  - `category`: EI topic domain (voluntary_leaving, misconduct, availability, etc.)
  - `query`: Natural language question
  - `expected_citations`: List of exemplary case citations
  - `expected_topics`: Keywords expected in response
  - `complexity`: low/medium/high (guides timeout configuration)
  - `expected_response_elements`: Key concepts that should appear
- **Usage**: 
  - AC-002 (response time <30s validation)
  - AC-003 (citation quality >=90% check)
  - AC-012 (search recall >=85% verification)
- **Categories Covered**:
  - Voluntary Leaving (just cause, reasonable alternative)
  - Misconduct (willful conduct, disqualification)
  - Availability (labor market attachment, restrictions)
  - Hours of Work (insurable hours calculation)
  - Earnings Allocation (benefit calculation)
  - Refusal of Work (suitable employment, good cause)
  - Training Course (approval, availability impact)
  - Self-Employment (minor vs major, availability)
  - Family Reasons (just cause analysis)
  - Antedate (good cause for delay)
  - Labour Dispute (disqualification, exceptions)
  - Seasonal Work (benefit calculation, variable requirements)
  - Benefit Period (duration, extensions)
  - Penalty/Violation (false statements, consequences)
  - Appeal Process (reconsideration, SST procedure)
  - Working While on Claim (earnings deduction)
  - Constructive Dismissal (substantial change, voluntary leaving)
  - Waiting Period (duration, exceptions)
  - Medical Reasons (just cause, accommodation)
  - Separation Payment (severance, allocation)

### 2. Expected Citations (`expected_citations.json`)
- **Description**: Citation format validation patterns and rules for Canadian case law
- **Structure**:
  - `citation_patterns`: Regex patterns for each court (FC, FCA, SST, SCC, CanLII, CUB, BOR)
  - `valid_courts_for_ei`: List of acceptable court abbreviations
  - `citation_quality_thresholds`: AC-003 targets (minimum 1 citation, 90% rate)
  - `citation_validation_rules`: Format and content checks
  - `extraction_regex`: Comprehensive pattern for citation extraction
  - `test_cases`: Sample inputs with expected outputs
  - `canlii_url_patterns`: URL construction for CanLII links
  - `usage_in_tests`: Instructions for AC-003 and AC-012
- **Supported Citation Formats**:
  - **Federal Court (FC)**: `2024 FC 679`
  - **Federal Court of Appeal (FCA)**: `2011 FCA 190`
  - **Social Security Tribunal (SST)**: `2021 SST 188` (created 2013, replaced UMPIRE)
  - **Supreme Court of Canada (SCC)**: `2015 SCC 42`
  - **CanLII Legacy**: `1995 CanLII 3547` (older cases)
  - **UMPIRE (CUB)**: `CUB 68452` (pre-2013 EI appeals)
  - **Board of Referees (BOR)**: `BOR 12345` (pre-2013 first-level appeals)
- **Usage**:
  - AC-003: Extract citations, validate format, calculate citation rate
  - AC-012: Compare extracted citations against expected_citations in queries
  - Citation enforcer component: Validate GPT responses

### 3. Sample Case Documents (`sample_case_documents/`)
- **Purpose**: Real or synthetic case law documents for pipeline testing
- **Status**: To be added
- **Planned Contents**:
  - PDF format: Federal Court decisions
  - HTML format: CanLII case pages
  - Metadata JSON: Case details (title, citation, date, court, summary)
- **Usage**:
  - AC-006: CanLII ingestion testing (validate 100+ EI cases)
  - AC-007: Document upload testing (PDF/HTML processing)
  - Text enrichment pipeline testing (chunking, embedding)

---

## Test Data Usage by Acceptance Criteria

| AC | Test File | Test Data Used |
|----|-----------|----------------|
| AC-001 | `test_authentication.py` | (No test data - validates Entra ID flow) |
| AC-002 | `test_response_time.py` | `ei_queries.json` (all 20 queries, complexity-based timeouts) |
| AC-003 | `test_citation_quality.py` | `ei_queries.json` + `expected_citations.json` (extract, validate, rate) |
| AC-004 | `test_multi_turn.py` | `ei_queries.json` (select 5 queries, create multi-turn conversations) |
| AC-005 | `test_bilingual.py` | (Generate French translations of `ei_queries.json` subset) |
| AC-006 | `test_canlii_ingestion.py` | `sample_case_documents/` (validate 100+ EI cases ingested) |
| AC-007 | `test_document_upload.py` | `sample_case_documents/*.pdf`, `sample_case_documents/*.html` |
| AC-008 | `test_session_persistence.py` | `ei_queries.json` (create session, query, reload, verify) |
| AC-009 | `test_access_control.py` | (No test data - validates RBAC with mock users) |
| AC-010 | `test_audit_logging.py` | `ei_queries.json` (query, verify logs in Cosmos DB) |
| AC-011 | `test_performance.py` | `ei_queries.json` (100 iterations, 90% <30s target) |
| AC-012 | `test_search_recall.py` | `ei_queries.json` + `expected_citations.json` (recall >=85%) |
| AC-013 | `test_error_handling.py` | (Generate edge cases: malformed queries, missing data) |

---

## Test Data Maintenance

### Adding New Queries
1. Add entry to `ei_queries.json` with unique `id` (query-XXX)
2. Specify `category`, `query`, `expected_citations`, `expected_topics`, `complexity`
3. Update `test_metadata.total_queries` and `categories` list
4. Add corresponding citation patterns to `expected_citations.json` if new court

### Adding Sample Documents
1. Obtain real case documents from CanLII (respecting terms of use)
2. OR generate synthetic documents with representative structure
3. Place in `sample_case_documents/` with naming: `{year}_{court}_{number}.{pdf|html}`
4. Create metadata JSON: `{year}_{court}_{number}_metadata.json`

### Updating Citation Patterns
1. Edit `expected_citations.json` → `citation_patterns`
2. Add regex pattern, description, example, validation rules
3. Update `valid_courts_for_ei` list if new court
4. Add test case to `test_cases` array

---

## Data Quality Standards

**Queries (ei_queries.json)**:
- ✅ Natural language (avoid legal jargon)
- ✅ Representative of user questions (based on actual EI inquiries)
- ✅ Cover all major EI jurisprudence topics
- ✅ Include complexity distribution (low/medium/high)
- ✅ Expected citations from real Federal Court/FCA/SST cases

**Citations (expected_citations.json)**:
- ✅ Regex patterns tested against sample citations
- ✅ Year ranges validated (e.g., SST post-2013)
- ✅ Court abbreviations follow CanLII standards
- ✅ URL patterns verified with actual CanLII links

**Sample Documents (sample_case_documents/)**:
- ✅ Representative structure (heading, facts, analysis, decision)
- ✅ Real or realistic citations and legal reasoning
- ✅ Metadata matches document content
- ✅ Both PDF and HTML formats for pipeline testing

---

## Evidence Collection

When running tests with this data:
- **Save query responses**: `evidence/query_response_{query_id}_{timestamp}.json`
- **Save citation extractions**: `evidence/citations_extracted_{query_id}_{timestamp}.json`
- **Save performance metrics**: `evidence/performance_{test_name}_{timestamp}.json`
- **Save recall analysis**: `evidence/recall_analysis_{query_id}_{timestamp}.json`

---

## References

- **CanLII**: https://www.canlii.org/en/ca/ (Federal Court, FCA, SST decisions)
- **Federal Court**: https://decisions.fct-cf.gc.ca/ (official source)
- **SST Decisions**: https://www.canada.ca/en/sst/decisions.html (Social Security Tribunal)
- **EI Act**: https://laws-lois.justice.gc.ca/eng/acts/e-5.6/ (Employment Insurance Act)

---

## Future Enhancements

- [ ] Add French language queries (for AC-005 bilingual testing)
- [ ] Add sample case documents (PDF/HTML) with metadata
- [ ] Add edge case queries (malformed, ambiguous, out-of-scope)
- [ ] Add expected_response JSON schema for automated validation
- [ ] Add synthetic case law generator script
- [ ] Add CanLII CDC mock data (for AC-006 ingestion testing)
