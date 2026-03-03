@echo off
REM ============================================================================
REM MS-InfoJP: Clone Microsoft PubSec-Info-Assistant Repository
REM ============================================================================
REM CRITICAL: Windows Enterprise Encoding Safety
set PYTHONIOENCODING=utf-8

echo [INFO] MS-InfoJP Repository Clone Script
echo [INFO] Target: https://github.com/microsoft/PubSec-Info-Assistant
echo.

REM Get current script directory
set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..
set CLONE_TARGET=%PROJECT_ROOT%\base-platform

echo [INFO] Project root: %PROJECT_ROOT%
echo [INFO] Clone target: %CLONE_TARGET%
echo.

REM Check if git is available
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed or not in PATH
    echo [INFO] Install Git from https://git-scm.com/downloads
    pause
    exit /b 1
)

echo [PASS] Git found in PATH
echo.

REM Check if target directory already exists
if exist "%CLONE_TARGET%" (
    echo [WARN] Target directory already exists: %CLONE_TARGET%
    echo [INFO] Choose action:
    echo [INFO]   1 = Skip clone (use existing)
    echo [INFO]   2 = Delete and re-clone
    echo [INFO]   3 = Abort
    echo.
    set /p CHOICE="Enter choice (1-3): "
    
    if "!CHOICE!"=="1" (
        echo [INFO] Using existing repository
        goto :verify
    )
    
    if "!CHOICE!"=="2" (
        echo [WARN] Deleting existing repository...
        rmdir /s /q "%CLONE_TARGET%"
        if %ERRORLEVEL% NEQ 0 (
            echo [ERROR] Failed to delete existing directory
            pause
            exit /b 1
        )
        echo [PASS] Existing repository deleted
    )
    
    if "!CHOICE!"=="3" (
        echo [INFO] Clone aborted by user
        pause
        exit /b 0
    )
)

REM Clone the repository
echo [INFO] Cloning Microsoft PubSec-Info-Assistant...
echo [INFO] This may take several minutes depending on network speed
echo.

git clone https://github.com/microsoft/PubSec-Info-Assistant.git "%CLONE_TARGET%"

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git clone failed with exit code %ERRORLEVEL%
    echo [INFO] Check network connectivity and repository access
    pause
    exit /b 1
)

echo.
echo [PASS] Repository cloned successfully

:verify
REM Verify clone integrity
echo.
echo [INFO] Verifying clone integrity...

if not exist "%CLONE_TARGET%\README.md" (
    echo [ERROR] Clone verification failed: README.md not found
    pause
    exit /b 1
)

if not exist "%CLONE_TARGET%\app" (
    echo [ERROR] Clone verification failed: app directory not found
    pause
    exit /b 1
)

if not exist "%CLONE_TARGET%\functions" (
    echo [ERROR] Clone verification failed: functions directory not found
    pause
    exit /b 1
)

if not exist "%CLONE_TARGET%\infra" (
    echo [ERROR] Clone verification failed: infra directory not found
    pause
    exit /b 1
)

echo [PASS] Clone integrity verified
echo [PASS] Key directories found:
echo [INFO]   - app/backend (Python/Quart backend)
echo [INFO]   - app/frontend (React/TypeScript/Vite)
echo [INFO]   - functions (Azure Functions)
echo [INFO]   - infra (Terraform/Bicep IaC)
echo.

REM Get repository info
cd /d "%CLONE_TARGET%"
for /f "tokens=*" %%i in ('git rev-parse --short HEAD') do set COMMIT_HASH=%%i
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set BRANCH=%%i

echo [INFO] Repository Information:
echo [INFO]   Branch: %BRANCH%
echo [INFO]   Commit: %COMMIT_HASH%
echo [INFO]   Location: %CLONE_TARGET%
echo.

REM Create clone metadata file
cd /d "%PROJECT_ROOT%"
echo { > clone-metadata.json
echo   "repository": "microsoft/PubSec-Info-Assistant", >> clone-metadata.json
echo   "clone_date": "%date% %time%", >> clone-metadata.json
echo   "branch": "%BRANCH%", >> clone-metadata.json
echo   "commit": "%COMMIT_HASH%", >> clone-metadata.json
echo   "clone_path": "%CLONE_TARGET%" >> clone-metadata.json
echo } >> clone-metadata.json

echo [PASS] Clone metadata saved to clone-metadata.json
echo.
echo [PASS] MS-InfoJP base platform ready
echo [INFO] Next steps:
echo [INFO]   1. Review base-platform/README.md for setup instructions
echo [INFO]   2. Configure Azure resources (see base-platform/infra/)
echo [INFO]   3. Run professional setup with run_ms_infojp.bat
echo.

pause
exit /b 0
