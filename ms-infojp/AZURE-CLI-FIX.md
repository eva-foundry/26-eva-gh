# Azure CLI Authentication Fix for ESDC Managed Device

**Issue**: Group policy `0x800704ec` blocking Azure CLI browser authentication  
**Solution**: Use device code flow

## Step 1: Authenticate with Device Code

```powershell
# Device code flow - bypasses ESDC group policy
az login --use-device-code --tenant bfb12ca1-7f37-47d5-9cf5-8aa52214a0d8
```

**What happens**:
1. Command displays a code (e.g., `ABC123DEF`)
2. Instructions to visit: https://microsoft.com/devicelogin
3. Open the URL in your browser (which works via Azure Portal)
4. Enter the code displayed
5. Authenticate with your marcoprestayahoo.onmicrosoft.com account

## Step 2: Set Subscription

```powershell
# Set your personal subscription
az account set --subscription c59ee575-eb2a-4b51-a865-4b618f9add0a

# Verify authentication
az account show
```

**Expected output**:
```json
{
  "name": "PayAsYouGo Subs 1",
  "id": "c59ee575-eb2a-4b51-a865-4b618f9add0a",
  "tenantId": "bfb12ca1-7f37-47d5-9cf5-8aa52214a0d8",
  "user": {
    "name": "...",
    "type": "user"
  }
}
```

## Step 3: Run Resource Inspection

```powershell
cd "C:\Users\marco.presta\OneDrive - ESDC EDSC\Documents\AICOE\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\scripts"

.\inspect_azure_resources.ps1
```

This will:
- ✅ Check for Azure OpenAI (and list deployments)
- ✅ Check for Azure Cognitive Search
- ✅ Check for Azure Cosmos DB
- ✅ Check for Azure Storage
- ✅ Analyze costs (actual or estimated)
- ✅ Export results to evidence/

## Alternative: VS Code Token Sharing

If device code fails, try:

```powershell
# Clear broken auth
az account clear

# In VS Code: Ctrl+Shift+P → "Azure: Sign In"
# Then verify CLI can use the token:
az account show
```

## Next Steps After Authentication

1. **Check quota**: Verify Azure OpenAI quota available
2. **Review costs**: Analyze current spend from inspection script
3. **Deploy infrastructure**: Run Terraform to provision resources
4. **Configure backend**: Update backend.env with Azure endpoints
5. **Start Phase 0**: Test local backend + frontend

---

**Status**: Ready to authenticate ✅  
**Blocker**: None - device code flow should work  
**Fallback**: VS Code token sharing, Azure Cloud Shell
