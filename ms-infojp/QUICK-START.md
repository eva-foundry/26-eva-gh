# MS-InfoJP Quick Start Guide
**Fresh Info-JP Deployment (NOT ESDC EVA-JP-v1.2)**

## What You're Deploying

- **Base Platform**: Fresh Microsoft PubSec-Info-Assistant clone (commit 807ee181, Jan 24 2026)
- **Location**: `base-platform/` subdirectory
- **Purpose**: Jurisprudence AI assistant MVP
- **Cost**: ~$110/month (Azure OpenAI pending approval)
- **Deployment Time**: 60-90 minutes

## Prerequisites Checklist

- [x] Azure CLI authenticated (subscription c59ee575-eb2a-4b51-a865-4b618f9add0a)
- [x] Azure infrastructure deployed (Jan 26, 2026)
- [x] Python 3.13.5 installed
- [x] Node.js 24.11.0 installed
- [x] GitHub Pro account (for 180 hrs/month Codespaces free tier)

## Deployment Options

### Option 1: Automated Deployment (Recommended)

```powershell
# Navigate to Project 11
cd 'C:\Users\marco.presta\OneDrive - ESDC EDSC\Documents\AICOE\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP'

# Run deployment script
.\deploy-infojp.ps1 -Phase All
```

The script will:
1. Create `.env` from template
2. Prompt you to review configuration
3. Deploy Terraform infrastructure (30-45 min)
4. Build applications
5. Deploy applications
6. Open webapp in browser for testing

### Option 2: Phased Manual Deployment

```powershell
# Phase 1: Configure
.\deploy-infojp.ps1 -Phase Config
# Edit base-platform/scripts/environments/.env as needed

# Phase 2: Infrastructure (30-45 min)
.\deploy-infojp.ps1 -Phase Infrastructure

# Phase 3: Build
.\deploy-infojp.ps1 -Phase Build

# Phase 4: Deploy
.\deploy-infojp.ps1 -Phase Deploy

# Phase 5: Test
.\deploy-infojp.ps1 -Phase Test
```

### Option 3: Fully Manual Deployment

```powershell
# Navigate to deployment root
cd 'C:\Users\marco.presta\OneDrive - ESDC EDSC\Documents\AICOE\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\base-platform'

# 1. Create .env configuration
mkdir -p scripts\environments
cp ..\.env.template scripts\environments\.env
# Edit .env as needed

# 2. Deploy infrastructure
cd infra
terraform init
terraform plan -out=tfplan
terraform apply tfplan

# 3. Build and deploy applications
cd ..
bash ./scripts/build.sh
bash ./scripts/deploy-webapp.sh
bash ./scripts/deploy-enrichment-webapp.sh
bash ./scripts/deploy-functions.sh

# 4. Test deployment
# Retrieve webapp URL from Terraform outputs
cd infra
terraform output webapp_url
```

## Azure Resources Overview

Deployed on Jan 26, 2026 to subscription c59ee575-eb2a-4b51-a865-4b618f9add0a:

- **Resource Group**: infojp-sandbox (East US)
- **Azure OpenAI**: ao-sandbox (existing, gpt-4o + text-embedding-3-small)
- **Cognitive Search**: infojp-srch (Basic tier, $75/month)
- **Cosmos DB**: infojp-cosmos (Serverless, $1-5/month)
- **Storage Accounts**: infojpst01, infojpstfunc01 (Standard_LRS)
- **AI Services**: infojp-ai-svc (S0 pay-per-use)
- **Document Intelligence**: infojp-doc-intel (S0 pay-per-use)
- **Key Vault**: infojp-kv (Standard, RBAC)

**Monthly Cost**: $84-96 (Azure services only) + $0 compute (Codespaces)

See [DEPLOYMENT-STATUS.md](./DEPLOYMENT-STATUS.md) for complete deployment command history.

### Applications

1. **Backend API** (`app/backend/app.py`) - RAG implementation with Azure OpenAI
2. **Frontend** (`app/frontend/`) - React/TypeScript SPA with Fluent UI
3. **Enrichment Service** (`app/enrichment/app.py`) - Embedding generation Flask API
4. **Document Pipeline** (`functions/`) - Azure Functions for OCR, chunking, indexing

