@echo off
REM Quick executor for archive operation
REM Run this to archive the root base-platform folder

powershell -ExecutionPolicy Bypass -File "%~dp0archive-base-platform.ps1"
pause
