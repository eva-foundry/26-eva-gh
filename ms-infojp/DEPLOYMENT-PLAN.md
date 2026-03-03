# MS-InfoJP Infrastructure Deployment Guide
## RAW Azure CLI Commands - Zero Abstraction Edition

**Updated**: 2026-01-26  
**Purpose**: Deploy MS-InfoJP infrastructure with B1 Basic SKUs for 3GB data, 1-2 users  
**Method**: Copy-paste raw Azure CLI commands ONE BY ONE into PowerShell/Bash  
**Time**: 5-10 minutes total  
**Location Strategy**: East US (to match existing ao-sandbox Azure OpenAI)  
**Subscription**: c59ee575-eb2a-4b51-a865-4b618f9add0a  
**Tenant**: bfb12ca1-7f37-47d5-9cf5-8aa52214a0d8  
**Resource Group**: infojp-sandbox  
**Publisher Email**: marco.presta@hrsdc-rhdcc-gc.ca

⚠️ **SECURITY NOTICE**: This document contains OpenAI API keys. Treat as CONFIDENTIAL. Do NOT commit to Git.

---

## Pre-Flight Checklist

Before running commands, verify your Azure CLI context:

```powershell
# Verify you're in the correct subscription
az account show

# Expected output should show:
# - name: "MarcoSub"
# - id: "c59ee575-eb2a-4b51-a865-4b618f9add0a"
# - tenantId: "bfb12ca1-7f37-47d5-9cf5-8aa52214a0d8"

# If wrong subscription, set it:
az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

✅ Ready to deploy once subscription confirmed

---

## Location Decision Matrix

| Service | Location | Reason | Cost Impact |
|---------|----------|--------|-------------|
| **Resource Group** | East US | Primary region | N/A |
| **Storage Account** | East US | Data locality with OpenAI | Same |
| **Cognitive Search** | East US | Fastest index updates | Same |
| **Cosmos DB** | East US | Low latency with backend | Same |
| **App Services** | East US | Closest to OpenAI/Search | Same |
| **Functions** | East US | Process files near storage | Same |
| **Key Vault** | East US | Secret access speed | Same |
| **APIM** | East US | API gateway locality | Same |
| **Document Intelligence** | East US | Regional availability | Same |
| **AI Services** | East US | Content safety + OpenAI | Same |
| **Existing Azure OpenAI** | **East US** (ao-sandbox) | **Already deployed** | **$0 (reuse)** |

**Why East US?**
- ✅ Your existing **ao-sandbox** (gpt-4o + text-embedding-3-small) is already in East US
- ✅ All services available in this region
- ✅ Lower latency between services
- ✅ Same pricing as Canada Central for B1/Basic SKUs
- ✅ Better Azure OpenAI capacity/availability

---

## Estimated Monthly Cost

| Service | SKU | Monthly Cost | Purpose |
|---------|-----|--------------|---------|
| **Cognitive Search** | Basic | ~$75 | 2GB storage, 15 indexes (perfect for MVP) |
| **App Service Plans** | 2x B1 Basic | ~$26 | Backend + Enrichment (1 vCPU, 1.75GB each) |
| **Storage Accounts** | 2x Standard LRS | ~$6 | Documents + Functions storage (3GB total) |
| **Cosmos DB** | Serverless | ~$1-5 | Session/log storage (pay-per-use) |
| **APIM** | Consumption | ~$0-5 | API gateway (first 1M requests free) |
| **Document Intelligence** | S0 Pay-per-use | ~$1-5 | OCR processing (usage-based) |
| **AI Services** | S0 Pay-per-use | ~$1-5 | Content safety (usage-based) |
| **Function App** | Consumption | ~$0-5 | Document processing (first 1M free) |
| **Key Vault** | Standard | ~$0.03 | Secrets management (10k ops/month) |
| **Azure OpenAI** | **Existing (ao-sandbox)** | **$0** | **Reusing existing resource** |
| **OpenAI API** | gpt-4o-mini (optional) | ~$5-15 | Development testing alternative |
| **TOTAL (Standard)** | | **~$120-130/month** | With APIM, MVP for 3GB data, 1-2 users |
| **TOTAL (Optimized)** | | **~$105-145/month** | With all optimizations + OpenAI API |

---

## Part 1: GitHub Codespaces Setup ✅ APPROVED SOLUTION

**Cost**: $0/month (within GitHub Pro 180 hrs/month free tier)  
**Time**: ~5 minutes initial setup  
**Advantage**: No Azure VM quota required, full development environment

### Step 1: Create .devcontainer Configuration

Create `.devcontainer/devcontainer.json` in the `base-platform/` directory:

```json
{
  "name": "MS-InfoJP Development",
  "image": "mcr.microsoft.com/devcontainers/python:3.11",
  "features": {
    "ghcr.io/devcontainers/features/azure-cli:1": {},
    "ghcr.io/devcontainers/features/node:1": {
      "version": "20"
    }
  },
  "postCreateCommand": "pip install --upgrade pip && pip install -r app/backend/requirements.txt && cd app/frontend && npm install",
  "forwardPorts": [5000, 5173, 5001],
  "portsAttributes": {
    "5000": {
      "label": "Backend API",
      "onAutoForward": "notify"
    },
    "5173": {
      "label": "Frontend (Vite)",
      "onAutoForward": "openPreview"
    },
    "5001": {
      "label": "Enrichment Service",
      "onAutoForward": "notify"
    }
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-python.vscode-pylance",
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "ms-azuretools.vscode-azurefunctions",
        "ms-vscode.azurecli"
      ],
      "settings": {
        "python.defaultInterpreterPath": "/usr/local/bin/python",
        "python.linting.enabled": true,
        "python.formatting.provider": "black",
        "editor.formatOnSave": true
      }
    }
  }
}
```

### Step 2: Launch Codespace

1. **From GitHub Web**:
   - Navigate to your repository
   - Click **"Code"** dropdown
   - Select **"Codespaces"** tab
   - Click **"Create codespace on main"**
   - Wait ~2 minutes for container build

2. **From VS Code Desktop** (if GitHub Codespaces extension installed):
   - Press `Ctrl+Shift+P`
   - Type "Codespaces: Create New Codespace"
   - Select your repository and branch

### Step 3: Authenticate to Azure

```bash
# Use device code authentication (works in Codespaces)
az login --use-device-code

