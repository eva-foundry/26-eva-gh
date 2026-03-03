# Archive Execution Guide - Root base-platform

**Date**: January 26, 2026  
**Action**: Archive incompatible root base-platform folder  
**Destination**: `I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\base-platform-deprecated-20260126`

---

## Quick Execute

**Option 1: Double-click batch file** (easiest)
```
I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\ARCHIVE-NOW.bat
```

**Option 2: Run PowerShell script**
```powershell
cd "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive"
.\archive-base-platform.ps1
```

**Option 3: Manual PowerShell**
```powershell
Move-Item -Path "I:\EVA-JP-v1.2\base-platform" `
          -Destination "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\base-platform-deprecated-20260126" `
          -Force
```

---

## What Will Be Archived

### Source Location
`I:\EVA-JP-v1.2\base-platform\`

### Contents Being Archived

**Microsoft PubSec-Info-Assistant Baseline** (commit 807ee181):
- `app/` - Backend and frontend applications
- `functions/` - Azure Functions for document processing
- `infra/` - Terraform infrastructure code
- `scripts/` - Deployment and utility scripts (30+ files)
- `tests/` - Test framework and test data
- `docs/` - Microsoft documentation
- Various config files (Makefile, package.json, requirements.txt, etc.)

**Custom Autonomous Deployment Scripts** (root base-platform/scripts/):
- `Deploy-Autonomous.ps1` - PowerShell wrapper (100 lines)
- `deploy-all-autonomous.sh` - Master orchestrator (139 lines)
- `deploy-autonomous.sh` - Phase 0 infrastructure (161 lines)
- `deploy-phase1-apps.sh` - Phase 1 applications (193 lines)
- `preflight-check.ps1` - Pre-flight validation (231 lines)
- `health-monitor.ps1` - Resource health monitoring (125 lines)
- `install-terraform.ps1` - Terraform installer (42 lines)
- `validate-env.sh` - Environment validation (58 lines)
- `environments/msinfojp-marco.env` - Environment configuration

**Total**: ~1,049 lines of custom scripts + complete Microsoft baseline (~100 MB)

---

## Why Archiving?

### Incompatibility with MS-InfoJP Deployment Model

| Aspect | Root base-platform | MS-InfoJP (Approved) |
|--------|-------------------|---------------------|
| **Deployment Method** | Terraform (`inf-create.sh`) | Raw Azure CLI commands |
| **Compute Solution** | App Service Plans | GitHub Codespaces |
| **Infrastructure** | Creates new `infoasst-$WORKSPACE` | Uses existing `infojp-sandbox` |
| **Network Model** | VNet + private endpoints | Public endpoints only |
| **Cost Model** | ~$110-122/month | ~$84-96/month |
| **Environment Config** | `TF_VAR_*` exports | Direct Azure endpoints in `backend.env` |

### Documentation Standards Conflict

Per [DOCUMENTATION-STANDARDS.md](../DOCUMENTATION-STANDARDS.md) Section 7:
- **Approved Compute**: GitHub Codespaces ($0/month with GitHub Pro)
- **Deployment Source**: `base-platform/` subdirectory (Microsoft baseline, correctly placed)
- **Network Architecture**: "Public endpoints only (personal Azure subscription)"

Merging Terraform/App Service scripts would contradict these canonical standards.

### Project 07 Compliance

The autonomous scripts violate Project 07 standards:
- ❌ Assume external dependencies at repo root (`../scripts/inf-create.sh`)
- ❌ Not self-contained within project folder
- ❌ Different deployment paradigm than documented approach
- ❌ Would require updating all 5 documentation files to explain dual-deployment model

---

## After Archiving

### Correct Microsoft Baseline Location
`I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\base-platform\`

This location already has the Microsoft PubSec-Info-Assistant clone with the correct structure:
- Cloned on Jan 24, 2026 at 17:52:34
- Commit: 807ee181
- Verified by professional runner
- Documented in IMPLEMENTATION-PROGRESS.md

### To Re-Clone (If Ever Needed)
```cmd
cd "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP"
run_ms_infojp.bat clone
```

This will place the Microsoft baseline in the correct location automatically.

---

## Verification After Archive

Run these commands to verify the archive completed successfully:

```powershell
# Verify source is gone
Test-Path "I:\EVA-JP-v1.2\base-platform"
# Should return: False

# Verify archive exists
Test-Path "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\base-platform-deprecated-20260126"
# Should return: True

# List archived contents
Get-ChildItem "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\base-platform-deprecated-20260126"
# Should show: app/, functions/, infra/, scripts/, tests/, docs/, etc.

# Verify README exists
Test-Path "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\base-platform-deprecated-20260126\README.md"
# Should return: True
```

---

## Documentation Updates

After executing the archive, the following files have been updated:

1. **[IMPLEMENTATION-PROGRESS.md](../IMPLEMENTATION-PROGRESS.md)** - Added "Maintenance Actions" section
2. **[archive/README-BASE-PLATFORM-ARCHIVED.md](./README-BASE-PLATFORM-ARCHIVED.md)** - Comprehensive archive documentation
3. This file - Execution guide

No other documentation requires updates as there were **zero references** to the root base-platform location in any MS-InfoJP markdown files (verified via grep search).

---

## Rollback (If Needed)

If you need to restore the folder:

```powershell
Move-Item -Path "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\base-platform-deprecated-20260126" `
          -Destination "I:\EVA-JP-v1.2\base-platform" `
          -Force
```

However, this is **not recommended** as the scripts are incompatible with the approved deployment model.

---

## Support

For questions about:
- **MS-InfoJP deployment**: See [DEPLOYMENT-STATUS.md](../DEPLOYMENT-STATUS.md)
- **Approved compute solution**: See [DOCUMENTATION-STANDARDS.md](../DOCUMENTATION-STANDARDS.md) Section 7
- **Development workflow**: See [README.md](../README.md) or [QUICK-START.md](../QUICK-START.md)
- **This archive**: See [README-BASE-PLATFORM-ARCHIVED.md](./README-BASE-PLATFORM-ARCHIVED.md)

---

**Status**: Ready to execute  
**Risk**: LOW (preserves scripts in archive, prevents deployment confusion)  
**Time**: < 1 minute execution  
**Reversible**: Yes (simple Move-Item back)
