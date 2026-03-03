<#
🧩 CONTEXT:
[REPLACE: Brief description of script purpose and business value. Example: "Session
management utility for EVA Suite tracking billable time and generating reports."]

🧩 SYNOPSIS:
    [REPLACE: One-line description. Example: "Manage EVA Suite work sessions"]

🧩 DESCRIPTION:
    [REPLACE: Detailed description of what the script does. Example: "Tracks work
    sessions with start/end times, calculates duration, and generates reports for
    billing and project management."]

🧩 CONTEXT_ENGINEERING:
    Mission: [REPLACE: Primary objective. Example: "Track EVA Suite work sessions"]
    Constraints: [REPLACE: Requirements. Example: "Requires write access to sessions.json"]
    Reuses: [REPLACE: Components reused. Example: "JSON persistence, time calculations"]
    Validates: [REPLACE: Validations performed. Example: "Session dates valid, no overlaps"]

🧩 HOUSEKEEPING:
    Creates: [REPLACE: Resources created. Example: "sessions.json, reports/*.md"]
    Modifies: [REPLACE: Resources modified. Example: "Appends to sessions.json"]
    Validates: [REPLACE: Validation checks. Example: "JSON schema valid, timestamps correct"]
    Cleans: [REPLACE: Cleanup operations. Example: "Archives sessions older than 90 days"]
    Monitors: [REPLACE: Metrics tracked. Example: "Session count, total hours, billing rate"]

🧩 WORKSPACE_MANAGEMENT:
    TreeUpdates: [REPLACE: Yes or No. Example: "No"]
    Navigation: [REPLACE: Yes or No. Example: "No"]
    Caching: [REPLACE: Yes or No. Example: "Yes (caches last 100 sessions)"]
    SessionState: [REPLACE: Yes or No. Example: "Yes (tracks active session)"]

🧩 COMPLIANCE:
    WCAG: [REPLACE: N/A or WCAG level. Example: "N/A (backend script)"]
    Bilingual: [REPLACE: N/A or languages. Example: "N/A (JSON output)"]
    RBAC: [REPLACE: Role requirements. Example: "POD-O DevOps only"]
    ProtectedB: [REPLACE: Yes or No. Example: "No (session metadata only)"]
    Audit: [REPLACE: Audit trail. Example: "Logs all session operations to console"]

.PARAMETER [ParamName]
    [REPLACE: Parameter description]

.EXAMPLE
    .\[script-name].ps1 -Param "value"
    [REPLACE: Example description]

.EXAMPLE
    .\[script-name].ps1
    [REPLACE: Another example]

.NOTES
    POD: [REPLACE: POD-F, POD-X, POD-O, POD-S-*]
    Last Modified: [REPLACE: YYYY-MM-DD]
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = $false)]
    [string]$ExampleParam = "default-value"
)

$ErrorActionPreference = "Stop"

# Script logic goes here
Write-Host "Three Concepts Pattern Template" -ForegroundColor Cyan
Write-Host "Replace placeholders with actual values" -ForegroundColor Yellow
