# Archive Instructions

This folder contains archived components that are no longer compatible with the current MS-InfoJP deployment model.

## How to Complete the Archive

Please execute the following PowerShell command to move the deprecated base-platform folder:

```powershell
Move-Item -Path "I:\EVA-JP-v1.2\base-platform" -Destination "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\base-platform-deprecated-20260126"
```

After moving, the README.md explaining the archive will be automatically created in the archived folder.

---

**Archived Date**: 2026-01-26  
**Reason**: Incompatible deployment structure - see README in archived folder after move operation
