# Next Steps: Phase 3-5 Kickoff

**Document**: Immediate action items for team  
**Updated**: 2026-01-25  
**Audience**: Project leads, architects, developers  
**Timeline**: Week of Jan 27, 2026

---

## 🎯 What Just Happened

**Master Plan Created**: PLAN.md is now the single source of truth for Phases 3-5 execution.

**Index Updated**: INDEX.md marks Phase 2 complete (all docs in `docs/apim-scan/`) and adds Phase 3-5 stubs.

**Team Ready**: All Phase 1-2 evidence is complete (212+ hours, 8,000+ lines). Architecture proven. No unknowns.

---

## 📋 THIS WEEK (Week of Jan 27)

### 1. **Distribute & Discuss PLAN.md** (Immediate)

**Action**: Share PLAN.md with team and stakeholders.

**File**: [PLAN.md](./PLAN.md) (750+ lines, 32 KB)

**What to Review**:
- Executive Summary (why backend middleware, not SDK refactoring)
- Master Timeline & Sequencing (Option A: 5-6 weeks sequential, Option B: 3-4 weeks parallel)
- Team Composition (recommend 8-12 person team)
- Critical Path & Risk Mitigation

**Decision Required**:
- **Option A (Sequential)**: Phases 3→4→5 one after another (safer, clear handoffs, 5-6 weeks)
- **Option B (Parallel, RECOMMENDED)**: Phases 3 + 4 in parallel Weeks 1-2 (faster, slightly higher risk, 3-4 weeks)

**Recommendation**: Option B (parallel) because Phase 3B (APIM policies) finishes by end of Week 1, then Phase 4A (backend middleware) can start with finalized header list.

---

### 2. **Address Critical Gaps** (This Week)

**Gap 1: User Authentication** (🔴 CRITICAL)
- **Current State**: All 20+ backend endpoints are open/public. No JWT validation.
- **Impact**: Cannot expose to public without auth enforcement.
- **Action**: Schedule Phase 4B (Authorization Enforcement) spike to assess effort + risk.
- **File**: [02-auth-and-identity.md](./docs/apim-scan/02-auth-and-identity.md) documents the gap (454 lines).

**Gap 2: Streaming Test** (🟡 MEDIUM)
- **Risk**: APIM may buffer SSE responses by default (would break real-time).
- **Action**: Confirm APIM can handle `/stream` and `/tdstream` (SSE) without buffering.
- **File**: [04-streaming-analysis.md](./docs/apim-scan/04-streaming-analysis.md) documents the patterns.

**Gap 3: Cosmos DB Throughput** (🟡 MEDIUM)
- **Risk**: Every request generates a governance log. Need enough RU capacity.
- **Action**: Estimate RU requirement (Rule of thumb: 10k RU for 100 req/sec).
- **File**: PLAN.md Phase 4C (Cosmos DB Schema) addresses this.

---

### 3. **Confirm Team & Roles** (This Week)

**Team Size**: Recommend 8-12 people across Weeks 1-3.

**Phases 3 (Week 1-2) — 4 people**:
- Architect (1 FTE)
- Backend Developer (2 FTE)
- DevOps Engineer (1 FTE)
- Optional: APIM Specialist (0.5 FTE)

**Phases 4 (Week 1-2 parallel) — 3 people**:
- Backend Developer (2 FTE)
- Data Analyst (0.5 FTE)
- DevOps Engineer (1 FTE)

**Phase 5 (Week 3) — 5+ people**:
- QA Engineer (1 FTE)
- Product Manager (0.5 FTE)
- DevOps Engineer (1 FTE)
- Backend Developer (1 FTE)
- On-Call Support (rotating)

**Action**: Identify names, confirm availability, assign roles.

---

## 📅 NEXT WEEK (Week of Feb 3)

### Phase 3A Kickoff: OpenAPI Spec Generation (1-2 days)

**What**: Extract FastAPI /docs endpoint and refine for APIM consumption.

