@echo off
title Mind Reprogramming Local Testing Environment

echo 🚀 Starting Mind Reprogramming Local Testing Environment
echo.

REM Check if we're in the right directory
if not exist "backend" (
  echo ❌ Error: backend directory not found. Please run this script from the project root.
  pause
  exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
  echo ❌ Error: Node.js is not installed. Please install Node.js (version 14 or higher) and try again.
  pause
  exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
  echo ❌ Error: npm is not installed. Please install Node.js (which includes npm) and try again.
  pause
  exit /b 1
)

echo ✅ Node.js and npm found

REM Navigate to backend directory
cd backend

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
  echo 📦 Installing backend dependencies...
  npm install
  if %errorlevel% neq 0 (
    echo ❌ Error: Failed to install dependencies
    pause
    exit /b 1
  )
  echo ✅ Dependencies installed successfully
) else (
  echo ✅ Dependencies already installed
)

REM Check if .env file exists
if not exist ".env" (
  echo ⚠️  Warning: .env file not found. Creating from .env.example...
  if exist ".env.example" (
    copy .env.example .env >nul
    echo ✅ .env file created from .env.example
    echo 🔧 Please update the .env file with your MongoDB Atlas connection string
  ) else (
    echo ❌ Error: .env.example file not found
    pause
    exit /b 1
  )
) else (
  echo ✅ .env file found
)

REM Start the development server
echo.
echo 🚀 Starting backend server...
echo 📝 Server will be available at http://localhost:5000
echo 📝 API endpoints will be available at http://localhost:5000/api
echo 📝 Press Ctrl+C to stop the server
echo.

REM Run the development server
npm run dev

pause