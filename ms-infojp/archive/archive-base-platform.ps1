# Archive Root base-platform Folder
# This script moves the incompatible root base-platform to the archive location

$ErrorActionPreference = "Stop"

$sourcePath = "I:\EVA-JP-v1.2\base-platform"
$destPath = "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\base-platform-deprecated-20260126"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Archive Root base-platform Folder" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if source exists
if (-not (Test-Path $sourcePath)) {
    Write-Host "[ERROR] Source folder does not exist: $sourcePath" -ForegroundColor Red
    exit 1
}

# Check if destination already exists
if (Test-Path $destPath) {
    Write-Host "[ERROR] Destination folder already exists: $destPath" -ForegroundColor Red
    Write-Host "Please remove the existing folder first or choose a different name." -ForegroundColor Yellow
    exit 1
}

# Ensure archive directory exists
$archiveDir = "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive"
if (-not (Test-Path $archiveDir)) {
    Write-Host "[INFO] Creating archive directory: $archiveDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $archiveDir -Force | Out-Null
}

Write-Host "[INFO] Moving folder..." -ForegroundColor Yellow
Write-Host "  From: $sourcePath" -ForegroundColor Gray
Write-Host "  To:   $destPath" -ForegroundColor Gray
Write-Host ""

# Perform the move
Move-Item -Path $sourcePath -Destination $destPath -Force

# Verify the move
if (Test-Path $destPath) {
    Write-Host "[SUCCESS] Folder moved successfully!" -ForegroundColor Green
    Write-Host ""
    
    # List what was moved
    Write-Host "Contents of archived folder:" -ForegroundColor Cyan
    Get-ChildItem -Path $destPath -Directory | ForEach-Object {
        Write-Host "  - $($_.Name)/" -ForegroundColor Gray
    }
    Get-ChildItem -Path $destPath -File | Select-Object -First 10 | ForEach-Object {
        Write-Host "  - $($_.Name)" -ForegroundColor Gray
    }
    
    Write-Host ""
    Write-Host "[INFO] Archive location: $destPath" -ForegroundColor Cyan
    Write-Host "[INFO] See README in archive folder for details" -ForegroundColor Cyan
} else {
    Write-Host "[ERROR] Move operation failed - destination not found" -ForegroundColor Red
    exit 1
}

# Copy the README to the archived folder
$readmePath = "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\README-BASE-PLATFORM-ARCHIVED.md"
if (Test-Path $readmePath) {
    $readmeDestPath = Join-Path $destPath "README.md"
    Copy-Item -Path $readmePath -Destination $readmeDestPath -Force
    Write-Host "[INFO] README.md created in archived folder" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Archive Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
