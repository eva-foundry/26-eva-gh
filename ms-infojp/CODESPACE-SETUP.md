# GitHub Codespace Setup Guide

## Quick Start (5 Minutes)

### Step 1: Create Codespace (3 minutes)
1. Go to https://github.com/MarcoPolo483/ms-infojp
2. Click **Code** → **Codespaces** → **Create codespace on main**
3. Wait for container to build (~3 minutes)

### Step 2: Run Deployment Script (2 minutes)
```bash
bash DEPLOY.sh
```

**What it does:**
- ✅ Installs Azure CLI (pip method)
- ✅ Authenticates to Azure (you complete device code in browser)
- ✅ Verifies resource group access
- ✅ Generates backend.env from Azure resources
- ✅ Creates blob storage containers
- ✅ Creates Cosmos DB containers
- ✅ Deploys Azure Search index

### Step 3: Start Servers

**Terminal 1 - Backend:**
```bash
cd base-platform/app/backend
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd base-platform/app/frontend
npm install && npm run dev
```

VS Code will show port forwarding notifications. Click to open frontend.

---

## Troubleshooting

### Azure CLI Not Found
If `az` command not found after DEPLOY.sh:
```bash
pip install --user azure-cli
export PATH="$HOME/.local/bin:$PATH"
```

### Authentication Fails
```bash
az login --use-device-code
az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a
az account show
```

### Backend.env Not Generated
```bash
cd base-platform
make extract-env
cat app/backend/backend.env
```

### Containers Already Exist
This is fine - script detects existing containers and skips creation.

### Search Index Deployment Warning
If search index shows warning, verify manually:
```bash
az search index list --service-name infojp-srch --resource-group infojp-sandbox
```

---

## Manual Setup (If DEPLOY.sh Fails)

```bash
# 1. Install Azure CLI
pip install --user azure-cli
export PATH="$HOME/.local/bin:$PATH"

# 2. Authenticate
az login --use-device-code
az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a

# 3. Generate config
cd base-platform && make extract-env

# 4. Create containers
az storage container create --account-name infojpst01 --name documents --auth-mode login
az storage container create --account-name infojpst01 --name upload --auth-mode login
az storage container create --account-name infojpst01 --name text-enrichment-output --auth-mode login

# 5. Create Cosmos containers
az cosmosdb sql database create --account-name infojp-cosmos --resource-group infojp-sandbox --name statusdb
az cosmosdb sql container create --account-name infojp-cosmos --resource-group infojp-sandbox --database-name statusdb --name conversations --partition-key-path "/id"
az cosmosdb sql container create --account-name infojp-cosmos --resource-group infojp-sandbox --database-name statusdb --name sessions --partition-key-path "/id"

# 6. Deploy search index
cd base-platform && make deploy-search-indexes
```

---

## Expected Resources

### Azure Resource Group: infojp-sandbox
- **ao-sandbox** - Azure OpenAI (GPT-4, embeddings)
- **infojp-srch** - Azure Cognitive Search
- **infojp-cosmos** - Cosmos DB (NoSQL)
- **infojpst01** - Storage Account (blobs)
- **infojpstfunc01** - Storage Account (functions)
- **infojp-ai-svc** - AI Services
- **infojp-doc-intel** - Document Intelligence
- **infojp-kv** - Key Vault

### Storage Containers (infojpst01)
- `documents` - Uploaded documents
- `upload` - Upload staging
- `text-enrichment-output` - Processed chunks

### Cosmos Containers (infojp-cosmos/statusdb)
- `conversations` - Chat history
- `sessions` - User sessions

### Search Index (infojp-srch)
- `index-jurisprudence` - Vector + keyword index

---

## Development Workflow

1. **Edit backend code**: `base-platform/app/backend/`
2. **Edit frontend code**: `base-platform/app/frontend/src/`
3. **Hot reload**: Both servers auto-reload on file changes
4. **Test RAG**: Upload PDF via frontend, submit query
5. **Check logs**: Backend terminal shows request/response details

---

## Destroying and Recreating Codespace

If something goes wrong:
1. GitHub → Codespaces → Delete codespace
2. Create new codespace
3. Run `bash DEPLOY.sh` again
4. Takes 5 minutes total

This guide ensures repeatable setup.
