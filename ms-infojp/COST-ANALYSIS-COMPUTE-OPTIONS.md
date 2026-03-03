# Cost Analysis: Compute Options for MS-InfoJP Deployment

**Date**: January 26, 2026  
**Analysis**: Local Dev vs GitHub Codespaces vs Azure VMs  
**Decision**: ✅ GitHub Codespaces APPROVED as compute solution  
**GitHub Plan**: GitHub Pro ($4/month) - includes 180 hrs/month Codespaces compute + 20GB storage  
**Final Cost**: $84-96/month (Azure services only, $0 compute within free tier)  
**Deployment Source**: `base-platform/` subdirectory (Microsoft baseline, NOT EVA-JP-v1.2 ESDC version)

---

## GitHub Copilot & Codespaces Pricing Summary

### GitHub Copilot Plans (2026)

| Plan | Price | Codespaces Included | Premium Requests | Best For |
|------|-------|---------------------|------------------|----------|
| **Copilot Free** | $0 | None (15 GB-month storage + 120 hrs compute with GitHub Free) | 50/month | Testing Copilot features |
| **Copilot Pro** | $10/month or $100/year | None (20 GB-month storage + 180 hrs compute with GitHub Pro) | 300/month | Individual developers |
| **Copilot Pro+** | $39/month or $390/year | None (same storage/compute as above) | 1,500/month | AI power users |

**Important**: Copilot subscriptions do NOT include Codespaces hours. You need a GitHub plan (Free/Pro/Team/Enterprise) for Codespaces quota.

### GitHub Codespaces Pricing (2026)

#### Free Tier Included with GitHub Plans

| GitHub Plan | Monthly Storage | Monthly Compute Hours | Cost |
|-------------|-----------------|----------------------|------|
| **GitHub Free** | 15 GB-month | 120 hours (2-core) | $0 |
| **GitHub Pro** | 20 GB-month | 180 hours (2-core) | $4/month |

**Note**: Compute hours are calculated based on 2-core machines. Higher core counts consume hours faster.

#### Paid Usage (After Free Tier)

| Resource | Unit | Core Multiplier | Price |
|----------|------|-----------------|-------|
| **2-core compute** | 1 hour | 2 | $0.18 |
| **4-core compute** | 1 hour | 4 | $0.36 |
| **8-core compute** | 1 hour | 8 | $0.72 |
| **16-core compute** | 1 hour | 16 | $1.44 |
| **32-core compute** | 1 hour | 32 | $2.88 |
| **Storage** | 1 GB-month | N/A | $0.07 |

**Example**: Using a 4-core machine for 1 hour = 2 hours of quota (4 cores / 2 cores = 2x multiplier)

---

## Three Deployment Scenarios: Full Comparison

### Scenario 1: Local Development (Windows PC)

#### Cost Breakdown
- **Compute**: $0 (uses your local machine)
- **Azure Services**: ~$84-96/month (deployed infojp-sandbox resources)
  - Cognitive Search (Basic): $75/month
  - Cosmos DB (Serverless): $1-5/month
  - Storage Accounts: $2-4/month
  - Document Intelligence (S0): $1-10/month pay-per-use
  - AI Services (S0): $1-2/month pay-per-use
  - Azure OpenAI (ao-sandbox): $0 (reusing existing deployment)
- **Total**: ~$84-96/month

#### What You Can Do
✅ **Development & Testing**:
- Run backend (Python/Quart) on `localhost:5000`
- Run frontend (React/Vite) on `localhost:5173`
- Run enrichment service on `localhost:5001`
- Connect to Azure services (Search, Cosmos, Storage) over internet
- Test document upload, processing, and RAG queries
- Modify code, test changes immediately
- Use VS Code debugging tools

❌ **What You Can't Do**:
- **Demo to external users** - requires sharing your localhost (not secure/practical)
- **Access from other devices** - locked to your PC
- **Team collaboration** - no shared environment
- **Mobile testing** - can't access from phone/tablet
- **Production-like environment** - not externally accessible

