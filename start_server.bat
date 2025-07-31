@echo off
echo Starting RUGS AND ROOTS Local Development Server...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed or not in PATH
    echo Please install Python 3.x from https://python.org
    echo.
    pause
    exit /b 1
)

REM Start the server
python serve.py

pause