# Set subscription
az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a

# Verify connection
az account show
```

### Step 4: Configure Backend Environment

Create `app/backend/backend.env`:

```bash
# Azure OpenAI (reusing existing ao-sandbox)
AZURE_OPENAI_ENDPOINT=https://ao-sandbox.openai.azure.com/
AZURE_OPENAI_CHAT_DEPLOYMENT=gpt-4o
AZURE_OPENAI_EMBEDDING_DEPLOYMENT=text-embedding-3-small
AZURE_OPENAI_API_VERSION=2024-02-15-preview

# Azure Search
AZURE_SEARCH_ENDPOINT=https://infojp-srch.search.windows.net
AZURE_SEARCH_INDEX=index-jurisprudence

# Azure Cosmos DB
AZURE_COSMOSDB_ENDPOINT=https://infojp-cosmos.documents.azure.com:443/
AZURE_COSMOSDB_DATABASE=conversations

# Azure Storage
AZURE_STORAGE_ACCOUNT=infojpst01

# Azure Key Vault
AZURE_KEY_VAULT_ENDPOINT=https://infojp-kv.vault.azure.net/

# Network mode (public endpoints)
OPTIMIZED_KEYWORD_SEARCH_OPTIONAL=true
ENRICHMENT_OPTIONAL=true

# CORS (allow Codespaces forwarded ports)
ALLOWED_ORIGINS=https://*.github.dev,http://localhost:5173
```

### Step 5: Start Development Servers

**Terminal 1 - Backend**:
```bash
cd app/backend
python -m venv .venv
source .venv/bin/activate  # Linux/Mac in Codespaces
pip install -r requirements.txt
python app.py
```

**Terminal 2 - Frontend**:
```bash
cd app/frontend
npm install
npm run dev
```

**Terminal 3 - Enrichment (Optional)**:
```bash
cd app/enrichment
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Step 6: Access Application

VS Code will automatically forward ports:
- **Frontend**: Click "Open in Browser" notification for port 5173
- **Backend API**: Available at forwarded port 5000
- **Swagger Docs**: `{forwarded-port-5000}/docs`

### Step 7: Usage Monitoring

**Check Codespaces usage**:
```bash
# View current Codespace details
gh codespace list

# Check hours consumed this month
# Visit: https://github.com/settings/billing/summary
```

**Your allocation**: 180 hours/month (2-core) with GitHub Pro
- ~6 hours/day of development time
- Sufficient for MVP development and testing

### Step 8: Stop Codespace When Idle

**Auto-stop**: Codespaces auto-stop after 30 minutes of inactivity (configurable)

**Manual stop**:
```bash
# From VS Code: Codespaces menu → Stop Current Codespace
# Or: Close browser/VS Code window (auto-stops after timeout)
```

---

## Part 2: Azure Infrastructure Deployment

**Prerequisites**: Complete Part 1 (Codespaces) OR have local dev environment ready

## Deployment Commands (Copy-Paste Ready)

**Time**: 5-10 minutes  
**Method**: Copy each command, paste into PowerShell, press Enter  
**Important**: Wait for each command to complete before running the next

### Command 1: Create Resource Group (~10 seconds)

```powershell
az group create --name infojp-sandbox --location eastus --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

### Command 2: Create Storage Account for Documents (~30 seconds)

**Note**: Storage account names can ONLY contain lowercase letters and numbers (no hyphens allowed by Azure)

```powershell
az storage account create `
  --name infojpst `
  --resource-group infojp-sandbox `
  --location eastus `
  --sku Standard_LRS `
  --kind StorageV2 `
  --https-only true `
  --allow-blob-public-access false `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

### Command 3: Create Cognitive Search Service (~2-3 minutes)

```powershell
az search service create `
  --name infojp-srch `
  --resource-group infojp-sandbox `
  --location eastus `
  --sku basic `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Cost**: ~$75/month | **Capacity**: 2GB storage, 15 indexes

### Command 4: Create Cosmos DB Account (~3-5 minutes)

```powershell
az cosmosdb create `
  --name infojp-cosmos `
  --resource-group infojp-sandbox `
  --location eastus `
  --capabilities EnableServerless `
  --default-consistency-level Session `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Cost**: ~$1-5/month (pay-per-use)

### Command 5: Create App Service Plan for Backend (~15 seconds) - 💡 OPTIONAL

**Note**: App Service Plans require Azure VM quota. Currently unavailable (0 VM quota). Use GitHub Codespaces instead (see Part 1) - no quota required, $0 cost.

```powershell
# ⚠️ SKIP THIS IF USING CODESPACES - Only needed for 24/7 production hosting
az appservice plan create `
  --name infojp-asp `
  --resource-group infojp-sandbox `
  --location eastus `
  --sku B1 `
  --is-linux `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Cost**: ~$13/month | **Specs**: 1 vCPU, 1.75GB RAM

### Command 6: Create Backend Web App (~20 seconds) - 💡 OPTIONAL

**Note**: Requires Command 5 (App Service Plan). Use Codespaces for development instead.

```powershell
# ⚠️ SKIP THIS IF USING CODESPACES
az webapp create `
  --name infojp-webapp-backend `
  --resource-group infojp-sandbox `
  --plan infojp-asp `
  --runtime "PYTHON:3.11" `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

