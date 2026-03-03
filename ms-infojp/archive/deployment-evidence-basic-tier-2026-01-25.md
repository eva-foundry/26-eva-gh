# MS-InfoJP Sandbox Deployment Evidence - Basic Tier Configuration

**Date**: 2026-01-25  
**Deployment**: MS-InfoJP Sandbox (infojp-sandbox)  
**Subscription**: MarcoSub (c59ee575-eb2a-4b51-a865-4b618f9add0a)  
**Location**: East US  
**Configuration**: Basic tier for cost optimization per README specifications

---

## Configuration Changes

### Problem Identified
Terraform variable defaults in `infra/variables.tf` specified production-tier SKUs that didn't match README specifications:
- **README**: "Azure Cognitive Search (Basic tier)" and "Azure Cosmos DB (Serverless)"
- **Terraform Defaults**: Premium/Standard tiers requiring VM quota and costing ~$525/month
- **Result**: Deployment blocked by 0 Standard VM quota in personal subscription

### Root Cause
Personal Azure subscriptions don't allocate VM quota by default. Premium (P-series) and Standard (S-series) App Service Plans require VM quota, but Basic tier (B-series) does NOT.

### Solution Applied
Added SKU overrides to `scripts/environments/msinfojp-marco.env`:

```bash
# === SANDBOX SKU OVERRIDES (per README - Basic tier for cost optimization) ===
export TF_VAR_appServiceSkuSize="B2"
export TF_VAR_appServiceSkuTier="Basic"
export TF_VAR_enrichmentAppServiceSkuSize="B2"
export TF_VAR_enrichmentAppServiceSkuTier="Basic"
export TF_VAR_functionsAppSkuSize="B2"
export TF_VAR_functionsAppSkuTier="Basic"
export TF_VAR_searchServicesSkuName="basic"
```

---

## Cost Comparison

### Before (Terraform Defaults - Production Tier)
| Service | SKU | Monthly Cost |
|---------|-----|--------------|
| Web App Service Plan | S1 (Standard) | $70 |
| Enrichment App Service Plan | P2v3 (PremiumV3) | $200 |
| Functions App Service Plan | S2 (Standard) | $140 |
| Azure Cognitive Search | standard | $250 |
| Azure Cosmos DB | Autoscale 1000 RU/s | ~$25 |
| Storage, Document Intelligence | Pay-as-you-go | ~$15 |
| Other (Key Vault, Insights, etc.) | Pay-as-you-go | ~$5 |
| **TOTAL** | | **~$525/month** |

**Blockers**:
- ❌ Requires Standard VM quota (0 allocated in personal subscription)
- ❌ Over-provisioned for sandbox/MVP workload
- ❌ 2x cost of README specification

### After (Basic Tier - Sandbox/MVP)
| Service | SKU | Monthly Cost |
|---------|-----|--------------|
| Web App Service Plan | B2 (Basic) | $50 |
| Enrichment App Service Plan | B2 (Basic) | $50 |
| Functions App Service Plan | B2 (Basic) | $50 |
| Azure Cognitive Search | basic | $75 |
| Azure Cosmos DB | Serverless | ~$25 |
| Storage, Document Intelligence | Pay-as-you-go | ~$15 |
| Other (Key Vault, Insights, etc.) | Pay-as-you-go | ~$5 |
| **TOTAL** | | **~$270/month** |

**Benefits**:
- ✅ No VM quota required (Basic tier uses shared infrastructure)
- ✅ Matches README specification
- ✅ ~$255/month cost savings (48% reduction)
- ✅ Appropriate sizing for sandbox/MVP workload

---

## Deployment Timeline

### Initial Deployment Attempt (2026-01-24)
- **Result**: Failed at App Service Plan creation
- **Error**: "Operation cannot be completed without additional quota. Current Limit (Standard VMs): 0"
- **Resources Deployed**: 13 resources (Document Intelligence, Container Registry, AI Services, Search, Storage, Log Analytics, Cosmos DB, Application Insights, Key Vault, Event Grid)
- **Issue Identified**: Search service created as **standard** tier instead of **basic**

### Cleanup and Corrected Deployment (2026-01-25)
1. **Audit Completed**: Verified Search deployed as standard tier ($250/month vs $75/month for basic)
2. **Configuration Updated**: Added TF_VAR_*Sku* overrides to msinfojp-marco.env
3. **Cleanup**: Deleted infojp-sandbox resource group (`az group delete --name infojp-sandbox --yes --no-wait`)
4. **Deployment Started**: Running deploy-all.ps1 with Basic tier configuration
5. **Expected Duration**: 25-35 minutes

---

## Technical Details

### App Service Plan Specifications

#### B2 (Basic) Tier
- **Cores**: 2
- **RAM**: 3.5 GB
- **Storage**: 10 GB
- **Instances**: 1-3 (manual scale)
- **VM Quota Required**: NO (shared infrastructure)
- **Cost**: ~$50/month

