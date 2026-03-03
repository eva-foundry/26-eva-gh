# MS-InfoJP CDC Implementation - Getting Started

**Date**: 2026-01-26  
**Status**: Ready to begin Phase 1 implementation  
**Documentation**: Complete (9 documents, ~5300 lines)  
**Update**: Integrated freshness-aware RAG architecture from preventing-stale-data.md

---

## ✅ Documentation Complete

All CDC design and specification documents are complete:

1. **[cdc/CDC-INDEX.md](cdc/CDC-INDEX.md)** - Navigation hub (needs to be created/moved)
2. **[cdc/cdc-mvp-design.md](cdc/cdc-mvp-design.md)** - Architecture & principles (needs to be created/moved)
3. **[cdc/cdc-mvp-artifacts.md](cdc-mvp-artifacts.md)** - Deliverables & acceptance criteria (exists, needs to be moved)
4. **[cdc/change-policy.yaml](cdc/change-policy.yaml)** - Classification rules ✅
5. **[cdc/acceptance-tests.md](cdc/acceptance-tests.md)** - 26 test specifications ✅
6. **[cdc/minimal-schema-ddl.md](cdc/minimal-schema-ddl.md)** - 11-table schema ✅
7. **[cdc/downstream-invalidation-contract.md](cdc/downstream-invalidation-contract.md)** - RAG pipeline contract ✅
8. **[cdc/operations-admin-control-plane.md](cdc/operations-admin-control-plane.md)** - Phase 2+ UI ✅
9. **[cdc/preventing-stale-data.md](cdc/preventing-stale-data.md)** - Freshness-aware RAG architecture ✅ **NEW**

**[README.md](README.md)** updated with all new cdc/ paths ✅

---

## 🎯 Architecture Integration: CDC + Freshness-Aware RAG

### Two-Plane Architecture

**Data Plane** (does the work):
1. **Change Detection** → Scheduled + event-driven polling
2. **CDC Evidence** → Case registry, artifact index, change events
3. **Downstream Processing** → Extract, chunk, embed, index (delta only)
4. **Freshness-Aware Retrieval** → Recency-boosted search with citations including `source_last_modified`

**Control Plane** (keeps it running):
1. **Corpus Registry** → Multi-corpus management and SLO tiers
2. **CDC Operations Dashboard** → Run status, freshness lag, backlog monitoring
3. **Policy Management** → Change classification, scope definitions, SLO enforcement
4. **Client Reporting** → What changed, why, freshness guarantees

---

## 🚀 Implementation Priority Order

### Phase 1 - Week 1: Foundation (CDC Policy & Schema)

#### Task 1.1: Complete File Reorganization
**Priority**: P0 (prerequisite)  
**Time**: 30 minutes  

**Actions**:
```powershell
cd "i:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP"

# Move remaining file
Move-Item "cdc-mvp-artifacts.md" "cdc\cdc-mvp-artifacts.md"

# Verify structure
Get-ChildItem cdc\ | Select-Object Name
```

**Expected result**: All CDC docs in `cdc/` folder, README links all working

---