### Command 7: Create App Service Plan for Enrichment (~15 seconds) - 💡 OPTIONAL

**Note**: Only needed for 24/7 production hosting. Use Codespaces for development.

```powershell
# ⚠️ SKIP THIS IF USING CODESPACES
az appservice plan create `
  --name infojp-asp-enrich `
  --resource-group infojp-sandbox `
  --location eastus `
  --sku B1 `
  --is-linux `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Cost**: ~$13/month | **Specs**: 1 vCPU, 1.75GB RAM

### Command 8: Create Enrichment Web App (~20 seconds) - 💡 OPTIONAL

**Note**: Requires Command 7 (App Service Plan). Use Codespaces for development.

```powershell
# ⚠️ SKIP THIS IF USING CODESPACES
az webapp create `
  --name infojp-webapp-enrich `
  --resource-group infojp-sandbox `
  --plan infojp-asp-enrich `
  --runtime "PYTHON:3.11" `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

### Command 9: Create Storage Account for Functions (~30 seconds)

**Note**: Storage account names can ONLY contain lowercase letters and numbers (no hyphens allowed by Azure)

```powershell
az storage account create `
  --name infojpstfunc `
  --resource-group infojp-sandbox `
  --location eastus `
  --sku Standard_LRS `
  --kind StorageV2 `
  --https-only true `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

### Command 10: Create Function App (~30 seconds) - 💡 OPTIONAL

**Note**: Functions can run locally or in Codespaces for development. Only deploy for automated document processing.

```powershell
# ⚠️ OPTIONAL - For automated document processing pipeline
az functionapp create `
  --name infojp-func `
  --resource-group infojp-sandbox `
  --storage-account infojpstfunc `
  --consumption-plan-location eastus `
  --runtime python `
  --runtime-version 3.11 `
  --functions-version 4 `
  --os-type linux `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Cost**: ~$0-5/month (first 1M executions free)

### Command 11: Create Key Vault (~20 seconds)

```powershell
az keyvault create `
  --name infojp-kv `
  --resource-group infojp-sandbox `
  --location eastus `
  --sku standard `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Cost**: ~$0.03/month (10k operations)

### Command 12: Create APIM (API Management) (~2-3 minutes) - 💡 OPTIONAL (Post-MVP)

**Note**: APIM is Phase 4 feature (see README.md). Not needed for MVP development.

```powershell
# ⚠️ SKIP FOR MVP - Deploy in Phase 4 (APIM Integration)
az apim create `
  --name infojp-apim `
  --resource-group infojp-sandbox `
  --location eastus `
  --publisher-email marco.presta@hrsdc-rhdcc-gc.ca `
  --publisher-name "InfoJP Sandbox - Marco Presta" `
  --sku-name Consumption `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Cost**: ~$0-5/month | **Free Tier**: First 1M requests/month, then $0.035 per 10k requests

### Command 13: Create Document Intelligence Resource (~20 seconds)

```powershell
az cognitiveservices account create `
  --name infojp-doc-intel `
  --resource-group infojp-sandbox `
  --location eastus `
  --kind FormRecognizer `
  --sku S0 `
  --yes `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Cost**: ~$1.50 per 1000 pages (pay-per-use)

### Command 14: Create AI Services Resource (~20 seconds)

```powershell
az cognitiveservices account create `
  --name infojp-ai-svc `
  --resource-group infojp-sandbox `
  --location eastus `
  --kind CognitiveServices `
  --sku S0 `
  --yes `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Cost**: ~$1-5/month (content safety, pay-per-use)

---

## OpenAI API Key Setup and Testing

### Available OpenAI API Keys

You have two OpenAI API keys available for testing:

**Key 1: EVA_OPENAI_API_KEY (Created 2025-11-24)**
```
sk-proj-xxxxx...REDACTED...xxxxx
```

**Key 2: VS Code Continue (Created 2026-01-21)**
```
sk-proj-xxxxx...REDACTED...xxxxx
```

### Test Script: Verify OpenAI Keys Work

**Before storing keys in Azure**, test them to ensure they work. Save this as `test-openai-keys.ps1`:

```powershell
# Test OpenAI API Keys
$keys = @{
    "EVA_OPENAI_API_KEY (2025-11-24)" = "sk-proj-xxxxx...REDACTED...xxxxx"
    "VS Code Continue (2026-01-21)" = "sk-proj-xxxxx...REDACTED...xxxxx"
}

foreach ($keyName in $keys.Keys) {
    $apiKey = $keys[$keyName]
    Write-Host "`n=== Testing: $keyName ===" -ForegroundColor Cyan
    
    $headers = @{
        "Authorization" = "Bearer $apiKey"
        "Content-Type" = "application/json"
    }
    
    $body = @{
        model = "gpt-4o-mini"
        messages = @(
            @{
                role = "user"
                content = "Say 'API key works!'"
            }
        )
        max_tokens = 10
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "https://api.openai.com/v1/chat/completions" -Method Post -Headers $headers -Body $body
        Write-Host "[PASS] SUCCESS!" -ForegroundColor Green
        Write-Host "   Response: $($response.choices[0].message.content)" -ForegroundColor White
        Write-Host "   Model: $($response.model)" -ForegroundColor Gray
        Write-Host "   Tokens: $($response.usage.total_tokens) (prompt: $($response.usage.prompt_tokens), completion: $($response.usage.completion_tokens))" -ForegroundColor Gray
        Write-Host "   Key Status: VALID" -ForegroundColor Green
    } catch {
        Write-Host "[FAIL] FAILED!" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "   Key Status: INVALID or EXPIRED" -ForegroundColor Red
    }
}