**Tasks**:
1. Start backend locally (http://localhost:5000/docs)
2. Download OpenAPI JSON (GET http://localhost:5000/openapi.json)
3. Add operationId to each endpoint (required by APIM)
4. Add security scheme (Bearer JWT for Entra ID)
5. Normalize response schemas
6. Mark streaming endpoints with `x-apim-policy: handle-streaming`

**Deliverable**: `09-openapi-spec.yaml` (save in apim/ root)

**Owner**: Architect + Backend Developer

**Reference**: PLAN.md Phase 3A (detailed task breakdown)

---

### Phase 4C Parallel: Cosmos DB Schema Creation (1 day)

**What**: Create new collections for governance logging.

**Collections**:
1. `sandbox_users` (partition: `/entra_oid`)
2. `projects` (partition: `/project_id`)
3. `user_projects` (partition: `/user_oid`)
4. `governance_requests` (partition: `/correlation_id`, TTL: 90 days)

**Deliverable**: Collections created in Cosmos DB (sandbox environment)

**Owner**: DevOps Engineer

**Reference**: PLAN.md Phase 4C (schemas included)

---

## 🚀 EXECUTION STRATEGY (Weeks 1-3)

### Week 1-2: Phase 3 + Phase 4 in Parallel

```
Mon (Jan 27):  Team kickoff, review PLAN.md, assign roles
Tue-Wed:       Phase 3A: OpenAPI spec (1-2 days)
               Phase 4C: Cosmos schema (1 day, parallel)
Thu-Fri:       Phase 3B: APIM policies (3-4 days, starts)
               Phase 4A: Governance middleware (2-3 days, starts)

Week 2:
Mon-Tue:       Phase 3B: Complete APIM policies
               Phase 4A: Complete governance middleware
Wed-Thu:       Phase 3C: Deployment plan (3-4 days)
               Phase 4B: Authorization enforcement (2-3 days, starts)
               Phase 4D: Cost queries (2-3 days, starts)
Fri:           All Phase 3-4 deliverables complete

Week 3:
Mon-Tue:       Phase 5A: Integration testing (2-3 days)
Wed:           Phase 5B: Load testing (1-2 days)
Thu:           Phase 5C: UAT (2-3 days, parallel)
Fri:           Phase 5D: Go-live cutover (1-2 days, on-call ready)
```

**Critical Path**: Phase 3A → 3B → 3C (must finish by end of Week 2)

**Parallel**: Phase 4A, 4B, 4C, 4D can run in parallel with Phase 3

---

## 📚 Key Documents (Read in Order)

1. **[PLAN.md](./PLAN.md)** ⭐ START HERE (750+ lines, master execution plan)
2. **[CRITICAL-FINDINGS-SDK-REFACTORING.md](./CRITICAL-FINDINGS-SDK-REFACTORING.md)** (architecture decision: why backend middleware)
3. **[README.md](./README.md)** (5-phase APIM process, MVP definition)
4. **[INDEX.md](./INDEX.md)** (document index, Phase 2 status)
5. **[docs/apim-scan/01-api-call-inventory.md](./docs/apim-scan/01-api-call-inventory.md)** (20+ endpoints)
6. **[docs/apim-scan/02-auth-and-identity.md](./docs/apim-scan/02-auth-and-identity.md)** (auth gaps)
7. **[docs/apim-scan/05-header-contract-draft.md](./docs/apim-scan/05-header-contract-draft.md)** (governance headers)

---

## ⚠️ Critical Success Factors

1. **User Authentication** (Phase 4B) — Cannot go public without this. Plan to address ASAP.
2. **Streaming Testing** (Phase 3B + 5A) — APIM must preserve SSE without buffering. Test early.
3. **Cosmos DB Throughput** (Phase 4C) — Estimate RU; start with 10k RU.
4. **Team Availability** — 8-12 people needed for 3-4 week timeline. Confirm this week.
5. **Stakeholder Alignment** — Get AICOE buy-in on PLAN.md before Week 1 starts.

---

## 🎯 Definition of Done (for This Kickoff)

- [ ] PLAN.md reviewed and approved by team leads
- [ ] Sequencing decision made (Option A or B)
- [ ] Team roles assigned and confirmed (8-12 people)
- [ ] Week 1 Phase 3A task assigned to Architect
- [ ] Week 1 Phase 4C task assigned to DevOps
- [ ] Critical gaps understood (user auth, streaming, Cosmos RU)
- [ ] AICOE stakeholder signoff received

---

## 📞 Contact

**Questions about PLAN.md?** Start with [PLAN.md Executive Summary](./PLAN.md#executive-summary).

**Questions about findings?** See [CRITICAL-FINDINGS-SDK-REFACTORING.md](./CRITICAL-FINDINGS-SDK-REFACTORING.md).

**Questions about current state?** See [00-SUMMARY.md](./00-SUMMARY.md).

---

## Timeline Summary

| Phase | Duration | Start | End | Effort |
|-------|----------|-------|-----|--------|
| Phase 3 | 2-3 weeks | Feb 3 | Feb 17 | 44-60 hrs |
| Phase 4 | 2 weeks | Feb 3-10 | Feb 17 | 40-56 hrs |
| Phase 5 | 1 week | Feb 17 | Feb 24 | 40-56 hrs |
| **Total** | **3-4 weeks** | **Feb 3** | **Feb 24** | **124-172 hrs** |

(Sequential option adds 2 weeks; parallel recommended)

---

**Ready to kick off? Review PLAN.md and distribute to team. See you Week of Feb 3!**