## Post-Deployment Verification

### 1. Verify Azure Resources

Check Azure Portal that all 8 services are running:
- infojp-sandbox resource group
- ao-sandbox, infojp-srch, infojp-cosmos, infojpst01, infojpstfunc01, infojp-ai-svc, infojp-doc-intel, infojp-kv

### 2. Test Document Upload

1. Access frontend via Codespace port forwarding (port 5173)
2. Click "Upload Document"
3. Select test PDF (e.g., legal case)
4. Wait for processing (2-5 minutes)
5. Query: "What is the key decision in this case?"

### 3. Verify Document Processing

Check Azure Portal:
- **Storage Account** (infojpst01): `documents` container should have uploaded files
- **AI Search** (infojp-srch): `index-jurisprudence` should have document chunks
- **Cosmos DB** (infojp-cosmos): `conversations` database tracks sessions

### 4. Monitor Costs

```bash
# Get current month spending
az consumption usage list --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a \
  --start-date $(date -d "$(date +%Y-%m-01)" +%Y-%m-%d) \
  --end-date $(date +%Y-%m-%d) \
  --query "[].{Resource:instanceName, Cost:pretaxCost}" -o table
```

## Troubleshooting

### GitHub Codespace not starting

- Check GitHub Pro subscription is active (Settings → Billing)
- Verify 180 hrs/month limit not exceeded
- Try creating new codespace if stuck

### Azure CLI not authenticated in Codespace

```bash
az login --use-device-code
az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
az account show  # Verify correct subscription
```

### Backend fails to start

- Verify backend.env configured with infojp-sandbox endpoints
- Check Azure OpenAI key in Key Vault: infojp-kv
- Review logs for connection errors

### "Resource already exists"

```bash
# Destroy and redeploy
cd base-platform\infra
terraform destroy
terraform apply
```

### "Cost too high"

Disable optional features in `.env`:
```bash
export ENABLE_WEB_CHAT=false
export ENABLE_MATH_ASSISTANT=false
export ENABLE_TABULAR_DATA_ASSISTANT=false
```

## Next Steps After Successful Deployment

1. **Cherry-Pick ESDC Improvements**
   - Review EVA-JP-v1.2 RAG approaches
   - Copy enhanced chatreadretrieveread.py
   - Test improvements one at a time

2. **Load Jurisprudence Documents**
   - Upload Canadian legal cases
   - Test retrieval quality
   - Adjust search parameters

3. **User Acceptance Testing**
   - Legal experts test queries
   - Collect feedback on citation accuracy
   - Refine prompts and chunking strategy

4. **Production Hardening** (Future)
   - Enable SECURE_MODE=true (VNet, private endpoints)
   - Add RBAC and document-level access control
   - Implement audit logging

## Support & Documentation

- **Full Documentation**: See [README.md](./README.md)
- **Deployment Status**: [DEPLOYMENT-STATUS.md](./DEPLOYMENT-STATUS.md)
- **EVA-JP-v1.2 Reference**: 4 levels up (for cherry-picking after base works)
- **Architecture Context**: [architecture-ai-context.md](./architecture-ai-context.md)

## Quick Reference: File Locations

```
Project 11 Root: docs/eva-foundation/projects/11-MS-InfoJP/
├── .env.template              # Configuration template
├── deploy-infojp.ps1          # Automated deployment script
├── QUICK-START.md             # This file
├── README.md                  # Full documentation
├── DEPLOYMENT-STATUS.md       # Deployment tracker
└── base-platform/             # Fresh Info-JP clone
    ├── infra/                 # Terraform IaC
    ├── scripts/               # Deployment scripts
    │   └── environments/.env  # Active configuration (create from template)
    ├── app/
    │   ├── backend/           # RAG API
    │   ├── frontend/          # React UI
    │   └── enrichment/        # Embeddings service
    └── functions/             # Document processing pipeline
```

---

**Last Updated**: 2026-01-25  
**Deployment Root**: `base-platform/` (NOT EVA-JP-v1.2 root)  
**Base Platform**: Microsoft PubSec-Info-Assistant (commit 807ee181)
