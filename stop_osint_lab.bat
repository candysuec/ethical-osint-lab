@echo off
setlocal EnableExtensions EnableDelayedExpansion
title Stop Sovereign Ethical OSINT Laboratory
color 0E

echo ======================================================================
echo    STOPPING SOVEREIGN ETHICAL OSINT LABORATORY
echo ======================================================================
echo.

:: 1. Terminate Background Node / Vite Dashboard on Port 5180
echo [1/3] Terminating background Analyst Workbench (:5180)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5180 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

:: 2. Terminate Background Python Tool Daemon on Port 5002
echo [2/3] Terminating background REST & Tool Daemon (:5002)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5002 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

:: 3. Stop Docker Containers
echo [3/3] Stopping Docker Compose services (Postgres, SpiderFoot, CLI)...
docker compose down

echo.
echo ======================================================================
echo   [SUCCESS] All Ethical OSINT Lab services stopped cleanly.
echo ======================================================================
echo.
timeout /t 3 /nobreak >nul
