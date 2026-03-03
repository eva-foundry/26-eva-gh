@echo off
REM ============================================================================
REM MS-InfoJP Professional Runner - Windows Enterprise Safe Wrapper
REM ============================================================================
REM CRITICAL: Windows Enterprise Encoding Safety
set PYTHONIOENCODING=utf-8

echo [INFO] MS-InfoJP Professional Runner
echo [INFO] Windows Enterprise Safe Wrapper
echo.

REM Get script directory
set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..

cd /d "%PROJECT_ROOT%"

REM Check Python availability
where python >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python not found in PATH
    echo [INFO] Install Python 3.11+ from https://www.python.org/downloads/
    pause
    exit /b 1
)

echo [PASS] Python found in PATH
echo.

REM Run professional runner with all arguments
python scripts\run_ms_infojp.py %*

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Runner failed with exit code %ERRORLEVEL%
    echo [INFO] Check logs\ directory for details
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [PASS] Runner completed successfully
pause
exit /b 0
