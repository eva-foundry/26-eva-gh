@echo off
echo.
echo ========================================
echo Archive Root base-platform Folder
echo ========================================
echo.
echo This will move:
echo   From: I:\EVA-JP-v1.2\base-platform\
echo   To:   I:\EVA-JP-v1.2\docs\eva-foundation\projects\11-MS-InfoJP\archive\base-platform-deprecated-20260126\
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause >nul
echo.
echo Executing archive operation...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0archive-base-platform.ps1"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS: Archive Complete!
    echo ========================================
    echo.
    echo The root base-platform folder has been archived.
    echo.
    echo See README.md in the archived folder for details:
    echo   archive\base-platform-deprecated-20260126\README.md
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR: Archive Failed
    echo ========================================
    echo.
    echo Please check the error message above and try again.
    echo.
)

pause