Write-Host "`n=== Test Complete ===" -ForegroundColor Cyan
Write-Host "Choose the working key to use in your deployment." -ForegroundColor Yellow
```

**Run the test**:
```powershell
.\test-openai-keys.ps1
```

---

## Next Steps (After Infrastructure Deployed)

### Step 1: Grant Permissions

**Web Apps need access to Storage/Search/Cosmos/Key Vault**:

```powershell
# Get backend web app identity
$backendId = az webapp identity assign --name infojp-webapp-backend --resource-group infojp-sandbox --query principalId -o tsv

# Get enrichment web app identity
$enrichId = az webapp identity assign --name infojp-webapp-enrich --resource-group infojp-sandbox --query principalId -o tsv

# Get function app identity
$funcId = az functionapp identity assign --name infojp-func --resource-group infojp-sandbox --query principalId -o tsv

# Grant Storage Blob Data Contributor to all
az role assignment create --assignee $backendId --role "Storage Blob Data Contributor" --scope "/subscriptions/c59ee575-eb2a-4b51-a865-4b618f9add0a/resourceGroups/infojp-sandbox/providers/Microsoft.Storage/storageAccounts/infojpst"
az role assignment create --assignee $enrichId --role "Storage Blob Data Contributor" --scope "/subscriptions/c59ee575-eb2a-4b51-a865-4b618f9add0a/resourceGroups/infojp-sandbox/providers/Microsoft.Storage/storageAccounts/infojpst"
az role assignment create --assignee $funcId --role "Storage Blob Data Contributor" --scope "/subscriptions/c59ee575-eb2a-4b51-a865-4b618f9add0a/resourceGroups/infojp-sandbox/providers/Microsoft.Storage/storageAccounts/infojpst"

# Grant Search Index Data Contributor
az role assignment create --assignee $backendId --role "Search Index Data Contributor" --scope "/subscriptions/c59ee575-eb2a-4b51-a865-4b618f9add0a/resourceGroups/infojp-sandbox/providers/Microsoft.Search/searchServices/infojp-srch"
az role assignment create --assignee $enrichId --role "Search Index Data Contributor" --scope "/subscriptions/c59ee575-eb2a-4b51-a865-4b618f9add0a/resourceGroups/infojp-sandbox/providers/Microsoft.Search/searchServices/infojp-srch"
az role assignment create --assignee $funcId --role "Search Index Data Contributor" --scope "/subscriptions/c59ee575-eb2a-4b51-a865-4b618f9add0a/resourceGroups/infojp-sandbox/providers/Microsoft.Search/searchServices/infojp-srch"

# Grant Cosmos DB Data Contributor
az cosmosdb sql role assignment create --account-name infojp-cosmos --resource-group infojp-sandbox --scope "/" --principal-id $backendId --role-definition-id "00000000-0000-0000-0000-000000000002"
az cosmosdb sql role assignment create --account-name infojp-cosmos --resource-group infojp-sandbox --scope "/" --principal-id $enrichId --role-definition-id "00000000-0000-0000-0000-000000000002"

# Grant Key Vault Secrets User to backend
az role assignment create `
  --assignee $backendId `
  --role "Key Vault Secrets User" `
  --scope "/subscriptions/c59ee575-eb2a-4b51-a865-4b618f9add0a/resourceGroups/infojp-sandbox/providers/Microsoft.KeyVault/vaults/infojp-kv"

Write-Host "[FOUND] Backend Identity: $backendId" -ForegroundColor Green
Write-Host "[FOUND] Backend app can now read secrets from Key Vault" -ForegroundColor Green
```

### Step 2: Store OpenAI API Key in Key Vault

**After testing keys, choose the working one** and store it:

#### Option A: Use EVA_OPENAI_API_KEY (if test passed)

```powershell
az keyvault secret set `
  --vault-name infojp-kv `
  --name openai-api-key `
  --value "sk-proj-xxxxx...REDACTED...xxxxx" `
  --description "EVA OpenAI API Key - Created 2025-11-24" `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

#### Option B: Use VS Code Continue Key (if test passed)

```powershell
az keyvault secret set `
  --vault-name infojp-kv `
  --name openai-api-key `
  --value "sk-proj-xxxxx...REDACTED...xxxxx" `
  --description "VS Code Continue OpenAI Key - Created 2026-01-21" `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

#### Verify Secret Stored

```powershell
# List all secrets
az keyvault secret list --vault-name infojp-kv --query "[].name" -o tsv

# Show the stored secret (verify it's correct)
az keyvault secret show `
  --vault-name infojp-kv `
  --name openai-api-key `
  --query "value" `
  -o tsv
```

### Step 3: Create Storage Containers

### Step 2: Create Storage Containers

```powershell
# Get storage account key
$storageKey = az storage account keys list --account-name infojpst --resource-group infojp-sandbox --query "[0].value" -o tsv

# Create containers
az storage container create --name documents --account-name infojpst --account-key $storageKey
az storage container create --name upload --account-name infojpst --account-key $storageKey
az storage container create --name chunks --account-name infojpst --account-key $storageKey
```

### Step 4: Create Cosmos DB Containers

```powershell
# Create database
az cosmosdb sql database create --account-name infojp-cosmos --resource-group infojp-sandbox --name conversations

# Create containers
az cosmosdb sql container create --account-name infojp-cosmos --resource-group infojp-sandbox --database-name conversations --name sessions --partition-key-path "/userId"
az cosmosdb sql container create --account-name infojp-cosmos --resource-group infojp-sandbox --database-name conversations --name messages --partition-key-path "/sessionId"
az cosmosdb sql container create --account-name infojp-cosmos --resource-group infojp-sandbox --database-name conversations --name logs --partition-key-path "/timestamp"
```

### Step 5: Configure Backend for OpenAI API

Edit `i:\EVA-JP-v1.2\app\backend\backend.env`:

```bash
# OpenAI Configuration (via Key Vault)
USE_AZURE_OPENAI=false
AZURE_KEY_VAULT_ENDPOINT=https://infojp-kv.vault.azure.net/
OPENAI_API_KEY_SECRET_NAME=openai-api-key
OPENAI_API_BASE=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small

# APIM Configuration
APIM_GATEWAY_URL=https://infojp-apim.azure-api.net
API_BASE_URL=${APIM_GATEWAY_URL}
```

**Backend code should read**:
```python
from azure.keyvault.secrets import SecretClient
from azure.identity import DefaultAzureCredential

# Get APIM gateway URL
az apim show --name infojp-apim --resource-group infojp-sandbox --query "gatewayUrl" -o tsv
import os

# Initialize Key Vault client
kv_endpoint = os.getenv("AZURE_KEY_VAULT_ENDPOINT")
credential = DefaultAzureCredential()
secret_client = SecretClient(vault_url=kv_endpoint, credential=credential)

# Read OpenAI API key from Key Vault
secret_name = os.getenv("OPENAI_API_KEY_SECRET_NAME", "openai-api-key")
openai_api_key = secret_client.get_secret(secret_name).value
```

### Step 6: Verify APIM Deployment

```powershell
# Check APIM status
az apim show `
  --name infojp-apim `
  --resource-group infojp-sandbox `
  --query "{Name:name, Status:provisioningState, GatewayUrl:gatewayUrl}" `
  -o table

# Get APIM gateway URL
$apimUrl = az apim show `
  --name infojp-apim `
  --resource-group infojp-sandbox `
  --query "gatewayUrl" `
  -o tsv

Write-Host "`nAPIM Gateway URL: $apimUrl" -ForegroundColor Green
Write-Host "Use this URL in frontend API_BASE_URL configuration" -ForegroundColor Yellow
```

### Step 7: Deploy Application Code

**Deploy from your local workspace** (not covered in this guide - see backend/frontend deployment docs)

---

## Alternative: Direct App Setting (Quick Testing)

If you want to test quickly **without Key Vault integration**:

```powershell
# Set OpenAI API key directly as App Setting (encrypted at rest)
az webapp config appsettings set `
  --name infojp-webapp-backend `
  --resource-group infojp-sandbox `
  --settings `
    USE_AZURE_OPENAI=false `
    OPENAI_API_KEY="PASTE_WORKING_KEY_HERE" `
    OPENAI_MODEL=gpt-4o-mini `
    OPENAI_EMBEDDING_MODEL=text-embedding-3-small `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Trade-off**: 
- ✅ Simpler (no Key Vault SDK code needed)
- ✅ Still encrypted at rest by Azure
- ❌ Less secure than Key Vault
- ❌ No audit trail for key access
- ❌ Harder to rotate keys

---

## Verification Commands

```powershell
# List all resources in resource group
az resource list --resource-group infojp-sandbox --output table

# Check web app status
az webapp show --name infojp-webapp-backend --resource-group infojp-sandbox --query "state" -o tsv

# Check function app status
az functionapp show --name infojp-func --resource-group infojp-sandbox --query "state" -o tsv

# Get endpoints
az webapp show --name infojp-webapp-backend --resource-group infojp-sandbox --query "defaultHostName" -o tsv
az search service show --name infojp-srch --resource-group infojp-sandbox --query "endpoint" -o tsv
az cosmosdb show --name infojp-cosmos --resource-group infojp-sandbox --query "documentEndpoint" -o tsv
```

---

## Troubleshooting

### Storage Account Name Already Taken

If `infojpst` or `infojpstfunc` are already taken globally:

```powershell
# Try with your initials or numbers
az storage account create --name infojpstmp01 ...  # or infojpstmarco, infojpst2026, etc.
```

**Remember**: Storage account names:
- Must be globally unique across ALL of Azure
- Can only contain lowercase letters and numbers
- Must be 3-24 characters
- Cannot contain hyphens, underscores, or special characters

### Resource Provider Not Registered

```powershell
az provider register --namespace Microsoft.CognitiveServices --wait
az provider register --namespace Microsoft.Search --wait
az provider register --namespace Microsoft.DocumentDB --wait
az provider register --namespace Microsoft.ApiManagement --wait
az provider register --namespace Microsoft.Storage --wait
az provider register --namespace Microsoft.Web --wait
az provider register --namespace Microsoft.KeyVault --wait
```

### Permission Denied Errors

Make sure your account has Owner or Contributor role on the subscription:

```powershell
az role assignment list --assignee YOUR_EMAIL@domain.com --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

### Command Takes Too Long

Some resources (Cosmos DB, Cognitive Search) can take 3-5 minutes. If stuck:
1. Check Azure Portal → Resource Group → Deployments
2. Look for error messages
3. Cancel with Ctrl+C and retry

### Key Test Fails

```powershell
# Check OpenAI account status
# Visit: https://platform.openai.com/account/usage

# Check key permissions
# Visit: https://platform.openai.com/api-keys

# Verify you have credits/billing setup
```

### APIM Creation Fails

```powershell-130/month (standard) or ~$105-145/month (with optimizations)  
**Largest costs**: Cognitive Search Basic (~$75), 2x App Service B1 (~$26), OpenAI API usage-based
az provider show --namespace Microsoft.ApiManagement --query "registrationState"

# Register if needed
az provider register --namespace Microsoft.ApiManagement --wait
```

### Backend Can't Read Key Vault

```powershell
# Verify managed identity exists
az webapp identity show --name infojp-webapp-backend --resource-group infojp-sandbox

# Verify role assignment
az role assignment list `
  --assignee $backendId `
  --scope "/subscriptions/c59ee575-eb2a-4b51-a865-4b618f9add0a/resourceGroups/infojp-sandbox/providers/Microsoft.KeyVault/vaults/infojp-kv" `
  -o table
```

---

## Cost Management

**Set up budget alert** (recommended):

