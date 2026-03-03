# Test-Backend-Local.ps1
# Test backend dependencies and startup requirements locally

$ErrorActionPreference = "Continue"
$PROJECT_DIR = "I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP"
$BACKEND_DIR = "$PROJECT_DIR\base-platform\app\backend"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  BACKEND LOCAL TESTING" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test 1: Python version
Write-Host "[1/6] Python Version Check" -ForegroundColor Yellow
Write-Host "--------------------------------------"
try {
    $pyVersion = python --version 2>&1
    if ($pyVersion -match "Python 3\.1[0-2]") {
        Write-Host "[PASS] $pyVersion" -ForegroundColor Green
    } else {
        Write-Host "[WARN] $pyVersion (recommended: Python 3.10-3.12)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[FAIL] Python not found" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Test 2: backend.env exists and valid
Write-Host "[2/6] Backend Environment Configuration" -ForegroundColor Yellow
Write-Host "--------------------------------------"
$envFile = "$BACKEND_DIR\backend.env"
if (Test-Path $envFile) {
    $envContent = Get-Content $envFile -Raw
    $criticalVars = @("AZURE_OPENAI_ENDPOINT", "AZURE_SEARCH_SERVICE_ENDPOINT", "COSMOSDB_URL")
    $allValid = $true
    foreach ($var in $criticalVars) {
        $pattern = "^${var}=(.+)$"
        $match = [regex]::Match($envContent, $pattern, [System.Text.RegularExpressions.RegexOptions]::Multiline)
        if ($match.Success -and -not [string]::IsNullOrWhiteSpace($match.Groups[1].Value)) {
            Write-Host "  [PASS] $var" -ForegroundColor Green
        } else {
            Write-Host "  [FAIL] $var is empty" -ForegroundColor Red
            $allValid = $false
        }
    }
    if (-not $allValid) {
        Write-Host "`n[ACTION] Run: .\Generate-Backend-Env.ps1" -ForegroundColor Yellow
    }
} else {
    Write-Host "[FAIL] backend.env not found at $envFile" -ForegroundColor Red
    Write-Host "[ACTION] Run: .\Generate-Backend-Env.ps1" -ForegroundColor Yellow
}
Write-Host ""

# Test 3: Create venv if not exists
Write-Host "[3/6] Virtual Environment Setup" -ForegroundColor Yellow
Write-Host "--------------------------------------"
$venvPath = "$BACKEND_DIR\.venv"
if (-not (Test-Path $venvPath)) {
    Write-Host "[INFO] Creating virtual environment..." -ForegroundColor Yellow
    Push-Location $BACKEND_DIR
    python -m venv .venv
    Pop-Location
    Write-Host "[PASS] Virtual environment created" -ForegroundColor Green
} else {
    Write-Host "[PASS] Virtual environment exists" -ForegroundColor Green
}
Write-Host ""

# Test 4: Install dependencies
Write-Host "[4/6] Python Dependencies Installation" -ForegroundColor Yellow
Write-Host "--------------------------------------"
$requirementsFile = "$BACKEND_DIR\requirements.txt"
if (Test-Path $requirementsFile) {
    Write-Host "[INFO] Installing dependencies (this may take 2-3 minutes)..." -ForegroundColor Yellow
    Push-Location $BACKEND_DIR
    & "$venvPath\Scripts\python.exe" -m pip install --upgrade pip --quiet
    & "$venvPath\Scripts\pip.exe" install -r requirements.txt --quiet
    $exitCode = $LASTEXITCODE
    Pop-Location
    
    if ($exitCode -eq 0) {
        Write-Host "[PASS] All dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] Some dependencies failed to install (exit code: $exitCode)" -ForegroundColor Red
    }
} else {
    Write-Host "[FAIL] requirements.txt not found" -ForegroundColor Red
}
Write-Host ""

# Test 5: Check critical imports
Write-Host "[5/6] Critical Python Imports Test" -ForegroundColor Yellow
Write-Host "--------------------------------------"
$testScript = @"
import sys
errors = []
try:
    import fastapi
    print('  [PASS] fastapi')
except ImportError as e:
    errors.append(f'fastapi: {e}')
    print('  [FAIL] fastapi')

try:
    import azure.search.documents
    print('  [PASS] azure.search.documents')
except ImportError as e:
    errors.append(f'azure-search-documents: {e}')
    print('  [FAIL] azure.search.documents')

try:
    import azure.cosmos
    print('  [PASS] azure.cosmos')
except ImportError as e:
    errors.append(f'azure-cosmos: {e}')
    print('  [FAIL] azure.cosmos')

try:
    import openai
    print('  [PASS] openai')
except ImportError as e:
    errors.append(f'openai: {e}')
    print('  [FAIL] openai')

try:
    import langchain
    print('  [PASS] langchain')
except ImportError as e:
    errors.append(f'langchain: {e}')
    print('  [FAIL] langchain')

if errors:
    print(f'\nErrors: {len(errors)}')
    sys.exit(1)
else:
    print('\n[PASS] All critical imports successful')
    sys.exit(0)
"@

$testFile = "$env:TEMP\test_imports.py"
Set-Content -Path $testFile -Value $testScript
Push-Location $BACKEND_DIR
& "$venvPath\Scripts\python.exe" $testFile
$importResult = $LASTEXITCODE
Pop-Location
Remove-Item $testFile -ErrorAction SilentlyContinue

if ($importResult -ne 0) {
    Write-Host "[WARN] Some imports failed - may need to reinstall dependencies" -ForegroundColor Yellow
}
Write-Host ""

# Test 6: Syntax check on app.py
Write-Host "[6/6] Backend Syntax Validation" -ForegroundColor Yellow
Write-Host "--------------------------------------"
$appFile = "$BACKEND_DIR\app.py"
if (Test-Path $appFile) {
    Push-Location $BACKEND_DIR
    & "$venvPath\Scripts\python.exe" -m py_compile app.py 2>&1 | Out-Null
    $syntaxResult = $LASTEXITCODE
    Pop-Location
    
    if ($syntaxResult -eq 0) {
        Write-Host "[PASS] app.py has no syntax errors" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] app.py has syntax errors" -ForegroundColor Red
    }
} else {
    Write-Host "[FAIL] app.py not found" -ForegroundColor Red
}
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BACKEND TEST SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend Directory: $BACKEND_DIR" -ForegroundColor Gray
Write-Host ""
Write-Host "To start backend server:" -ForegroundColor Yellow
Write-Host "  cd $BACKEND_DIR" -ForegroundColor Gray
Write-Host "  .\.venv\Scripts\Activate.ps1" -ForegroundColor Gray
Write-Host "  python app.py" -ForegroundColor Gray
Write-Host ""
Write-Host "Expected output: 'Uvicorn running on http://0.0.0.0:5000'" -ForegroundColor Gray
Write-Host ""
