# ================================
# EVA Memory Structure + New Artifacts Map
# ================================

# Work out paths based on where this script lives
# Script path: ...\eva-suite\scripts\init-eva-memory.ps1
$scriptRoot   = Split-Path -Parent $MyInvocation.MyCommand.Path
$root         = (Resolve-Path (Join-Path $scriptRoot "..")).Path          # eva-suite
$solutionRoot = Split-Path $root -Parent                                  # EVA Suite solution root

$vault           = Join-Path $root "docs\_vault"
$intake          = Join-Path $root "_intake"
$evaOrchestrator = Join-Path $solutionRoot "eva-orchestrator"

# 1) Create folder structure
$folders = @(
    # Vault
    $vault,
    (Join-Path $vault "EVA-DA-2.0"),
    (Join-Path $vault "EVA-FinOps"),
    (Join-Path $vault "Agile-Crew"),
    (Join-Path $vault "Governance"),
    (Join-Path $vault "Architecture"),

    # Intake root
    $intake,
    (Join-Path $intake "orchestrator-cdds"),
    (Join-Path $intake "arch-decisions"),
    (Join-Path $intake "backlog"),
    (Join-Path $intake "eva-2.0"),
    (Join-Path $intake "finops"),
    (Join-Path $intake "imported-ideas"),
    (Join-Path $intake "prompts"),
    (Join-Path $intake "screenshots"),
    (Join-Path $intake "random-dumps"),
    (Join-Path $intake "temporary")
)

Write-Host "Creating EVA memory structure under $root ..." -ForegroundColor Cyan

foreach ($f in $folders) {
    if (-not (Test-Path $f)) {
        New-Item -ItemType Directory -Path $f | Out-Null
        Write-Host "  Created: $f"
    } else {
        Write-Host "  Exists:  $f"
    }
}

# 2) Build "new artifacts" map for last N days
$daysBack = 21
$cutoff   = (Get-Date).AddDays(-$daysBack)

Write-Host ""
Write-Host "Scanning eva-orchestrator for files modified in the last $daysBack days (since $cutoff)..." -ForegroundColor Cyan

if (-not (Test-Path $evaOrchestrator)) {
    Write-Warning "eva-orchestrator folder not found at $evaOrchestrator. Skipping scan."
    exit 0
}

$files = Get-ChildItem -Path $evaOrchestrator -Recurse -File |
    Where-Object { $_.LastWriteTime -gt $cutoff }

if (-not $files) {
    Write-Host "No files found modified in the last $daysBack days." -ForegroundColor Yellow
}
else {
    $mapPath = Join-Path $vault "EVA-New-Artifacts-Map.md"

    # Build header lines as an array (no here-strings)
    $headerLines = @()
    $headerLines += "# EVA New Artifacts Map"
    $headerLines += ""
    $headerLines += "This file lists all files under eva-orchestrator modified in the last $daysBack days"
    $headerLines += "(since $($cutoff.ToString('yyyy-MM-dd HH:mm'))).  "
    $headerLines += "These are treated as **new or recently changed EVA-specific artifacts**"
    $headerLines += "relative to the original Microsoft PubSec Information Assistant baseline."
    $headerLines += ""
    $headerLines += "> Generated on: $((Get-Date).ToString('yyyy-MM-dd HH:mm'))"
    $headerLines += "> Root: $root"
    $headerLines += ""
    $headerLines += "---"
    $headerLines += ""

    $headerLines | Set-Content -Path $mapPath -Encoding utf8

    # Group by directory for readability
    $grouped = $files | Sort-Object FullName | Group-Object { $_.DirectoryName }

    foreach ($g in $grouped) {
        # Relative directory path from $root
        $relDir = $g.Name.Replace($root, "")
        if ([string]::IsNullOrWhiteSpace($relDir)) {
            $relDir = "."
        }

        "## $relDir" | Out-File -FilePath $mapPath -Append -Encoding utf8
        ""          | Out-File -FilePath $mapPath -Append -Encoding utf8

        foreach ($f in $g.Group) {
            $relFile = $f.FullName.Replace($root, "")
            $last    = $f.LastWriteTime.ToString("yyyy-MM-dd HH:mm")
            "- $relFile  (Last modified: $last)" | Out-File -FilePath $mapPath -Append -Encoding utf8
        }

        "" | Out-File -FilePath $mapPath -Append -Encoding utf8
    }

    Write-Host "New artifacts map written to: $mapPath" -ForegroundColor Green
}

Write-Host ""
Write-Host "Done." -ForegroundColor Cyan