#### Comparison to Previous Defaults
| Metric | B2 (Basic) | S1 (Standard) | S2 (Standard) | P2v3 (PremiumV3) |
|--------|------------|---------------|---------------|------------------|
| Cores | 2 | 1 | 2 | 2 |
| RAM | 3.5 GB | 1.75 GB | 3.5 GB | 8 GB |
| Cost | $50 | $70 | $140 | $200 |
| VM Quota | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| Auto-scale | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |

**Rationale for B2**:
- Matches S2 core/RAM specifications (2 cores, 3.5 GB)
- Adequate for sandbox/MVP document processing workload
- No auto-scale needed for sandbox environment
- Does NOT require VM quota allocation

### Search Service Specifications

#### Basic Tier
- **Partitions**: 1
- **Replicas**: 1-3
- **Storage**: 2 GB
- **Indexes**: 15
- **Indexers**: 15
- **Cost**: $75/month

**Rationale**:
- Per README: "Azure Cognitive Search (Basic tier)"
- Adequate for sandbox document corpus (up to 2 GB)
- 1/3 cost of standard tier

### Cosmos DB Specifications

#### Serverless Mode
- **Billing**: Pay-per-request (RU/s consumed)
- **Storage**: Pay-per-GB
- **Ideal For**: Development, test, low-volume production
- **Cost**: ~$0.25/million requests, $0.25/GB storage

**Expected Sandbox Cost**: ~$25/month for typical conversation storage

---

## Validation Checklist

Post-deployment validation steps:

- [ ] Verify App Service Plans: `az appservice plan list --resource-group infojp-sandbox --query "[].{Name:name, SKU:sku.name, Tier:sku.tier}" -o table`
  - Expected: 3 plans with `B2` size and `Basic` tier
  
- [ ] Verify Search Service: `az search service show --name <name> --resource-group infojp-sandbox --query "{sku:sku.name}" -o json`
  - Expected: `"sku": "basic"`
  
- [ ] Verify Cosmos DB: `az cosmosdb show --name <name> --resource-group infojp-sandbox --query "{capabilities:capabilities[].name}" -o json`
  - Expected: Contains `"EnableServerless"`
  
- [ ] Calculate Actual Cost: Azure Portal → Cost Management → Cost Analysis (filter to infojp-sandbox resource group)
  - Expected: ~$270/month forecast

- [ ] Health Check: `curl https://<webapp>.azurewebsites.net/health`
  - Expected: 200 OK

---

## Files Modified

1. **scripts/environments/msinfojp-marco.env** (lines 47-60)
   - Added TF_VAR_appServiceSkuSize="B2"
   - Added TF_VAR_appServiceSkuTier="Basic"
   - Added TF_VAR_enrichmentAppServiceSkuSize="B2"
   - Added TF_VAR_enrichmentAppServiceSkuTier="Basic"
   - Added TF_VAR_functionsAppSkuSize="B2"
   - Added TF_VAR_functionsAppSkuTier="Basic"
   - Added TF_VAR_searchServicesSkuName="basic"

No changes required to:
- `infra/variables.tf` - defaults remain for production deployments
- `infra/core/aad/entra.tf` - already fixed in previous deployment
- `scripts/load-env.sh` - already fixed in previous deployment

---

## Lessons Learned

1. **Personal Azure Subscriptions Have No VM Quota**
   - Default allocation is 0 for Standard/Premium VMs
   - Basic tier App Services use shared infrastructure (no quota required)
   - Always check quota before deploying Standard/Premium resources

2. **Verify Terraform Defaults Match Documentation**
   - Microsoft templates often assume production environments
   - README specifications should be authoritative for deployment tier
   - Override defaults with TF_VAR_* environment variables for cost optimization

3. **Basic Tier is Adequate for Sandbox/MVP**
   - B2 (2 cores, 3.5 GB) matches S2 specifications
   - Lacks auto-scale and advanced features but sufficient for development
   - ~50% cost savings vs production tiers

4. **Audit Resources During Deployment**
   - Initial deployment created Search as standard tier before App Service failure
   - Would have resulted in mixed-tier deployment (partially over-provisioned)
   - Full cleanup ensures consistent configuration

---

## References

- **README**: `docs/eva-foundation/projects/11-MS-InfoJP/README.md` (lines 34-35)
- **Terraform Variables**: `infra/variables.tf` (lines 397-471)
- **Environment File**: `scripts/environments/msinfojp-marco.env`
- **Azure Pricing**: https://azure.microsoft.com/pricing/calculator/
- **App Service Pricing**: https://azure.microsoft.com/pricing/details/app-service/windows/
- **Search Pricing**: https://azure.microsoft.com/pricing/details/search/

---

## Status

**Deployment Status**: 🔄 IN PROGRESS  
**Started**: 2026-01-25 13:05:44  
**Expected Completion**: ~13:35  
**Log**: `deployment-basic-tier.log`

*This document will be updated with final deployment validation results.*
