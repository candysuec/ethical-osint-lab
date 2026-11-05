@echo off
title Stop Ethical OSINT Laboratory
color 0E
echo Stopping OSINT Lab containers...
docker compose down
echo.
echo Containers stopped cleanly.
timeout /t 2 /nobreak >nul
