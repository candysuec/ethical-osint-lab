@echo off
setlocal EnableExtensions EnableDelayedExpansion
title Sovereign Ethical OSINT Laboratory - Turnkey Orchestrator
color 0A

echo ======================================================================
echo    SOVEREIGN ETHICAL OSINT TRAINING LABORATORY (WINDOWS 11)
echo    Platform URL: http://localhost:5180 | Version 2.3.1
echo ======================================================================
echo.

:: 1. Verify Docker Engine
docker --version >nul 2>&1
if errorlevel 1 (
    color 0C
    echo [ERROR] Docker is not running or not installed.
    echo Please start Docker Desktop first, then run this file again.
    echo Download: https://www.docker.com/products/docker-desktop/
    echo.
    pause
    exit /b 1
)

:: 2. Boot Docker Stack (SpiderFoot :5001, PostgreSQL :5432, Workstation CLI)
echo [1/4] Spinning up Dockerized Core Infrastructure...
docker compose up -d
if errorlevel 1 (
    color 0C
    echo [ERROR] Failed to start Docker Compose services.
    pause
    exit /b 1
)

:: 3. Launch Tool & REST Daemon on Port 5002 if not already active
echo.
echo [2/4] Initializing Python REST & Tool Daemon (:5002)...
netstat -ano | findstr :5002 | findstr LISTENING >nul 2>&1
if errorlevel 1 (
    start "OSINT_Tool_Daemon_5002" /B python "%~dp0scripts\tool_daemon.py"
    timeout /t 2 /nobreak >nul
) else (
    echo [OK] Tool Daemon already active on port :5002.
)

:: 4. Launch Vite Analyst Dashboard on Port 5180 if not already active
echo.
echo [3/4] Initializing Sovereign Analyst Workbench (:5180)...
netstat -ano | findstr :5180 | findstr LISTENING >nul 2>&1
if errorlevel 1 (
    cd /d "%~dp0dashboard"
    start "OSINT_Vite_Dashboard_5180" /B npx vite --host 0.0.0.0 --port 5180
    cd /d "%~dp0"
    timeout /t 3 /nobreak >nul
) else (
    echo [OK] Analyst Workbench already active on port :5180.
)

:: 5. Run System Healthcheck
echo.
echo [4/4] Verifying all services via Pre-Flight Diagnostic Suite...
python "%~dp0scripts\verify_suite.py"

echo.
echo ======================================================================
echo   [SUCCESS] Laboratory is 100%% OPERATIONAL!
echo   - Sovereign Workbench: http://localhost:5180
echo   - SpiderFoot UI:       http://localhost:5001
echo   - PostgreSQL 16 DB:    localhost:5432 (sovereign_osint)
echo   - REST Tool Gateway:   http://localhost:5002
echo   - Interactive Shell:   Double-click 'terminal_cli.bat'
echo   - Clean Teardown:      Double-click 'stop_osint_lab.bat'
echo ======================================================================
echo.

:: 6. Launch Browser
start http://localhost:5180

pause
