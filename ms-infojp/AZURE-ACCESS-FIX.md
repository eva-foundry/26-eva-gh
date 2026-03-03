# MS-InfoJP Azure Access Fix

## Issue Detected
Your subscription `c59ee575-eb2a-4b51-a865-4b618f9add0a` is in a different tenant than your current login.

**Current Tenant**: f8cdef31-a31e-4b4a-93e4-5f571e91255a  
**Required Tenant**: bfb12ca1-7f37-47d5-9cf5-8aa52214a0d8

## Solution Options

### Option 1: Login to Correct Tenant (Recommended)

```powershell
# Logout first
az logout

# Login to the correct tenant
az login --tenant bfb12ca1-7f37-47d5-9cf5-8aa52214a0d8

# Set your subscription
az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a

# Verify
az account show

# Now run the inspection script
.\scripts\inspect_azure_resources.ps1
```

### Option 2: Quick Manual Inspection via Azure Portal

1. Go to: https://portal.azure.com
2. Select subscription: c59ee575-eb2a-4b51-a865-4b618f9add0a
3. Check for these resources:
   - **Azure OpenAI** (search "OpenAI" in portal)
   - **Azure Cognitive Search** (search "Cognitive Search")
   - **Azure Cosmos DB** (search "Cosmos DB")
   - **Azure Storage Accounts** (search "Storage accounts")
   - **Resource Groups** (left menu)

### Option 3: Use OpenAI API for Now

Since you have OpenAI API key: `sk-proj-...qnwA`

Run this to check OpenAI API:
```powershell
$env:OPENAI_API_KEY = "sk-proj-xxxxx...REDACTED...xxxxx"
.\scripts\check_openai_api.ps1
```

## For MS-InfoJP Development

**Immediate Next Steps**:

1. **If Azure resources exist** → Configure backend.env with Azure endpoints
2. **If no Azure resources** → Use OpenAI API temporarily for Phase 0 baseline
3. **Deploy Azure infrastructure** → Run terraform to provision all services

## Quick Start: Use OpenAI API for Development

While you sort out Azure tenant access, you can start development with OpenAI API:

### 1. Check OpenAI API
```powershell
.\scripts\check_openai_api.ps1 -ApiKey "sk-proj-xxxxx...REDACTED...xxxxx"
```

### 2. Configure backend.env with OpenAI API
```bash
# base-platform/app/backend/backend.env
OPENAI_API_KEY=sk-proj-xxxxx...REDACTED...xxxxx
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_EMBEDDING_MODEL=text-embedding-ada-002

# Disable Azure-specific features for now
OPTIMIZED_KEYWORD_SEARCH_OPTIONAL=true
ENRICHMENT_OPTIONAL=true
```

### 3. Start Phase 0 Baseline
```powershell
# Navigate to base platform
cd base-platform

# Backend setup
cd app/backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python app.py  # Port 5000

# Frontend setup (new terminal)
cd app/frontend
npm install
npm run dev  # Port 5173
```

## Recommendation

**For now**: Use OpenAI API to get started with Phase 0 baseline setup.  
**Next week**: Fix Azure tenant access and deploy proper Azure infrastructure.

This lets you make progress on MS-InfoJP while resolving Azure access issues.
