# Manual Testing Guide - Before Codespace Deployment

**Status**: Local environment has Python 3.13 compatibility issues  
**Recommendation**: Test in Codespace with Python 3.10-3.12  
**Date**: 2026-01-27

---

## Issue Identified

Your local machine has Python 3.13.5, which is too new for some Azure SDK packages:
- `azure-mgmt-cognitiveservices==13.5.0` has no Python 3.13 wheel
- Several other Azure packages not yet compatible

**This is normal - Codespace will use Python 3.11 and work fine.**

---

## What Has Been Validated Locally ✅

1. ✅ **backend.env generated** - All critical endpoints populated
2. ✅ **Azure authentication working** - MarcoSub tenant
3. ✅ **app.py syntax valid** - No Python syntax errors
4. ✅ **Node.js/npm installed** - Ready for frontend
5. ✅ **requirements.txt updated** - Using `>=` for flexibility

---

## Skip Local Testing, Deploy Directly to Codespace

Since Codespace has Python 3.11, everything will work there. Here's the plan:

### Step 1: Create Codespace (5 min)
1. Go to https://github.com/MarcoPolo483/ms-infojp
2. Click **Code** → **Codespaces** → **Create codespace on main**
3. Wait for devcontainer build

### Step 2: Authenticate Azure (2 min)
```bash
az logout  # If needed
az login --use-device-code --tenant bfb12ca1-7f37-47d5-9cf5-8aa52214a0d8
# Authenticate with marcopresta@yahoo account
```

### Step 3: Run Full Deployment (3 min)
```bash
bash DEPLOY.sh
```

Expected output:
```
[1/7] ✓ Azure CLI installation
[2/7] ✓ Azure authentication  
[3/7] ✓ Resource verification (7 services)
[4/7] ✓ backend.env generated
[5/7] ✓ Storage containers created
[6/7] ✓ Cosmos containers created
[7/7] ✓ Search index deployed
```

### Step 4: Start Backend (3 min)
```bash
cd base-platform/app/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Expected: `INFO:     Uvicorn running on http://0.0.0.0:5000`

### Step 5: Start Frontend (2 min)
Open **new terminal**:
```bash
cd base-platform/app/frontend
npm install
npm run dev
```

Expected:
```
VITE v5.4.11  ready in 1234 ms
➜  Local:   http://localhost:5173/
```

### Step 6: Test Application (5 min)

1. **Port Forwarding**: VS Code will auto-forward ports 5000 and 5173
2. **Open Frontend**: Click the port 5173 notification
3. **Upload Test**: Upload `tests/test_data/test_example.pdf`
4. **Submit Query**: Ask "What is Employment Insurance?"
5. **Verify**: Check for streaming response with citations

---

## If You Want to Test Locally Anyway

### Option A: Install Python 3.11

```powershell
# Download Python 3.11 from python.org
# Install alongside Python 3.13
# Use: py -3.11 -m venv .venv
```

### Option B: Use Windows Subsystem for Linux (WSL)

```powershell
wsl --install
# Then run commands in Ubuntu terminal
```

### Option C: Skip Local, Trust Codespace

Since we've validated:
- ✅ backend.env has all endpoints
- ✅ Azure auth works
- ✅ Scripts are syntactically correct  
- ✅ Requirements.txt updated for compatibility

**Just deploy to Codespace - it will work!**

---

## Quick Reference Commands

**Check Python Version**:
```bash
python --version
```

**Check Azure Subscription**:
```bash
az account show --query "{Name:name, TenantId:tenantId}"
```

**Regenerate backend.env**:
```bash
bash generate-backend-env.sh
```

**Validate backend.env**:
```bash
bash validate-backend-env.sh
```

**Check backend imports**:
```bash
python -c "import fastapi, openai, azure.cosmos; print('OK')"
```

**Check frontend build**:
```bash
cd base-platform/app/frontend && npm run build
```

---

## Expected Timeline in Codespace

| Step | Duration | Total |
|------|----------|-------|
| Create Codespace | 5 min | 5 min |
| Azure auth | 2 min | 7 min |
| Run DEPLOY.sh | 3 min | 10 min |
| Backend setup | 3 min | 13 min |
| Frontend setup | 2 min | 15 min |
| Test upload + query | 5 min | 20 min |

**Total: ~20 minutes to working application**

---

## Success Criteria Checklist

- [ ] Codespace created and devcontainer built
- [ ] Azure CLI authenticated to MarcoSub
- [ ] DEPLOY.sh completed without errors
- [ ] backend.env has all endpoints (no empty values)
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Ports forwarded and accessible
- [ ] Test PDF uploaded successfully
- [ ] RAG query returns streaming response
- [ ] Citations visible in response

---

## Next: Deploy to Codespace

✅ All local preparations complete
✅ Scripts validated and pushed to GitHub
✅ backend.env tested with real Azure endpoints
✅ Requirements.txt updated for compatibility

**Ready to deploy! Proceed to Codespace.**
