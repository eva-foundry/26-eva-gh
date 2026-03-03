# Archived: Root base-platform Folder

**Archived Date**: 2026-01-26  
**Reason**: Incompatible with MS-InfoJP deployment model  
**Original Location**: `I:\EVA-JP-v1.2\base-platform`  
**New Location**: `I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\base-platform`

---

## Why This Was Archived

The root-level `base-platform` folder was initially created during Step 1 of the MS-InfoJP implementation when cloning the Microsoft PubSec-Info-Assistant repository. However, this placement is **incompatible with the MS-InfoJP deployment model** for the following reasons:

### 1. **Project Structure Standards (Project 07)**
According to Project 07 standards that MS-InfoJP follows:
- All project components must reside under `docs/eva-foundation/projects/11-MS-InfoJP/`
- External dependencies should be in a dedicated `base-platform/` subdirectory
- Root-level directories are reserved for EVA Suite-level components

### 2. **Git Management Conflicts**
- The root `base-platform/` was excluded from git via `.gitignore`
- This created confusion about what was tracked vs. external
- The correct approach is to maintain base-platform as a project-scoped dependency

### 3. **Deployment Script Expectations**
- MS-InfoJP deployment scripts expect base-platform at: `docs/eva-foundation/projects/11-MS-InfoJP/base-platform/`
- Professional runner (`run_ms_infojp.bat`) auto-detects this location
- Root-level placement required manual path overrides

---

## What Was in This Folder

The archived `base-platform` folder contained the following Microsoft PubSec-Info-Assistant components:

### Core Directories
- `app/` - Backend (Python/Quart) and Frontend (React/TypeScript/Vite)
  - `app/backend/` - Main FastAPI application, RAG approaches, routers
  - `app/frontend/` - React SPA with Fluent UI components
  - `app/enrichment/` - Flask embeddings service
- `functions/` - Azure Functions for document processing pipeline
- `infra/` - Terraform infrastructure as code
- `scripts/` - Deployment automation
- `tests/` - Functional and unit tests
- `docs/` - Microsoft platform documentation

### Deployment Scripts (root/base-platform/scripts/)
These scripts were at the root level and are **deprecated**:
- `deploy-all-autonomous.sh` - Full autonomous deployment
- `Deploy-Autonomous.ps1` - PowerShell deployment wrapper  
- `deploy-autonomous.sh` - Alternative deployment script
- `deploy-phase1-apps.sh` - Phase 1 application deployment
- `health-monitor.ps1` - Health monitoring script
- `install-terraform.ps1` - Terraform installation
- `preflight-check.ps1` - Pre-deployment validation
- `validate-env.sh` - Environment validation

**Note**: These scripts are superseded by the professional runner system:
- Use `run_ms_infojp.bat` for all deployment operations
- See `scripts/` subdirectory in the new base-platform location

---

## Correct Location for MS-InfoJP Components

### ✅ Current (Correct) Structure
```
I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\
├── base-platform/          ← Microsoft PubSec-Info-Assistant clone
│   ├── app/
│   ├── functions/
│   ├── infra/
│   ├── scripts/
│   └── ...
├── scripts/                ← MS-InfoJP custom scripts
│   ├── run_ms_infojp.bat
│   ├── clone_microsoft_repo.bat
│   └── ...
├── input/                  ← Test questions and data
├── output/                 ← Results and artifacts
├── evidence/               ← Evidence capture
├── logs/                   ← Execution logs
└── IMPLEMENTATION-PROGRESS.md
```

### ❌ Old (Incorrect) Structure
```
I:\EVA-JP-v1.2\
├── base-platform/          ← WRONG: Root level (archived)
│   └── scripts/            ← WRONG: Root scripts (deprecated)
└── docs\eva-foundation\projects\11-MS-InfoJP\
    ├── scripts/            ← Correct: Project scripts
    └── ...
```

---

## References

### Documentation
- [IMPLEMENTATION-PROGRESS.md](../IMPLEMENTATION-PROGRESS.md) - Implementation tracking with Step 1 details
- [architecture-ai-context.md](../architecture-ai-context.md) - System architecture reference
- [VALIDATION-REPORT.md](../VALIDATION-REPORT.md) - Compliance validation (92/100 score)
- [ACCEPTANCE.md](../ACCEPTANCE.md) - Acceptance criteria and test definitions

### Clone Metadata
- Original clone details recorded in: `clone-metadata.json`
- Commit: 807ee181
- Repository: https://github.com/microsoft/PubSec-Info-Assistant
- Clone date: 2026-01-24

### Professional Runner
- **Command**: `run_ms_infojp.bat [command]`
- **Location**: `scripts/run_ms_infojp.bat`
- **Auto-detection**: Finds base-platform at correct project subdirectory
- **Evidence**: All operations logged to `evidence/` and `logs/`

---

## Migration Notes

If you need to reference the original root-level base-platform for any reason:

1. **This archived copy** is preserved for historical reference
2. **Current base-platform** is at: `docs/eva-foundation/projects/11-MS-InfoJP/base-platform/`
3. **Re-clone if needed**: Use `run_ms_infojp.bat clone` (will place in correct location)

### Re-cloning Command
```powershell
cd I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP
scripts\run_ms_infojp.bat clone
```

This will:
- Clone to the correct location automatically
- Generate new metadata in `clone-metadata.json`
- Preserve evidence in `evidence/` directory

---

## Archive Action Tracking

**Action Type**: Directory Relocation (Archive)  
**Executed By**: GitHub Copilot AI Assistant  
**Request**: User requested archival of incompatible root base-platform folder  
**Documentation**: Updated IMPLEMENTATION-PROGRESS.md with archive action details

### Files Updated
- ✅ This README.md created in archived folder
- ✅ IMPLEMENTATION-PROGRESS.md updated with archive action (see "Maintenance Actions")
- ✅ Architecture documentation references corrected (if needed)

---

**Status**: Archive complete - folder preserved for historical reference  
**Next Steps**: Use `docs/eva-foundation/projects/11-MS-InfoJP/base-platform/` for all MS-InfoJP operations
