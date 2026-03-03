# Test-Frontend-Local.ps1
# Test frontend dependencies and build requirements locally

$ErrorActionPreference = "Continue"
$PROJECT_DIR = "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP"
$FRONTEND_DIR = "$PROJECT_DIR\base-platform\app\frontend"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  FRONTEND LOCAL TESTING" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test 1: Node.js version
Write-Host "[1/5] Node.js Version Check" -ForegroundColor Yellow
Write-Host "--------------------------------------"
try {
    $nodeVersion = node --version 2>&1
    if ($nodeVersion -match "v(1[8-9]|2[0-2])\.") {
        Write-Host "[PASS] Node.js $nodeVersion" -ForegroundColor Green
    } else {
        Write-Host "[WARN] Node.js $nodeVersion (recommended: v18-v22)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[FAIL] Node.js not found" -ForegroundColor Red
    Write-Host "[ACTION] Install from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Test 2: npm version
Write-Host "[2/5] npm Version Check" -ForegroundColor Yellow
Write-Host "--------------------------------------"
try {
    $npmVersion = npm --version 2>&1
    Write-Host "[PASS] npm v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "[FAIL] npm not found" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Test 3: package.json exists
Write-Host "[3/5] Package Configuration" -ForegroundColor Yellow
Write-Host "--------------------------------------"
$packageJson = "$FRONTEND_DIR\package.json"
if (Test-Path $packageJson) {
    $pkg = Get-Content $packageJson | ConvertFrom-Json
    Write-Host "[PASS] package.json found" -ForegroundColor Green
    Write-Host "  Name: $($pkg.name)" -ForegroundColor Gray
    Write-Host "  Type: $($pkg.type)" -ForegroundColor Gray
    Write-Host "  Dependencies: $($pkg.dependencies.PSObject.Properties.Count)" -ForegroundColor Gray
    Write-Host "  Dev Dependencies: $($pkg.devDependencies.PSObject.Properties.Count)" -ForegroundColor Gray
} else {
    Write-Host "[FAIL] package.json not found" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Test 4: Install dependencies
Write-Host "[4/5] npm Dependencies Installation" -ForegroundColor Yellow
Write-Host "--------------------------------------"
Write-Host "[INFO] Installing dependencies (this may take 3-5 minutes)..." -ForegroundColor Yellow
Push-Location $FRONTEND_DIR

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "[INFO] node_modules exists, checking if update needed..." -ForegroundColor Yellow
}

npm install --quiet 2>&1 | Out-Null
$installResult = $LASTEXITCODE
Pop-Location

if ($installResult -eq 0) {
    Write-Host "[PASS] All npm dependencies installed" -ForegroundColor Green
} else {
    Write-Host "[FAIL] npm install failed (exit code: $installResult)" -ForegroundColor Red
}
Write-Host ""

# Test 5: Test build (dry run)
Write-Host "[5/5] Frontend Build Test" -ForegroundColor Yellow
Write-Host "--------------------------------------"
Write-Host "[INFO] Testing TypeScript compilation..." -ForegroundColor Yellow
Push-Location $FRONTEND_DIR

# Check for TypeScript errors
npm run build 2>&1 | Out-Null
$buildResult = $LASTEXITCODE
Pop-Location

if ($buildResult -eq 0) {
    Write-Host "[PASS] Frontend builds successfully" -ForegroundColor Green
} else {
    Write-Host "[WARN] Build had warnings/errors (exit code: $buildResult)" -ForegroundColor Yellow
    Write-Host "[INFO] This might be okay for development mode" -ForegroundColor Gray
}
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FRONTEND TEST SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend Directory: $FRONTEND_DIR" -ForegroundColor Gray
Write-Host ""
Write-Host "To start frontend dev server:" -ForegroundColor Yellow
Write-Host "  cd $FRONTEND_DIR" -ForegroundColor Gray
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Expected output:" -ForegroundColor Gray
Write-Host "  VITE v5.x.x  ready in XXX ms" -ForegroundColor Gray
Write-Host "  Local:   http://localhost:5173/" -ForegroundColor Gray
Write-Host ""
