# Archive - Deprecated Files

**Purpose**: This folder contains deprecated scripts and files that are no longer used in the MS-InfoJP project.

---

## ⚡ Quick Execute Archive Operation

**Double-click to archive root base-platform folder:**
```
ARCHIVE-NOW.bat
```

Or see [STATUS.md](./STATUS.md) for execution options and verification steps.

---

## Archived Files

### `base-platform-deprecated-20260126/` (PENDING ARCHIVE)

**To Be Archived**: `I:\EVA-JP-v1.2\base-platform\` (root level)

**Reason for Archiving**:
- Contains **Terraform/App Service deployment scripts** incompatible with MS-InfoJP approved model
- MS-InfoJP uses **GitHub Codespaces + Raw Azure CLI** (approved solution)
- Infrastructure already deployed Jan 26, 2026 to `infojp-sandbox`
- Scripts would create duplicate resource group and wrong compute model
- Violates [DOCUMENTATION-STANDARDS.md](../DOCUMENTATION-STANDARDS.md) Section 7 standards

**Documentation**:
- ✅ [README-BASE-PLATFORM-ARCHIVED.md](./README-BASE-PLATFORM-ARCHIVED.md) - Comprehensive (1,700+ lines)
- ✅ [ARCHIVE-EXECUTION-GUIDE.md](./ARCHIVE-EXECUTION-GUIDE.md) - Detailed execution guide
- ✅ [STATUS.md](./STATUS.md) - Current status and verification
- ✅ [archive-base-platform.ps1](./archive-base-platform.ps1) - PowerShell script
- ✅ [ARCHIVE-NOW.bat](./ARCHIVE-NOW.bat) - Quick executor

**Correct Location**: `base-platform/` subdirectory (already exists with Microsoft baseline)

---

### `deploy-infojp.ps1.deprecated`

**Original Purpose**: PowerShell script to orchestrate MS-InfoJP deployment via Terraform and build scripts.

**Deprecated Date**: January 26, 2026

**Reason for Deprecation**:
- Script was created as scaffolding but **never executed**
- Actual deployment method is **raw Azure CLI commands** (copy-paste)
- No Terraform used (referenced in script but not deployed that way)
- Deployment successfully completed via manual Azure CLI execution per DEPLOYMENT-PLAN.md

**What Actually Happened**:
- 7 Azure resources deployed on Jan 26, 2026 via copy-paste Azure CLI commands
- 3 resources blocked by App Service quota (0 VMs available)
- See [DEPLOYMENT-STATUS.md](../DEPLOYMENT-STATUS.md) for actual deployment method
- See [DEPLOYMENT-PLAN.md](../DEPLOYMENT-PLAN.md) for the 13 Azure CLI commands used

**Replacement**:
- Use **DEPLOYMENT-PLAN.md** for deployment instructions (raw Azure CLI commands)
- Use **GitHub Codespaces** or **Local Development** for compute (no App Service needed)

**If You Need This Script**:
- Rename from `.deprecated` back to `.ps1`
- Review and update for current architecture (no Terraform, raw Azure CLI)
- Consider creating new simplified script that wraps DEPLOYMENT-PLAN.md commands

---

## Archive Policy

Files in this folder are:
- ✅ Kept for historical reference
- ✅ Excluded from active documentation
- ✅ Not maintained or updated
- ⚠️ May contain outdated information
- ❌ Should not be used without review and updates

To restore an archived file:
1. Review the deprecation reason above
2. Verify if the original problem still exists
3. Update the file for current architecture
4. Move back to project root
5. Update documentation to reference it