```powershell
# View current month costs
az consumption usage list --start-date 2026-01-01 --end-date 2026-01-31 --query "[].{Service:instanceName, Cost:pretaxCost}" --output table

# Monitor daily
az monitor metrics list --resource /subscriptions/c59ee575-eb2a-4b51-a865-4b618f9add0a --metric-names "Cost" --aggregation Total
```

**Expected monthly cost**: ~$120
**Largest costs**: Cognitive Search Basic (~$75), 2x App Service B1 (~$26)

---

## Cleanup (To Delete Everything)

**WARNING**: This deletes ALL resources and data permanently

```powershell
az group delete --name infojp-sandbox --yes --no-wait --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Takes 5-10 minutes to complete**

---

## Security Notes

⚠️ **CRITICAL SECURITY WARNINGS**:

1. **OpenAI API Keys Exposed**: The two OpenAI keys in this document are now exposed:
   - Treat this file as **CONFIDENTIAL**
   - Do NOT commit to Git
   - Add to `.gitignore`: `*DEPLOYMENT-PLAN*.md`, `*OPENAI*.md`, `*API*KEY*.md`
   - After deployment and key storage in Key Vault, consider **rotating these keys**

2. **Key Rotation Steps** (After deployment):
   - Visit: https://platform.openai.com/api-keys
   - Delete both exposed keys
   - Generate new keys
   - Test new keys with `test-openai-keys.ps1`
   - Update Key Vault with new keys

3. **File Handling**:
   - After successful deployment, move this file to secure location
   - Or delete this file entirely (keep only in secure backup)
   - Do NOT share this file via email or messaging

4. **Key Vault Best Practices**:
   - Always use Key Vault for production secrets
   - Enable Key Vault audit logging
   - Use managed identities for access (no connection strings)
   - Rotate keys regularly (every 90 days recommended)

---

## Cost Optimization Options

### 💰 Option 1: Ultra-Budget Mode (~$55-70/month - saves $50)

**Merge Backend + Enrichment into ONE App Service Plan:**

Instead of running Commands 5-8 separately, use this approach to share resources:

```powershell
# Create SINGLE App Service Plan for both apps
az appservice plan create `
  --name infojp-asp `
  --resource-group infojp-sandbox `
  --location eastus `
  --sku B1 `
  --is-linux `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a

# Create Backend Web App
az webapp create `
  --name infojp-webapp-backend `
  --resource-group infojp-sandbox `
  --plan infojp-asp `
  --runtime "PYTHON:3.11" `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a

# Create Enrichment Web App on SAME plan (this shares the B1 resources)
az webapp create `
  --name infojp-webapp-enrich `
  --resource-group infojp-sandbox `
  --plan infojp-asp `
  --runtime "PYTHON:3.11" `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Cost Impact**: Saves ~$13/month (2 apps share 1 B1 plan instead of 2 separate B1 plans)  
**Trade-off**: Both apps share 1 vCPU + 1.75GB RAM. Fine for 1-2 users with 3GB data, might be slower under heavy concurrent load.

---

### 💰 Option 2: Cosmos DB Free Tier (saves $1-5/month)

Cosmos DB Serverless still charges for usage. For ultra-low usage scenarios:

```powershell
# Instead of Command 4, create with Free Tier (one per subscription)
az cosmosdb create `
  --name infojp-cosmos `
  --resource-group infojp-sandbox `
  --location eastus `
  --enable-free-tier true `
  --default-consistency-level Session `
  --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
```

**Limits**: 1000 RU/s, 25GB storage (plenty for MVP with 1-2 users)  
**Savings**: ~$1-5/month  
**Restriction**: Only ONE free tier Cosmos DB per Azure subscription (check if you already have one)

---

### 💰 Option 3: OpenAI API for Development Testing

If you have OpenAI API access and want to test without Azure OpenAI:

**Add to backend.env**:APIM + OpenAI API:**

✅ **Use Ultra-Budget Mode** (1 shared App Service Plan) → saves $13/month  
✅ **Use Cosmos DB Free Tier** (if available) → saves $5/month  
✅ **Start with OpenAI API (gpt-4o-mini)** for testing → very low cost during dev  
✅ **Use APIM Consumption tier** → $0 for first 1M requests
AZURE_OPENAI_CHAT_DEPLOYMENT=gpt-4o
AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT=text-embedding-3-small
AZURE_OPENAI_API_VERSION=2024-02-15-preview

# Option B: Use OpenAI API (your key) - For testing/development
USE_AZURE_OPENAI=false
OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
OPENAI_API_BASE=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini  # Much cheaper: $0.150/$0.600 per 1M tokens
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
```

**Cost Comparison**:
- **Azure OpenAI gpt-4o**: $5.00 input / $15.00 output per 1M tokens
- **OpenAI API gpt-4o-mini**: $0.150 input / $0.600 output per 1M tokens (97% cheaper!)
- For light usage (100 queries/day): ~$5-15/month with gpt-4o-mini

**When to use**: 
- ✅ Development and testing (faster iteration, no Azure quota wait)
- ✅ Cost-sensitive sandbox experiments
- ❌ Production (use Azure OpenAI for governance, compliance, private endpoints)

---

## Recommended Configuration for Sandbox

**Based on "pocket money" budget + OpenAI API availability:**

✅ **Use Ultra-Budget Mode** (1 shared App Service Plan) → saves $13/month  
✅ **Use Cosmos DB Free Tier** (if available) → saves $5/month  
✅ **Start with OpenAI API (gpt-4o-mini)** for testing → very low cost during dev  
✅ **Keep Azure OpenAI (ao-sandbox)** ready for production when needed

### Optimized Cost Breakdown

| Service | SKU | Monthly Cost | Notes |
|---------|-----|--------------|-------|
| **Cognitive Search** | Basic | ~$75 | Largest cost, no cheaper option |
| **App Service Plan** | 1x B1 Basic (shared) | ~$13 | Was $26 with 2 plans |
| **Storage Accounts** | 2x Standard LRS | ~$6 | 3GB data + functions |
| **APIM** | Consumption | **~$0-5** | First 1M requests free |
| **Function App** | Consumption | ~$0-5 | First 1M executions free |
| **Key Vault** | Standard | ~$0.03 | 10k operations |
| **Document Intelligence** | S0 Pay-per-use | ~$1-5 | OCR usage-based |
| **AI Services** | S0 Pay-per-use | ~$1-5 | Content safety |
| **OpenAI API** | gpt-4o-mini (dev) | ~$5-15 | Dev/test only |
| **Azure OpenAI** | ao-sandbox (ready) | **$0** | Already deployed, use for prod |
| **TOTAL (Optimized)** | | **~$100-115/month** | Down from $120-130 |

---

## Part 3: GitHub Pages Deployment (Optional Enhancement)

**Cost**: $0/month (free static site hosting)  
**Use Case**: Always-on demo frontend without Azure App Service  
**Limitation**: Frontend only - backend must run in Codespaces or Azure App Service

### Step 1: Build Production Frontend

```bash
# In Codespace or local environment
cd app/frontend

