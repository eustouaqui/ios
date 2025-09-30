#!/bin/bash

# Mind Reprogramming Local Testing Setup Script

echo "🚀 Starting Mind Reprogramming Local Testing Environment"

# Check if we're in the right directory
if [ ! -d "backend" ]; then
  echo "❌ Error: backend directory not found. Please run this script from the project root."
  exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Error: Node.js is not installed. Please install Node.js (version 14 or higher) and try again."
  exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
  echo "❌ Error: npm is not installed. Please install Node.js (which includes npm) and try again."
  exit 1
fi

echo "✅ Node.js and npm found"

# Navigate to backend directory
cd backend

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
  echo "📦 Installing backend dependencies..."
  npm install
  if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
  fi
  echo "✅ Dependencies installed successfully"
else
  echo "✅ Dependencies already installed"
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo "⚠️  Warning: .env file not found. Creating from .env.example..."
  if [ -f ".env.example" ]; then
    cp .env.example .env
    echo "✅ .env file created from .env.example"
    echo "🔧 Please update the .env file with your MongoDB Atlas connection string"
  else
    echo "❌ Error: .env.example file not found"
    exit 1
  fi
else
  echo "✅ .env file found"
fi

# Start the development server
echo "🚀 Starting backend server..."
echo "📝 Server will be available at http://localhost:5000"
echo "📝 API endpoints will be available at http://localhost:5000/api"
echo "📝 Press Ctrl+C to stop the server"
echo ""

# Run the development server
npm run dev