#### Network Requirements
- VPN to `hccld2` VNet if using private endpoints
- OR set `OPTIMIZED_KEYWORD_SEARCH_OPTIONAL=true` + `ENRICHMENT_OPTIONAL=true` for fallback mode

#### Pros
- ✅ $0 compute cost
- ✅ Full control over environment
- ✅ Fast iteration (no deployment delays)
- ✅ Use full power of your local machine
- ✅ No quota limitations

#### Cons
- ❌ Can't demo to others easily
- ❌ Requires local setup (Python, Node.js, dependencies)
- ❌ Not accessible from other devices
- ❌ Requires your PC to be running
- ❌ Network troubleshooting (VPN, private endpoints)

---

### Scenario 2: GitHub Codespaces ✅ APPROVED SOLUTION

#### Cost Breakdown
- **Compute**: 
  - **With GitHub Free**: 120 hours/month (2-core) = $0
  - **✅ YOU HAVE GitHub Pro**: 180 hours/month (2-core) = **$0 additional** (already paying $4/month)
  - **After quota**: $0.18/hour (2-core) or $0.36/hour (4-core)
- **Storage**: 
  - **With GitHub Free**: 15 GB-month = $0
  - **✅ YOU HAVE GitHub Pro**: 20 GB-month = **$0 additional**
  - **After quota**: $0.07/GB-month
- **Azure Services**: ~$84-96/month (same as local)
- **Total (GitHub Free)**: ~$84-96/month (assuming within 120 hrs/month)
- **✅ Total (YOU with GitHub Pro)**: ~$84-96/month (assuming within 180 hrs/month) - **NO additional cost beyond Azure services!**

#### Usage Examples (2-core Codespace)
- **120 hours/month** (GitHub Free) = ~4 hours/day for 30 days
- **✅ 180 hours/month (YOUR GitHub Pro)** = **~6 hours/day for 30 days** - plenty for full-time development!
- **If you exceed quota**: $0.18/hour = $5.40 for 30 extra hours (unlikely with 6 hrs/day allowance)

#### What You Can Do
✅ **Development & Testing**:
- Full VS Code in browser or desktop
- Run backend, frontend, enrichment just like local
- Access from **any device** (laptop, tablet, home PC, work PC)
- Port forwarding for **secure demos** (`https://[codespace-name]-5173.github.dev`)
- Team collaboration (share Codespace URL)
- Pre-configured environment (`.devcontainer.json`)
- Automatic snapshots and version control

✅ **Demonstrations**:
- **Share live demo URL** with stakeholders (no VPN required for them)
- **Access from mobile devices** for testing/demos
- **Persistent environment** - stop/start without losing state
- **Multiple Codespaces** - test different branches simultaneously