#### Task 1.2: Create Remaining Policy Files
**Priority**: P0  
**Time**: 4-6 hours  
**Reference**: [cdc/cdc-mvp-artifacts.md#1-cdc-policy-pack](cdc-mvp-artifacts.md#1-cdc-policy-pack)

**Files to create**:
1. `cdc/scope.yaml` - Scope definitions and validation rules
2. `cdc/immutability.yaml` - Polling frequency by source type (immutable vs mutable)
3. `cdc/language-policy.yaml` - EN/FR handling, bilingual splitting rules

**Template for scope.yaml**:
```yaml
# cdc/scope.yaml
version: "1.0.0"
owner: "CDC Team"
last_updated: "2026-01-26"

scopes:
  - scope_id: "SST-GD-EN-rolling-24mo"
    description: "Social Security Tribunal - General Division, English, last 24 months"
    tribunal_id: "SST-GD"
    language: "EN"
    time_window:
      type: "rolling"
      months: 24
    polling_cadence: "daily"  # mutable tribunal decisions
    slo_tier: 2  # <24 hour freshness SLO
    event_driven: false  # scheduled only for now
    
  - scope_id: "SST-AD-FR-2020-2023"
    description: "SST Appeals Division, French, 2020-2023 fixed range"
    tribunal_id: "SST-AD"
    language: "FR"
    time_window:
      type: "fixed"
      start_date: "2020-01-01"
      end_date: "2023-12-31"
    polling_cadence: "daily"
    slo_tier: 2
    event_driven: false
    
  - scope_id: "FCA-BI-ALL-2010-2015"
    description: "Federal Court of Appeal, Bilingual, 2010-2015"
    tribunal_id: "FCA"
    language: "BI"  # Both EN and FR
    time_window:
      type: "fixed"
      start_date: "2010-01-01"
      end_date: "2015-12-31"
    polling_cadence: "weekly"  # immutable court decisions
    slo_tier: 3  # weekly freshness acceptable
    event_driven: false

validation_rules:
  - scope_id_format: "^[A-Z]+-[A-Z]+-[A-Z]{2,3}-[a-z0-9-]+$"
  - tribunal_id_must_exist: true
  - language_must_be_EN_FR_or_BI: true
  - time_window_required: true
  - polling_cadence_allowed: ["daily", "weekly", "monthly"]
  - slo_tier_allowed: [1, 2, 3]  # 1=<1hr, 2=<24hr, 3=weekly

# SLO Tier Definitions (from preventing-stale-data.md)
slo_tiers:
  1:
    name: "Critical Policy"
    max_staleness_hours: 1
    priority: "high"
    event_driven_enabled: true
  2:
    name: "Operations Guidance"
    max_staleness_hours: 24
    priority: "medium"
    event_driven_enabled: false
  3:
    name: "Archives"
    max_staleness_days: 7
    priority: "low"
    event_driven_enabled: false
```

**Acceptance criteria**:
- ✅ All 3 policy files created
- ✅ Files validate against YAML schema
- ✅ Policies referenced by change-policy.yaml are defined
- ✅ **NEW**: SLO tier definitions included

---

#### Task 1.3: Deploy Cosmos DB Schema (Extended)
**Priority**: P0  
**Time**: 3-4 hours (increased from 2-3h)  
**Reference**: [cdc/minimal-schema-ddl.md](cdc/minimal-schema-ddl.md)

**Actions**:
1. **Create Cosmos DB account** (if not exists):
```powershell
az cosmosdb create `
  --name "cosmos-msinfojp-marco" `
  --resource-group "rg-msinfojp-marco" `
  --locations regionName="East US" failoverPriority=0 `
  --default-consistency-level "Session" `
  --enable-automatic-failover false `
  --enable-serverless
```

2. **Create database**:
```powershell
az cosmosdb sql database create `
  --account-name "cosmos-msinfojp-marco" `
  --resource-group "rg-msinfojp-marco" `
  --name "cdc_state"
```

3. **Create 11 containers + 1 NEW corpus_registry** (12 total):
```python
# Python script: scripts/create_cosmos_schema.py
from azure.cosmos import CosmosClient, PartitionKey
import os

# Connection
endpoint = os.getenv("COSMOS_ENDPOINT")
key = os.getenv("COSMOS_KEY")
client = CosmosClient(endpoint, key)
database = client.get_database_client("cdc_state")

# Container definitions (from minimal-schema-ddl.md + NEW corpus_registry)
containers = [
    {"name": "tribunal", "partition_key": "/tribunal_id"},
    {"name": "source_system", "partition_key": "/source_system_id"},
    {"name": "case", "partition_key": "/tribunal_id"},
    {"name": "case_source_key", "partition_key": "/source_system_id"},
    {"name": "case_version", "partition_key": "/case_id"},
    {"name": "artifact", "partition_key": "/case_version_id"},
    {"name": "case_text", "partition_key": "/case_version_id"},
    {"name": "poll_run", "partition_key": "/scope_id"},
    {"name": "change_event", "partition_key": "/poll_run_id"},
    {"name": "case_metadata", "partition_key": "/case_version_id"},
    {"name": "tribunal_metadata", "partition_key": "/tribunal_id"},
    # NEW: Corpus Registry (from preventing-stale-data.md)
    {"name": "corpus_registry", "partition_key": "/corpus_id"}
]

for container_def in containers:
    try:
        database.create_container(
            id=container_def["name"],
            partition_key=PartitionKey(path=container_def["partition_key"])
        )
        print(f"✅ Created: {container_def['name']}")
    except Exception as e:
        print(f"❌ Error creating {container_def['name']}: {e}")
```

**Acceptance criteria**:
- ✅ Cosmos DB account exists in `rg-msinfojp-marco`
- ✅ `cdc_state` database created
- ✅ All 11 containers created with correct partition keys
- ✅ **NEW**: `corpus_registry` container created
- ✅ Can query empty containers without errors

---

### Phase 1 - Week 2: Core CDC Implementation

#### Task 2.1: Case Registry Module
**Priority**: P1  
**Time**: 8-10 hours  
**Reference**: [cdc/cdc-mvp-artifacts.md#2-case-registry](cdc-mvp-artifacts.md#2-case-registry-output-a)

**Implementation**:
```python
# app/backend/cdc/case_registry.py
from typing import Dict, Optional, List
from azure.cosmos import CosmosClient
import hashlib
import json

class CaseRegistry:
    """Manages case registry with stable internal case_id"""
    
    def __init__(self, cosmos_client: CosmosClient, database_name: str = "cdc_state"):
        self.client = cosmos_client
        self.database = self.client.get_database_client(database_name)
        self.case_container = self.database.get_container_client("case")
        self.key_container = self.database.get_container_client("case_source_key")
    
    def register_case(self, 
                      tribunal_id: str,
                      decision_date: str,
                      external_keys: Dict[str, str],  # e.g., {"canlii": "12345", "url": "https://..."}
                      metadata: Dict) -> str:
        """
        Register a new case or find existing case_id.
        Returns stable internal case_id.
        """
        # Check if case already exists via external keys
        existing_case_id = self._find_by_external_key(external_keys)
        if existing_case_id:
            return existing_case_id
        
        # Generate new case_id
        case_id = self._generate_case_id(tribunal_id, decision_date, metadata)
        
        # Insert case record
        case_record = {
            "id": case_id,
            "case_id": case_id,
            "tribunal_id": tribunal_id,
            "decision_date": decision_date,
            "publication_date": metadata.get("publication_date"),
            "style_of_cause": metadata.get("style_of_cause"),
            "docket_number": metadata.get("docket_number"),
            "neutral_citation": metadata.get("neutral_citation"),
            "language_set": metadata.get("languages", []),
            "case_status": "active",
            "is_current": True
        }
        self.case_container.create_item(case_record)
        
        # Insert external key mappings
        for source_system, external_key in external_keys.items():
            key_record = {
                "id": f"{source_system}_{external_key}",
                "case_id": case_id,
                "source_system_id": source_system,
                "external_key": external_key,
                "canonical_url": metadata.get("canonical_url")
            }
            self.key_container.create_item(key_record)
        
        return case_id
    
    def _find_by_external_key(self, external_keys: Dict[str, str]) -> Optional[str]:
        """Find case_id by any external key"""
        for source_system, external_key in external_keys.items():
            query = f"SELECT c.case_id FROM c WHERE c.source_system_id = @source AND c.external_key = @key"
            params = [
                {"name": "@source", "value": source_system},
                {"name": "@key", "value": external_key}
            ]
            results = list(self.key_container.query_items(query, parameters=params, partition_key=source_system))
            if results:
                return results[0]["case_id"]
        return None
    
    def _generate_case_id(self, tribunal_id: str, decision_date: str, metadata: Dict) -> str:
        """Generate stable case_id from tribunal + date + citation"""
        identifier_str = f"{tribunal_id}_{decision_date}_{metadata.get('neutral_citation', '')}"
        hash_suffix = hashlib.sha256(identifier_str.encode()).hexdigest()[:12]
        return f"case_{tribunal_id}_{hash_suffix}"
```

**Test cases** (from acceptance-tests.md):
- B1: New case discovery
- B2: External key change detection
- B3: Case disappears (deleted)

---

#### Task 2.2: Artifact Index Module
**Priority**: P1  
**Time**: 6-8 hours  
**Reference**: [cdc/cdc-mvp-artifacts.md#3-artifact-index](cdc-mvp-artifacts.md#3-artifact-index-output-b)

**Implementation**:
```python
# app/backend/cdc/artifact_index.py
from typing import Optional, Dict
from azure.cosmos import CosmosClient
import hashlib
from datetime import datetime

class ArtifactIndex:
    """Tracks artifacts with content hashes for change detection"""
    
    def __init__(self, cosmos_client: CosmosClient, database_name: str = "cdc_state"):
        self.client = cosmos_client
        self.database = self.client.get_database_client(database_name)
        self.container = self.database.get_container_client("artifact")
    
    def register_artifact(self,
                          case_version_id: str,
                          artifact_type: str,  # "PDF", "HTML", "TEXT"
                          language: str,  # "EN", "FR"
                          content_bytes: bytes,
                          source_url: str,
                          etag: Optional[str] = None,
                          last_modified: Optional[str] = None) -> Dict:
        """
        Register artifact with content hash.
        Returns artifact record with change detection info.
        """
        # Compute content hash
        content_hash = f"sha256:{hashlib.sha256(content_bytes).hexdigest()}"
        
        # Check if artifact exists with same hash
        existing = self._find_by_case_version_and_type(case_version_id, artifact_type, language)
        
        if existing and existing["content_hash"] == content_hash:
            # No change
            return {"changed": False, "artifact_id": existing["artifact_id"]}
        
        # Store new artifact
        artifact_id = f"artifact_{case_version_id}_{artifact_type}_{language}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
        
        storage_uri = self._upload_to_blob(artifact_id, content_bytes, artifact_type)
        
        artifact_record = {
            "id": artifact_id,
            "artifact_id": artifact_id,
            "case_version_id": case_version_id,
            "artifact_type": artifact_type,
            "language": language,
            "source_system_id": "canlii_api",
            "source_url": source_url,
            "retrieved_at_utc": datetime.utcnow().isoformat(),
            "etag": etag,
            "last_modified_utc": last_modified,
            "content_length": len(content_bytes),
            "content_hash": content_hash,
            "mime_type": self._get_mime_type(artifact_type),
            "storage_uri": storage_uri
        }
        
        self.container.create_item(artifact_record)
        
        return {
            "changed": True,
            "artifact_id": artifact_id,
            "previous_hash": existing["content_hash"] if existing else None,
            "new_hash": content_hash
        }
    
    def _find_by_case_version_and_type(self, case_version_id: str, artifact_type: str, language: str) -> Optional[Dict]:
        """Find most recent artifact for case_version + type + language"""
        query = """
        SELECT TOP 1 * FROM c 
        WHERE c.case_version_id = @case_version 
          AND c.artifact_type = @type 
          AND c.language = @lang
        ORDER BY c.retrieved_at_utc DESC
        """
        params = [
            {"name": "@case_version", "value": case_version_id},
            {"name": "@type", "value": artifact_type},
            {"name": "@lang", "value": language}
        ]
        results = list(self.container.query_items(query, parameters=params, partition_key=case_version_id))
        return results[0] if results else None
    
    def _upload_to_blob(self, artifact_id: str, content: bytes, artifact_type: str) -> str:
        """Upload to Azure Blob Storage and return URI"""
        # TODO: Implement blob upload
        return f"https://storage.blob.core.windows.net/documents/{artifact_id}.{artifact_type.lower()}"
    
    def _get_mime_type(self, artifact_type: str) -> str:
        mime_types = {
            "PDF": "application/pdf",
            "HTML": "text/html",
            "TEXT": "text/plain"
        }
        return mime_types.get(artifact_type, "application/octet-stream")
```

**Test cases**:
- C1: PDF bytes drift detection
- C2: Text drift detection
- C3: Artifact missing
- C4: Artifact newly appears

---

#### Task 2.3: Tier 1 CDC Poller (Metadata) - ENHANCED
**Priority**: P1  
**Time**: 12-14 hours (increased from 10-12h)  
**Reference**: [cdc/cdc-mvp-design.md#61-tier-1--registry-polling](cdc/cdc-mvp-design.md)

**Implementation**: Azure Function triggered by timer (daily for mutable, weekly for immutable)

**ENHANCEMENTS**:
- **Freshness metrics tracking** (staleness lag, coverage %)
- **Corpus registry integration**
- **SLO violation alerting**

```python
# functions/Tier1CDCPoller/__init__.py
import azure.functions as func
from cdc.case_registry import CaseRegistry
from cdc.corpus_registry import CorpusRegistry
from cdc.policy_engine import PolicyEngine
import os
import requests
from datetime import datetime, timedelta

async def main(mytimer: func.TimerRequest) -> None:
    """
    Tier 1 CDC Poller - Metadata-based change detection (ENHANCED)
    Triggered: Daily at 2 AM UTC
    NOW INCLUDES: Freshness tracking, SLO monitoring, corpus registry integration
    """
    print("Starting Tier 1 CDC Poll...")
    
    # Initialize
    cosmos_client = get_cosmos_client()
    case_registry = CaseRegistry(cosmos_client)
    corpus_registry = CorpusRegistry(cosmos_client)
    policy_engine = PolicyEngine()
    
    # Load scope from corpus registry
    corpus_id = os.getenv("CORPUS_ID", "jp-jurisprudence")
    corpus_config = corpus_registry.get_corpus(corpus_id)
    
    scope_id = os.getenv("SCOPE_ID", "SST-GD-EN-rolling-24mo")
    scope_config = load_scope_config(scope_id)
    
    # Create poll_run record
    poll_run_id = f"run_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}"
    poll_run_start = datetime.utcnow()
    
    poll_run = {
        "id": poll_run_id,
        "poll_run_id": poll_run_id,
        "corpus_id": corpus_id,  # NEW: Link to corpus registry
        "scope_id": scope_id,
        "policy_id": "change-policy",
        "policy_version": "0.1.0",
        "policy_hash": compute_policy_hash(),
        "started_at_utc": poll_run_start.isoformat(),
        "result_counts_json": {},
        "freshness_metrics": {},  # NEW: Track freshness
        "notes": ""
    }
    
    # Query CanLII API for case metadata
    canlii_api_key = os.getenv("CANLII_API_KEY")
    tribunal_id = scope_config["tribunal_id"]
    language = scope_config["language"]
    
    cases = fetch_canlii_metadata(tribunal_id, language, scope_config["time_window"], canlii_api_key)
    
    counts = {
        "cases_checked": 0,
        "new_cases": 0,
        "metadata_changes": 0,
        "content_signals": 0
    }
    
    # Track freshness metrics
    newest_decision_date = None
    indexed_docs_count = 0
    
    for case_metadata in cases:
        counts["cases_checked"] += 1
        
        # Track newest decision date
        decision_date = datetime.fromisoformat(case_metadata["decisionDate"])
        if newest_decision_date is None or decision_date > newest_decision_date:
            newest_decision_date = decision_date
        
        # Register or find case
        external_keys = {
            "canlii": case_metadata["canliiId"],
            "url": case_metadata["url"]
        }
        
        case_id = case_registry.register_case(
            tribunal_id=case_metadata["tribunal"],
            decision_date=case_metadata["decisionDate"],
            external_keys=external_keys,
            metadata=case_metadata
        )
        
        # Compute metadata hash
        metadata_fields = extract_meaningful_metadata(case_metadata)
        current_hash = compute_metadata_hash(metadata_fields)
        
        # Check for changes
        previous_hash = get_previous_metadata_hash(case_id)
        
        if previous_hash is None:
            # New case
            counts["new_cases"] += 1
            create_change_event(poll_run_id, case_id, "structural", "new_case_id")
        elif current_hash != previous_hash:
            # Metadata changed
            counts["metadata_changes"] += 1
            change_class = policy_engine.classify_metadata_change(case_metadata)
            create_change_event(poll_run_id, case_id, change_class, "metadata_hash_changed")
    
    # Calculate freshness metrics (from preventing-stale-data.md)
    poll_run_end = datetime.utcnow()
    
    if newest_decision_date:
        staleness_lag_hours = (poll_run_end - newest_decision_date).total_seconds() / 3600
    else:
        staleness_lag_hours = None
    
    # Calculate ingestion lag (time from poll start to poll end)
    ingestion_lag_minutes = (poll_run_end - poll_run_start).total_seconds() / 60
    
    # Calculate coverage (indexed docs vs source docs)
    indexed_docs_count = count_indexed_documents(corpus_id)
    source_docs_count = counts["cases_checked"]
    coverage_percentage = (indexed_docs_count / source_docs_count * 100) if source_docs_count > 0 else 0
    
    freshness_metrics = {
        "staleness_lag_hours": staleness_lag_hours,
        "ingestion_lag_minutes": ingestion_lag_minutes,
        "coverage_percentage": coverage_percentage,
        "newest_decision_date": newest_decision_date.isoformat() if newest_decision_date else None,
        "indexed_docs_count": indexed_docs_count,
        "source_docs_count": source_docs_count
    }
    
    # Finalize poll_run
    poll_run["ended_at_utc"] = poll_run_end.isoformat()
    poll_run["result_counts_json"] = counts
    poll_run["freshness_metrics"] = freshness_metrics
    save_poll_run(poll_run)
    
    # Update corpus registry with freshness metrics
    corpus_registry.update_freshness_metrics(
        corpus_id=corpus_id,
        staleness_lag_hours=staleness_lag_hours,
        coverage_percentage=coverage_percentage,
        last_ingested_document_date=newest_decision_date.isoformat() if newest_decision_date else None
    )
    
    # Check SLO compliance and alert if violated
    slo_tier = corpus_config["priority_tier"]
    slo_config = get_slo_config(slo_tier)  # From scope.yaml
    
    if staleness_lag_hours and staleness_lag_hours > slo_config["max_staleness_hours"]:
        alert_slo_violation(
            corpus_id=corpus_id,
            slo_tier=slo_tier,
            staleness_lag_hours=staleness_lag_hours,
            max_allowed=slo_config["max_staleness_hours"]
        )
    
    print(f"Tier 1 Poll Complete: {counts}")
    print(f"Freshness Metrics: {freshness_metrics}")
```

**Test cases** (updated):
- A1: Scope enforcement
- A2: Every run creates poll_run
- A3: Replay determinism
- B1: New case discovery
- **NEW F1**: Freshness metrics calculated and stored
- **NEW F2**: SLO violation detected and alerted
- **NEW F3**: Corpus registry updated with latest metrics

---

#### Task 2.4: **NEW** - Azure AI Search Freshness Configuration
**Priority**: P1  
**Time**: 4-6 hours  
**Reference**: [cdc/preventing-stale-data.md#freshness-aware-ranking](cdc/preventing-stale-data.md)

**Implementation**: Configure Azure AI Search with freshness-aware scoring profiles

**Actions**:
1. **Add freshness fields to index schema**:
```json
{
  "name": "index-jurisprudence",
  "fields": [
    {"name": "id", "type": "Edm.String", "key": true},
    {"name": "content", "type": "Edm.String", "searchable": true},
    {"name": "title", "type": "Edm.String", "searchable": true},
    {"name": "source_uri", "type": "Edm.String"},
    {"name": "doc_id", "type": "Edm.String", "filterable": true},
    {"name": "chunk_id", "type": "Edm.String"},
    
    // NEW: Freshness-aware fields
    {"name": "source_last_modified", "type": "Edm.DateTimeOffset", "filterable": true, "sortable": true},
    {"name": "ingested_at", "type": "Edm.DateTimeOffset", "filterable": true, "sortable": true},
    {"name": "decision_date", "type": "Edm.DateTimeOffset", "filterable": true, "sortable": true},
    {"name": "authority_score", "type": "Edm.Double", "filterable": true},
    {"name": "is_deleted", "type": "Edm.Boolean", "filterable": true},
    {"name": "corpus_id", "type": "Edm.String", "filterable": true},
    {"name": "language", "type": "Edm.String", "filterable": true},
    
    {"name": "embedding", "type": "Collection(Edm.Single)", "searchable": true, "dimensions": 1536}
  ],
  
  // NEW: Scoring profile for freshness boost
  "scoringProfiles": [
    {
      "name": "freshness-boost",
      "text": {
        "weights": {
          "content": 1.0,
          "title": 1.5
        }
      },
      "functions": [
        {
          "type": "freshness",
          "fieldName": "source_last_modified",
          "boost": 5.0,
          "interpolation": "logarithmic",
          "freshness": {
            "boostingDuration": "P365D"
          }
        },
        {
          "type": "magnitude",
          "fieldName": "authority_score",
          "boost": 3.0,
          "interpolation": "linear"
        }
      ],
      "functionAggregation": "sum"
    }
  ],
  
  "defaultScoringProfile": "freshness-boost"
}
```

2. **Update search query to use scoring profile**:
```python
# app/backend/approaches/chatreadretrieveread.py (updated)

async def run(...):
    # ... existing code ...
    
    # NEW: Apply freshness-aware scoring profile
    freshness_preference = overrides.get("freshness_preference", "balanced")
    
    scoring_profile_map = {
        "strict": "strict-recency",
        "balanced": "freshness-boost",
        "historical": None
    }
    
    scoring_profile = scoring_profile_map.get(freshness_preference)
    
    # Execute hybrid search with freshness boost
    results = await self.search_client.search(
        search_text=optimized_query,
        vector_queries=[VectorizedQuery(
            vector=query_embedding,
            k_nearest_neighbors=top_k,
            fields="embedding"
        )],
        select=[
            "content", "title", "source_uri", "doc_id", 
            "source_last_modified", "decision_date", "language"
        ],
        filter="is_deleted eq false",
        scoring_profile=scoring_profile,
        top=top_k
    )
```

**Acceptance criteria**:
- ✅ Index schema includes freshness fields
- ✅ Scoring profiles defined (freshness-boost, strict-recency)
- ✅ Search queries use scoring profiles
- ✅ Citations include `source_last_modified`
- ✅ Soft delete policy configured

---

### Phase 1 - Week 3: Integration & Testing

#### Task 3.1: Downstream Invalidation (Enhanced)
**Priority**: P1  
**Time**: 10-12 hours (increased from 8-10h)  
**Reference**: [cdc/downstream-invalidation-contract.md](cdc/downstream-invalidation-contract.md)

**ENHANCEMENTS**:
- **Freshness metadata propagation** to search index
- **Idempotent chunk IDs** for deterministic reprocessing
- **Delta-only updates** tracked via content hashes

**Implementation**: Connect CDC change events to existing ingestion pipeline

```python
# app/backend/cdc/downstream_processor.py
from typing import List, Dict
from cdc.change_policy import load_change_policy

class DownstreamProcessor:
    """Executes minimal downstream actions based on change_class"""
    
    def __init__(self):
        self.policy = load_change_policy()
    
    def process_change_event(self, change_event: Dict) -> List[str]:
        """
        Execute downstream actions for change event.
        Returns list of actions taken.
        """
        change_class = change_event["change_class"]
        case_id = change_event["case_id"]
        case_version_id = change_event["case_version_id"]
        
        # Get allowed actions from policy
        allowed_actions = self.policy["change_classes"][change_class]["default_actions"]
        
        actions_executed = []
        
        for action in allowed_actions:
            if action == "extract_text":
                self._extract_text(case_version_id, change_event["language"])
                actions_executed.append("extract_text")
            
            elif action == "generate_chunks":
                self._generate_chunks(case_version_id, change_event["language"])
                actions_executed.append("generate_chunks")
            
            elif action == "embed_chunks":
                changed_chunks = self._get_changed_chunks(case_version_id)
                self._embed_chunks(changed_chunks)
                actions_executed.append("embed_chunks")
            
            elif action == "update_index":
                self._update_index_delta(case_version_id, change_event["language"])
                actions_executed.append("update_index")
            
            elif action == "update_index_metadata_only":
                self._update_index_metadata(case_version_id)
                actions_executed.append("update_index_metadata_only")
        
        # Record actions in change_event
        self._update_change_event(
            change_event["change_event_id"],
            action_taken_json=actions_executed,
            status="executed"
        )
        
        return actions_executed
    
    def _extract_text(self, case_version_id: str, language: str):
        """Extract text from artifact (delta only)"""
        # Call existing extraction pipeline
        pass
    
    def _generate_chunks(self, case_version_id: str, language: str):
        """Generate chunks for language (delta only)"""
        pass
    
    def _embed_chunks(self, chunk_ids: List[str]):
        """Generate embeddings for changed chunks only"""
        pass
    
    def _update_index_delta(self, case_version_id: str, language: str):
        """
        Update search index (affected vectors only) with freshness metadata.
        NOW INCLUDES: source_last_modified, ingested_at, is_deleted fields
        """
        # Get case version metadata
        case_version = self._get_case_version(case_version_id)
        artifact = self._get_latest_artifact(case_version_id, language)
        
        # Get changed chunks
        changed_chunks = self._get_changed_chunks(case_version_id, language)
        
        # Build index documents with freshness metadata
        index_docs = []
        for chunk in changed_chunks:
            doc = {
                "id": chunk["chunk_id"],
                "content": chunk["content"],
                "title": case_version["style_of_cause"],
                "source_uri": artifact["source_url"],
                "doc_id": case_version["case_id"],
                "chunk_id": chunk["chunk_id"],
                
                # NEW: Freshness metadata
                "source_last_modified": artifact["last_modified_utc"],
                "ingested_at": datetime.utcnow().isoformat(),
                "decision_date": case_version["decision_date"],
                "authority_score": self._compute_authority_score(case_version["tribunal_id"]),
                "is_deleted": False,
                "corpus_id": "jp-jurisprudence",
                "language": language,
                
                # Embeddings
                "embedding": chunk["embedding"]
            }
            index_docs.append(doc)
        
        # Upsert to Azure AI Search (delta only)
        self.search_client.upload_documents(documents=index_docs)
        
        print(f"Updated {len(index_docs)} chunks with freshness metadata")
```

**Test cases**:
- I1: No corpus-wide rebuild
- I2: Chunk-level delta only
- **NEW I3**: Freshness metadata included in index updates
- **NEW I4**: Authority scores computed correctly

---

#### Task 3.2: Run All Acceptance Tests (Extended)
**Priority**: P0  
**Time**: 14-18 hours (increased from 12-16h)  
**Reference**: [cdc/acceptance-tests.md](cdc/acceptance-tests.md)

**Test execution**:
```powershell
cd "i:\EVA-JP-v1.2"
pytest tests/cdc/ -v --cov=app.backend.cdc --cov-report=html
```

**NEW test categories**:
- **Freshness Tests** (F1-F5):
  - F1: Freshness metrics calculated correctly
  - F2: SLO violations detected and alerted
  - F3: Corpus registry tracks staleness lag
  - F4: Search scoring profiles boost recent docs
  - F5: Citations include `source_last_modified`

**Expected result**: All 26 original + 5 NEW freshness tests pass (31 total) ✅

---

## 📊 Updated Progress Tracking

| Phase | Task | Status | Time | Priority | New? |
|-------|------|--------|------|----------|------|
| **Week 1** | File reorganization | ⏳ In Progress | 30m | P0 | - |
| **Week 1** | Create 3 policy files | ⏳ Todo | 4-6h | P0 | - |
| **Week 1** | Deploy Cosmos schema (12 containers) | ⏳ Todo | 3-4h | P0 | Enhanced |
| **Week 1** | **Create Corpus Registry** | ⏳ Todo | 2-3h | P0 | ✅ NEW |
| **Week 2** | Case Registry | ⏳ Todo | 8-10h | P1 | - |
| **Week 2** | Artifact Index | ⏳ Todo | 6-8h | P1 | - |
| **Week 2** | Tier 1 Poller (with freshness tracking) | ⏳ Todo | 12-14h | P1 | Enhanced |
| **Week 2** | **Azure AI Search freshness config** | ⏳ Todo | 4-6h | P1 | ✅ NEW |
| **Week 2** | Tier 2 Downloader | ⏳ Todo | 8-10h | P1 | - |
| **Week 3** | Downstream processor (with freshness metadata) | ⏳ Todo | 10-12h | P1 | Enhanced |
| **Week 3** | 31 acceptance tests (26 + 5 freshness) | ⏳ Todo | 14-18h | P0 | Enhanced |
| **Week 3** | Integration testing | ⏳ Todo | 8-10h | P1 | - |

**Total estimated time**: 
- **Phase 1 (MVP)**: 90-115 hours (3-4 weeks for 1 developer)
- **Phase 2 (with dashboard)**: +12-16 hours

---

## 🔄 Phase 2 Features (Post-MVP)

The following features from preventing-stale-data.md are deferred to Phase 2:

1. **Event-Driven CDC** (Azure Event Grid triggers for Tier 1 corpora)
   - Near-real-time updates for critical policy changes
   - Estimated: 8-12 hours

2. **Freshness Telemetry Dashboard** (Admin UI)
   - Per-corpus freshness monitoring
   - SLO compliance tracking
   - Manual refresh operations
   - Estimated: 12-16 hours

3. **Advanced Delete Detection** (Hard delete + tombstone handling)
   - Currently: Soft delete only
   - Add: Hard delete detection, retention policies
   - Estimated: 6-8 hours

4. **Multi-Source CDC** (Beyond CanLII)
   - Extend to SharePoint, Azure Blob, other APIs
   - Estimated: 16-20 hours

**Total Phase 2 estimated time**: 42-56 hours (1-1.5 weeks)

---

## 🚀 Key Architecture Decisions from preventing-stale-data.md

### Decision 1: Two-Plane Architecture
**Rationale**: Separate data plane (CDC execution) from control plane (corpus management, SLOs, monitoring)  
**Impact**: Enables scaling to 50+ corpora with independent SLO tiers

### Decision 2: Freshness-Aware Retrieval
**Rationale**: CDC detects changes, but users only benefit if retrieval favors fresh content  
**Implementation**: Azure AI Search scoring profiles with recency boost  
**Impact**: Prevents "knowledge decay" failure mode

### Decision 3: SLO Tiers (1/2/3)
**Rationale**: Not all corpora need same freshness (policy docs need <1hr, archives can be weekly)  
**Implementation**: Per-corpus SLO tier in corpus registry, enforced by schedule + alerting  
**Impact**: Cost optimization while meeting user needs

### Decision 4: Idempotent Processing
**Rationale**: Must be safe to re-run CDC and downstream pipelines without corruption  
**Implementation**: Deterministic chunk IDs, upsert semantics, content hashes  
**Impact**: Enables recovery, replay, and backfill operations

### Decision 5: Corpus Registry as Control Plane
**Rationale**: Manual hardcoding doesn't scale beyond 5-10 corpora  
**Implementation**: Central registry table with SLO, schedule, index mappings  
**Impact**: Self-service corpus onboarding, operational visibility

---

## 🎯 Next Immediate Steps

1. **Complete file reorganization** (30 minutes)
2. **Create 3 remaining policy files with SLO tiers** (4-6 hours) ← Updated with SLO definitions
3. **Deploy Cosmos DB schema with corpus_registry** (3-4 hours) ← 12 containers now
4. **Implement Corpus Registry module** (2-3 hours) ← **NEW**
5. **Start Case Registry implementation** (8-10 hours)

---

## 📚 Reference Documents (Updated)

- **[README.md](README.md)** - Project overview and phased delivery
- **[cdc/CDC-INDEX.md](cdc/CDC-INDEX.md)** - Complete CDC documentation navigation
- **[cdc/cdc-mvp-design.md](cdc/cdc-mvp-design.md)** - Architecture principles
- **[cdc/cdc-mvp-artifacts.md](cdc-mvp-artifacts.md)** - Build deliverables and acceptance criteria
- **[cdc/change-policy.yaml](cdc/change-policy.yaml)** - Classification rules (v0.1.0)
- **[cdc/acceptance-tests.md](cdc/acceptance-tests.md)** - 26 test specifications
- **[cdc/minimal-schema-ddl.md](cdc/minimal-schema-ddl.md)** - Database schema
- **[cdc/downstream-invalidation-contract.md](cdc/downstream-invalidation-contract.md)** - RAG pipeline contract
- **[cdc/operations-admin-control-plane.md](cdc/operations-admin-control-plane.md)** - Phase 2+ UI
- **[cdc/preventing-stale-data.md](cdc/preventing-stale-data.md)** - ✅ **NEW** Freshness-aware RAG architecture

---

**Ready to begin Phase 1 implementation with freshness-aware architecture!** 🚀

Start with Task 1.1 (file reorganization), then proceed to Task 1.2 (policy files with SLO tiers), then Task 1.4 (Corpus Registry - NEW).
