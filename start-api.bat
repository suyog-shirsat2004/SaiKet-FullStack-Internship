@echo off
title Task 4 — REST API Server
cd /d "%~dp0Task-4-Build-a-Basic-REST-API"
echo Starting Task 4 REST API server...
echo.
echo   Dashboard: http://localhost:4000
echo   API:       http://localhost:4000/api/users
echo.
start http://localhost:4000
npm start
pause
