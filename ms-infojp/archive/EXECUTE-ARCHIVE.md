# Execute Archive Operation

## Quick Command

Run this PowerShell command to archive the root base-platform folder:

```powershell
cd "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive"
.\archive-base-platform.ps1
```

## What This Does

1. Moves `I:\EVA-JP-v1.2\base-platform` → `archive\base-platform-deprecated-20260126`
2. Verifies the move operation
3. Lists the contents of the archived folder
4. Copies the detailed README.md into the archived folder

## After Execution

The script will display:
- [SUCCESS] message if move completed
- List of directories and files that were moved
- Location of the archive
- Reference to the README.md for details

## Verification

After running the script, you can verify:

```powershell
# Check that root base-platform is gone
Test-Path "I:\EVA-JP-v1.2\base-platform"
# Should return: False

# Check that archive exists
Test-Path "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\base-platform-deprecated-20260126"
# Should return: True

# View the README
Get-Content "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\base-platform-deprecated-20260126\README.md"
```

## Documentation Updated

The following files have been prepared/updated:
- ✅ `archive\archive-base-platform.ps1` - PowerShell script to perform the move
- ✅ `archive\README-ARCHIVE-INSTRUCTIONS.md` - Instructions (this file)
- ✅ `archive\README-BASE-PLATFORM-ARCHIVED.md` - Detailed README for archived folder
- ✅ `IMPLEMENTATION-PROGRESS.md` - Updated with "Maintenance Actions" section

## Rollback (If Needed)

If you need to undo the operation:

```powershell
Move-Item -Path "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\base-platform-deprecated-20260126" -Destination "I:\EVA-JP-v1.2\base-platform" -Force
```

---

**Ready to execute**: Run the PowerShell script above to complete the archive operation.
