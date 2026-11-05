@echo off
title Ethical OSINT Laboratory - Windows 11 Quickstart
color 0A
echo ======================================================================
echo          ETHICAL OSINT TRAINING LABORATORY (WINDOWS 11)
echo ======================================================================
echo.

:: Check for Docker
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

echo [1/3] Spinning up SpiderFoot and OSINT CLI Workstation...
docker compose up -d

echo.
echo [2/3] Waiting for services to initialize...
timeout /t 3 /nobreak >nul

echo.
echo [3/3] Opening SpiderFoot Web UI in your browser...
start http://localhost:5001

echo.
echo ======================================================================
echo   [SUCCESS] Laboratory is LIVE!
echo   - Web Console: http://localhost:5001
echo   - Interactive Linux Shell: Double-click 'terminal_cli.bat'
echo   - Stop the Lab: Double-click 'stop_osint_lab.bat'
echo ======================================================================
echo.
pause