# Update API endpoint for production backend
# Edit src/api/api.ts or .env.production:
VITE_API_BASE_URL=https://<your-backend-url>

# Build optimized production bundle
npm run build

# Output: dist/ directory with static files
```

### Step 2: Create GitHub Actions Workflow

Create `.github/workflows/deploy-frontend.yml`:

```yaml
name: Deploy Frontend to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: |
          cd app/frontend
          npm ci
          
      - name: Build frontend
        run: |
          cd app/frontend
          npm run build
          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: app/frontend/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 3: Enable GitHub Pages

1. **Repository Settings** → **Pages**
2. **Source**: GitHub Actions
3. **Custom Domain** (optional): Add `infojp.yourdomain.com`
4. **Enforce HTTPS**: Enable (automatic with GitHub Pages)

### Step 4: Configure Backend CORS

Update `app/backend/backend.env`:

```bash
# Add GitHub Pages origin
ALLOWED_ORIGINS=https://yourorg.github.io,https://infojp.yourdomain.com,http://localhost:5173,https://*.github.dev
```

### Step 5: Deploy

```bash
# Commit and push workflow
git add .github/workflows/deploy-frontend.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin main

# Workflow runs automatically, frontend deployed to:
# https://<username>.github.io/<repo-name>/
```

### GitHub Pages Advantages

✅ **$0 Cost**: Free static hosting, 100GB bandwidth/month  
✅ **Auto SSL**: HTTPS with Let's Encrypt certificate  
✅ **Custom Domain**: Support custom domains with SSL  
✅ **Global CDN**: Fast delivery worldwide  
✅ **CI/CD**: Auto-deploy on git push  
✅ **Always On**: 24/7 availability without Codespaces quota

### GitHub Pages Limitations

❌ **Static Only**: Backend must run separately (Codespaces or Azure)  
❌ **Public Repos**: Free for public repos, requires GitHub Pro for private  
❌ **Build Minutes**: 2,000 Actions minutes/month with GitHub Free, 3,000 with Pro  
❌ **No Server-Side**: Can't run Python backend, only static React bundle

### Hybrid Architecture: GitHub Pages + Codespaces

**Best of both worlds for MVP**:
- **Frontend**: GitHub Pages (always-on, $0 cost)
- **Backend**: Codespaces when developing/testing (180 hrs/month free with GitHub Pro)
- **Total Cost**: $0 compute + $84-96/month Azure services = **$84-96/month**

**Trade-off**: Backend not available 24/7 (only when Codespace running)  
**Solution**: Launch Codespace before demos, stop when idle

---

## Summary: Approved Architecture

### ✅ RECOMMENDED FOR MVP (Approved January 26, 2026)

**Compute**: GitHub Codespaces (180 hrs/month free with GitHub Pro)  
**Frontend**: GitHub Pages (optional, $0 for always-on demos)  
**Backend**: Run in Codespace (port forwarding for development/testing)  
**Azure Services**: 8 core resources deployed (Search, Cosmos, Storage, etc.)  
**Monthly Cost**: $84-96 (Azure only) + $0 compute = **$84-96/month**

### Deployment Steps

1. ✅ **Azure Infrastructure** (Commands 1-4, 9, 11, 13-14) - COMPLETED
2. ⏳ **GitHub Codespaces** (Part 1) - READY TO LAUNCH
3. 💡 **GitHub Pages** (Part 3, optional) - For always-on frontend demos
4. 💡 **Azure App Service** (Commands 5-8, optional) - Requires VM quota approval

### What You Can Do Today

1. Launch Codespace from `base-platform/` directory
2. Configure `app/backend/backend.env` with Azure endpoints
3. Start backend (5000) and frontend (5173) in Codespace
4. Develop and test with full Azure integration
5. Stop Codespace when idle (auto-stops after 30 min)

### Future Enhancements (Optional)

**GitHub Pages** (+$0/month):
- Deploy frontend to GitHub Pages for always-on demos
- Configure CORS to allow GitHub Pages origin
- Use Codespace for backend when needed

**Azure App Service** (+$26/month):
- Request VM quota increase (1-3 business days)
- Deploy Commands 5-8 for 24/7 backend hosting
- Enable custom domain with SSL
- Production-grade monitoring and scaling

---

**NEXT**: Launch Codespace and start development! See [README.md](./README.md) Quickstart section.

**Minimum possible**: ~$95/month (if Cosmos free tier available and minimal OpenAI usage)

**Azure-only baseline** (without OpenAI API): ~$100/month

---

## Reference: Existing Resources

### ao-sandbox (Azure OpenAI - Already Deployed)