❌ **What You Can't Do**:
- **Custom domain** - URLs are `*.github.dev` (can't use `jurisprudence.example.com`)
- **Production hosting** - Codespaces are for development, not 24/7 hosting
- **Guaranteed uptime** - Codespaces auto-stop after 30 minutes idle
- **Public internet access** - ports are private by default (can make public for demos)

#### Network Requirements
- Internet connection only (GitHub handles VNet access via Azure AD auth)
- No VPN required for development
- Azure services accessible via public endpoints with managed identity

#### Pros
- ✅ **Access from anywhere** - any device with browser
- ✅ **Free tier generous** - 120-180 hours/month
- ✅ **Secure demo URLs** - easy to share with stakeholders
- ✅ **Pre-configured environment** - instant setup
- ✅ **Team collaboration** - share environment
- ✅ **No local setup** - works on low-end devices
- ✅ **Built-in VS Code** - full IDE experience
- ✅ **Auto-saves work** - resume anytime

#### Cons
- ❌ **Usage limits** - free tier may not be enough for heavy use
- ❌ **Auto-stops** - 30 min idle timeout (can restart, but annoying)
- ❌ **Not for production** - development/demo only
- ❌ **Compute cost after quota** - $0.18-$0.36/hour adds up
- ❌ **GitHub URLs only** - can't use custom domains

---

### Scenario 3: Azure VMs (App Service Plans) 💡 OPTIONAL ENHANCEMENT

#### Cost Breakdown (Requires VM Quota Approval)
- **Backend App Service Plan (B1 Basic)**: ~$13/month (requires quota approval - currently 0 VMs available)
- **Enrichment App Service Plan (B1 Basic)**: ~$13/month (requires quota approval)
- **Function App (Consumption Plan)**: $0 base + pay-per-execution (requires quota approval)
- **Azure Services**: ~$84-96/month (same as local)
- **Total (if quota available)**: ~$110-122/month

#### Cost Optimization Options
1. **Share App Service Plan** (Backend + Enrichment on same B1): ~$97-109/month (saves $13/month)
2. **Use Cosmos DB Free Tier**: ~$92-104/month (saves $5/month)
3. **Combined optimizations**: ~$92-104/month minimum

#### What You Can Do (Once Quota Available)
✅ **Production Deployment**:
- **Custom domain** with SSL (`jurisprudence.hccld.ca` or similar)
- **24/7 availability** - always online
- **Auto-scaling** - handle traffic spikes
- **Azure AD authentication** - full enterprise SSO
- **Private endpoints** - secure VNet integration
- **Production-grade monitoring** - Application Insights, Log Analytics
- **Backup and DR** - Azure-managed backups
- **Load balancing** - distribute traffic
- **CDN integration** - fast global delivery

✅ **Public Demonstrations**:
- **Share public URL** with anyone
- **No time limits** - always accessible
- **Professional domain** - `https://infojp.example.com`
- **Handle concurrent users** - scale automatically
- **Mobile-friendly** - accessible from any device

❌ **Current Limitations**:
- **BLOCKED by quota** - cannot deploy until quota request approved
- **1-3 business day wait** - for quota increase request
- **Higher cost** - $26/month compute vs $0 Codespaces (with free tier)

#### Network Requirements
- All services in `hccld2` VNet with private endpoints
- Azure AD authentication for access control
- VPN not required for end users (public-facing web app)

#### Pros
- ✅ **Production-ready** - 24/7 uptime, auto-scaling
- ✅ **Custom domain** - professional branding
- ✅ **No usage limits** - always available
- ✅ **Enterprise features** - SSO, RBAC, audit logs
- ✅ **Managed service** - Azure handles infrastructure
- ✅ **Backup and DR** - built-in resilience
- ✅ **Best performance** - optimized for production

#### Cons
- ❌ **BLOCKED by quota** - cannot deploy now
- ❌ **Wait time** - 1-3 business days for quota approval
- ❌ **Higher cost** - $26/month compute (vs $0 Codespaces)
- ❌ **Deployment complexity** - more setup than Codespaces
- ❌ **Longer iteration** - code changes require redeployment

---

## Recommended Strategy: Hybrid Approach

### Phase 1: Immediate (Today) - GitHub Codespaces
**Use Codespaces for development and internal demos while waiting for quota approval**

**Action Items**:
1. ✅ Create `.devcontainer/devcontainer.json` in EVA-JP-v1.2 repo
2. ✅ Launch Codespace from GitHub
3. ✅ Configure `backend.env` with infojp-sandbox endpoints
4. ✅ Start backend + frontend + enrichment
5. ✅ Test full workflow (upload → OCR → search → query)
6. ✅ Share Codespace URL for stakeholder demos

**Cost**: $0-4/month (within free tier for 4-6 hours/day usage)

**Benefits**:
- ✅ Start development immediately (no waiting)
- ✅ Demo to stakeholders while quota is pending
- ✅ Validate architecture with real Azure services
- ✅ Team can collaborate in shared environment
- ✅ $0 compute cost (within free tier)

---

### Phase 2: Short-term (1-3 weeks) - Request Azure VM Quota
**Submit quota increase request while continuing development in Codespaces**

**Action Items**:
1. Azure Portal → Subscriptions → Usage + quotas
2. Request B1 Basic tier quota increase (need 3 VMs: Backend, Enrichment, Functions)
3. Wait 1-3 business days for approval
4. Continue development in Codespaces during wait

**Cost**: $0 (no action until quota approved)

**Timeline**: 1-3 business days for quota approval

---

### Phase 3: Production (After Quota Approval) - Azure VMs
**Deploy to Azure App Service for production-grade hosting**

**Action Items**:
1. Deploy Backend Web App to `infojp-webapp-backend`
2. Deploy Enrichment Web App to `infojp-webapp-enrich`
3. Deploy Function App to `infojp-func`
4. Configure custom domain (optional)
5. Set up monitoring and alerts
6. **Keep Codespaces for development** (don't abandon it!)

**Cost**: ~$110-122/month ($26 compute + $84-96 Azure services)

**Optimization**: ~$92-104/month with shared App Service Plan + Cosmos DB free tier

**Benefits**:
- ✅ Production-ready 24/7 availability
- ✅ Custom domain for professional branding
- ✅ Auto-scaling for traffic spikes
- ✅ Enterprise features (SSO, RBAC, audit logs)

---

## Cost Comparison: 6-Month Projection

### Scenario A: Codespaces Only (No Azure VMs) - ✅ YOUR SCENARIO
| Month | Codespaces (YOUR GitHub Pro) | Azure Services | Total |
|-------|------------------------------|----------------|-------|
| 1-6 | **$0 additional** (within 180 hrs/month) | $84-96/month | **$504-576** |
| **6-Month Total** | **$0 additional** | | **~$540** |

**Assumes**: 6 hours/day average usage (within YOUR free tier) - **Perfect for full-time development!**

---

### Scenario B: Codespaces + Azure VMs (Hybrid)
| Month | Codespaces | Azure VMs | Azure Services | Total |
|-------|-----------|-----------|----------------|-------|
| 1 | $0 | $0 (blocked) | $84-96 | $84-96 |
| 2-6 | $0 | $26/month | $84-96/month | $110-122/month |
| **6-Month Total** | $0 | $130 | $504-576 | **~$634-706** |

**Use Case**: Keep Codespaces for dev, use Azure VMs for production demos

---

### Scenario C: Local Dev + Azure VMs (When Quota Available)
| Month | Local Dev | Azure VMs | Azure Services | Total |
|-------|-----------|-----------|----------------|-------|
| 1-6 | $0 | $26/month | $84-96/month | $110-122/month |
| **6-Month Total** | $0 | $156 | $504-576 | **~$660-732** |

**Use Case**: Traditional approach, requires local setup

---

## Final Recommendation

### ✅ Recommended Path (Best Value + Flexibility)

1. **✅ Start with GitHub Codespaces** (Today) - **YOU ALREADY HAVE THIS!**
   - **$0 additional cost** (already included in your GitHub Pro)
   - **180 hours/month free** = 6 hours/day for 30 days
   - Access from anywhere, any device
   - Share demo URLs with stakeholders
   - No waiting for quota approval

2. **Request Azure VM Quota** (This Week)
   - Submit quota increase request (1-3 day wait)
   - Continue development in Codespaces during wait

3. **Deploy to Azure VMs** (After Quota Approval)
   - ~$110-122/month for production hosting
   - Custom domain, 24/7 uptime, auto-scaling
   - **Keep Codespaces for development** (best of both worlds)

4. **Hybrid Model** (Long-term)
   - **Codespaces**: Development, testing, team collaboration ($0/month within free tier)
   - **Azure VMs**: Production hosting, public demos, enterprise features (~$110-122/month)

**Total Cost (With YOUR GitHub Pro)**: 
- Month 1: ~$84-96 (Azure services only, **Codespaces $0 additional** with your Pro plan)
- Month 2+: ~$110-122 (add Azure VMs when quota available)
- **6-Month Projection**: ~$634-706 (no change - Codespaces already covered by your GitHub Pro!)

**Key Advantages**:
- ✅ Start immediately (no blocked by quota)
- ✅ $0 compute during development
- ✅ Production-ready when needed
- ✅ Flexibility to demo from anywhere
- ✅ Team collaboration in shared environment
- ✅ Keep development separate from production

---

## ✅ Your GitHub Pro Advantage

**You already have GitHub Pro ($4/month), which includes**:
- ✅ **180 core-hours/month** of Codespaces compute (2-core) = **6 hours/day for 30 days**
- ✅ **20 GB** of Codespaces storage
- ✅ **3,000 Actions minutes/month** for CI/CD
- ✅ **2 GB** of Packages storage
- ✅ Unlimited public/private repos
- ✅ Advanced tools: Code owners, required reviewers, GitHub Pages

**This means Codespaces costs you $0 additional beyond Azure services!**

**Comparison**:
- **Without GitHub Pro**: Codespaces would cost $0.18/hour × 180 hours = **$32.40/month**
- **With YOUR GitHub Pro**: **$0 additional** (already included in your $4/month plan)
- **Your Savings**: **$32.40/month** or **$388.80/year** on compute!

**Bottom Line**: You're already paying for GitHub Pro, so Codespaces is essentially free compute for development. This makes it the clear winner over Azure VMs for development work.

---

## Cost Optimization Tips

### For Codespaces
1. **Stop when idle** - Codespaces auto-stop after 30 min (configure to 15 min to save more)
2. **Use 2-core machines** - sufficient for development, cheapest option
3. **Delete unused Codespaces** - save storage costs
4. **Use GitHub Free** - 120 hours/month is enough for 4 hrs/day

### For Azure VMs
1. **Share App Service Plans** - put backend + enrichment on same B1 ($13/month savings)
2. **Use Cosmos DB free tier** - 1000 RU/s free ($5/month savings)
3. **Auto-shutdown dev/test VMs** - don't pay for idle resources
4. **Use Azure OpenAI ao-sandbox** - reuse existing deployment ($0 cost)

### For Azure Services
1. **Cognitive Search Basic tier** - sufficient for development/testing ($75/month vs $250+/month Standard)
2. **Storage LRS** - local redundancy sufficient for non-critical data
3. **Pay-per-use Document Intelligence** - only pay when processing documents
4. **Serverless Cosmos DB** - scales to zero when not in use

---

## Quick Reference: What You Get With Each Plan

| Capability | Local Dev | Codespaces (Free) | Codespaces (Pro) | Azure VMs |
|------------|-----------|-------------------|------------------|-----------|
| **Development** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No (for prod) |
| **Internal Demo** | ⚠️ Limited | ✅ Yes | ✅ Yes | ✅ Yes |
| **Public Demo** | ❌ No | ⚠️ Limited | ⚠️ Limited | ✅ Yes |
| **24/7 Availability** | ❌ No | ❌ No | ❌ No | ✅ Yes |
| **Custom Domain** | ❌ No | ❌ No | ❌ No | ✅ Yes |
| **Access from Anywhere** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Team Collaboration** | ❌ No | ✅ Yes | ✅ Yes | ⚠️ Via deployment |
| **Monthly Cost** | $84-96 | $84-96 | $88-100 | $110-122 |
| **Setup Time** | 1-2 hours | 15 minutes | 15 minutes | Blocked (no quota) |

**Legend**:
- ✅ Yes - Fully supported
- ⚠️ Limited - Supported with constraints
- ❌ No - Not supported

---

## Next Steps

1. **Today**: Create `.devcontainer/devcontainer.json` and launch Codespace (see DEPLOYMENT-PLAN.md for spec)
2. **This Week**: Submit Azure VM quota increase request (1-3 day wait)
3. **After Quota Approval**: Deploy to Azure App Service Plans for production
4. **Long-term**: Use hybrid model (Codespaces for dev, Azure VMs for production)

**Questions?** Refer to:
- [DEPLOYMENT-PLAN.md](./DEPLOYMENT-PLAN.md) - Full deployment guide with Codespaces setup
- [DEPLOYMENT-STATUS.md](./DEPLOYMENT-STATUS.md) - Current deployment state
- GitHub Docs: https://docs.github.com/en/codespaces

---

## ✅ APPROVED ARCHITECTURE (January 26, 2026)

### Decision Summary

**Compute Solution**: GitHub Codespaces  
**Rationale**: $0 additional cost (included in existing GitHub Pro subscription), no Azure VM quota required, full development environment  
**Monthly Cost**: $84-96 (Azure services only)  
**Deployment Source**: `base-platform/` subdirectory (Microsoft baseline, commit 807ee181)  
**Network Architecture**: Public endpoints (personal Azure, not ESDC hccld VNet)

### Implementation Status

- ✅ **Azure Infrastructure**: All 8 core services deployed and operational
- ✅ **Compute Solution**: GitHub Codespaces approved (180 hrs/month free with GitHub Pro)
- ✅ **Cost Analysis**: Completed and approved
- ✅ **Documentation**: Updated to reflect Codespaces architecture
- ⏳ **Development Environment**: Ready to launch (see DEPLOYMENT-PLAN.md Part 1)
- 💡 **Azure App Service**: Optional future enhancement (requires VM quota approval)

### What This Means

**For Development**:
- Launch Codespace from `base-platform/` directory
- Start backend on port 5000, frontend on port 5173
- Connect to deployed Azure services (Search, Cosmos, Storage)
- Full development/testing capabilities at $0 compute cost

**For Production** (Future):
- Request Azure VM quota increase when needed for 24/7 hosting
- Deploy to Azure App Service Plans (+$26/month)
- Use custom domain with SSL
- Enable auto-scaling and production monitoring

**Cost Breakdown**:
- **Current**: $84-96/month (Azure services only)
- **With App Service** (future): $110-122/month (add +$26 for VMs)
- **Savings**: $26/month by using Codespaces for development

### Deployment Checklist

- [x] Azure subscription configured (c59ee575-eb2a-4b51-a865-4b618f9add0a)
- [x] Resource Group: infojp-sandbox (East US)
- [x] Azure OpenAI: ao-sandbox (reused, gpt-4o + text-embedding-3-small)
- [x] Azure Search: infojp-srch (Basic tier)
- [x] Azure Cosmos DB: infojp-cosmos (Serverless)
- [x] Azure Storage: infojpst01, infojpstfunc01 (Standard_LRS)
- [x] Azure Key Vault: infojp-kv (Standard, RBAC)
- [x] Document Intelligence: infojp-doc-intel (S0 pay-per-use)
- [x] AI Services: infojp-ai-svc (S0 pay-per-use)
- [x] Cost analysis completed and approved
- [x] GitHub Codespaces selected as compute solution
- [ ] Launch Codespace (next step - see DEPLOYMENT-PLAN.md Part 1)
- [ ] Configure backend.env with Azure endpoints
- [ ] Start development servers and test full workflow

### Next Session: Start Development

1. **Launch Codespace**: Follow Part 1 in DEPLOYMENT-PLAN.md
2. **Configure Environment**: Set up backend.env with infojp-sandbox endpoints
3. **Start Servers**: Backend (5000), Frontend (5173), Enrichment (5001)
4. **Test Workflow**: Upload document → OCR → chunk → embed → search → query
5. **Iterate**: Develop and test with full Azure integration

**Estimated Time**: 30 minutes to fully operational development environment
- Azure Pricing Calculator: https://azure.microsoft.com/pricing/calculator/