**Location**: East US  
**Resource Group**: rg-sandbox  
**Cost**: $0 (reusing existing resource)

**Deployments**:
- `gpt-4o` - Model version 2024-08-06
- `text-embedding-3-small` - Version 1

**Configuration for backend.env**:
```bash
AZURE_OPENAI_ENDPOINT=https://ao-sandbox.openai.azure.com/
AZURE_OPENAI_CHAT_DEPLOYMENT=gpt-4o
AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT=text-embedding-3-small
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

---

## Deployment Complete!
-130/month (standard)  
**Minimum possible**: ~$95/month (with Cosmos free tier + minimal usage)

**Next Steps**:
1. ✅ Run `test-openai-keys.ps1` to verify which key works
2. ✅ Store working key in Key Vault
3. ✅ Configure backend.env with Key Vault endpoint and APIM gateway
4. ✅ Deploy application code
5. ✅ Test end-to-end: Frontend → APIM → Backend → OpenAI API
6. ⚠️ Rotate exposed OpenAI keys for security

See [DEPLOYMENT-STATUS.md](./DEPLOYMENT-STATUS.md) for deployment checklist and status tracking.

---

**Document Owner**: Marco Presta (marco.presta@hrsdc-rhdcc-gc.ca)  
**Last Updated**: 2026-01-26  
**Status**: SINGLE SOURCE OF TRUTH - All APIM and OpenAI setup integrated

See [DEPLOYMENT-STATUS.md](./DEPLOYMENT-STATUS.md) for deployment checklist and status tracking.
az search service show --name <search-name> --resource-group <rg-name>

# Test Cosmos DB
az cosmosdb list --output table

# Test Storage
az storage account list --output table
```

---

## Phase 5: Start Local Development

### Backend Setup

```powershell
cd "C:\Users\marco.presta\OneDrive - ESDC EDSC\Documents\AICOE\EVA-JP-v1.2\app\backend"

# Activate virtual environment
.\.venv\Scripts\Activate.ps1

# Install dependencies (if not already)
pip install -r requirements.txt

# Start backend
python app.py
```

**Expected**: Backend running on http://localhost:5000

**Test**:
```powershell
# Health check
curl http://localhost:5000/health

# Expected: {"status": "healthy"}
```

### Frontend Setup

```powershell
cd "C:\Users\marco.presta\OneDrive - ESDC EDSC\Documents\AICOE\EVA-JP-v1.2\app\frontend"

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**Expected**: Frontend running on http://localhost:5173

**Test**: Open browser → http://localhost:5173 → Chat interface loads

---

## Phase 6: Cost Monitoring Setup

### Azure Portal Configuration

1. **Navigate**: Azure Portal → Cost Management + Billing → Cost Management → Budgets
2. **Create Budget**:
   - Name: `MS-InfoJP-Monthly-Budget`
   - Scope: Subscription (c59ee575-eb2a-4b51-a865-4b618f9add0a)
   - Reset period: Monthly
   - Budget amount: $500

3. **Add Alerts**:
   - Alert 1: 50% of budget ($250) → Email
   - Alert 2: 75% of budget ($375) → Email
   - Alert 3: 100% of budget ($500) → Email + SMS

### CLI Cost Monitoring

```powershell
# Daily cost check
az consumption usage list --start-date (Get-Date).AddDays(-7).ToString("yyyy-MM-dd") --end-date (Get-Date).ToString("yyyy-MM-dd") --output table

# Weekly cost report
.\scripts\inspect_azure_resources.ps1  # Includes cost analysis
```

---

## Troubleshooting

### Issue: Backend Can't Reach Azure Services

**Error**: `403 Forbidden` or `Connection timeout`

**Solution**:
1. Verify `LOCAL_DEBUG=true` in backend.env
2. Check Azure Portal → Resource → Networking → Allow access from "All networks" (for dev)
3. Verify Managed Identity has permissions
4. Set fallback flags: `OPTIMIZED_KEYWORD_SEARCH_OPTIONAL=true`, `ENRICHMENT_OPTIONAL=true`

### Issue: High Costs

**Warning**: Costs exceeding estimate

**Solution**:
1. Check Azure Portal → Cost Analysis → Group by Resource
2. Identify high-cost resource (likely Azure OpenAI token usage)
3. Reduce `AZURE_OPENAI_CHATGPT_MODEL_CAPACITY` in backend.env
4. Switch from `gpt-4o` to `gpt-35-turbo-16k` (10x cheaper)
5. Implement rate limiting in code

---

## Success Criteria

- [x] Azure CLI authenticated
- [x] All resource providers registered
- [x] Azure infrastructure deployed (8 services in infojp-sandbox)
- [x] All MS-InfoJP requirements met (OpenAI, Search, Cosmos, Storage, AI Services, Document Intelligence, Key Vault)
- [x] GitHub Codespaces approved as compute solution
- [ ] backend.env configured with Azure endpoints
- [ ] Backend starts successfully in Codespace (port 5000)
- [ ] Frontend starts successfully in Codespace (port 5173)
- [ ] Cost monitoring alerts configured
- [ ] Evidence files generated (connectivity reports, inspection results)

---

## Next Steps After Deployment

1. **Test Document Upload**: Upload test PDF to verify pipeline
2. **Configure Search Index**: Run index creation scripts
3. **Test Chat Interface**: Verify RAG retrieval working
4. **Monitor Costs**: Review daily for first week
5. **Implement AC-001**: Start acceptance testing (authentication)
6. **Create CanLII CDC Component**: Build jurisprudence ingestion

---

**Deployment Status**: Infrastructure Complete (Jan 26, 2026)  
**Next Step**: Launch GitHub Codespace and start application development  
**Monthly Cost**: $84-96 (Azure services) + $0 compute (GitHub Pro 180 hrs/month)
