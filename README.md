# Mind Reprogramming Project

This repository contains the complete Mind Reprogramming application with both iOS frontend and backend components.

## 📁 Project Structure

```
MindReprogrammingProject/
├── ios-app/                    # Native iOS application (SwiftUI)
├── backend/                    # Node.js backend API
└── documentation/              # Project documentation and guides
```

## 📱 iOS App (ios-app/)

A native iOS application built with SwiftUI that provides:

- Multi-step affirmation form with progress indicator
- Profile collection (religion, marital status, profession, ambitions, fears, dreams)
- Goals selection with checkboxes
- Voice preferences selection
- Result display with loading states
- StoreKit 2 integration for subscription management

##  backend (backend/)

A Node.js/Express backend with MongoDB integration that provides:

- RESTful API endpoints
- User management
- Affirmation storage
- MongoDB Atlas integration
- Health check endpoints for Render deployment

## 📚 Documentation (documentation/)

Comprehensive documentation including:

- Deployment guides
- Setup instructions
- API documentation
- Troubleshooting guides

## 🚀 Getting Started

### iOS App
1. Open the iOS project in Xcode
2. Build and run the application

### Backend
1. Navigate to the backend directory
2. Install dependencies: `npm install`
3. Configure environment variables
4. Run the server: `npm start`

## 📦 Deployment

The project is configured for deployment to Render.com with MongoDB Atlas:

- Render deployment configuration in `render.yaml`
- MongoDB Atlas connection ready
- Health check endpoints to prevent service suspension

## 🛠️ Prerequisites

- Xcode for iOS development
- Node.js for backend development
- MongoDB Atlas account
- Render.com account for deployment

## 📖 Documentation

See the [documentation](documentation/) directory for detailed guides on:

- [Quick Start Guide](documentation/QUICK_START_GUIDE.md)
- [Render Deployment Guide](documentation/RENDER_DEPLOYMENT_GUIDE.md)
- [MongoDB Atlas Setup](documentation/MONGODB_ATLAS_SETUP.md)
- [App Store Requirements](documentation/APP_STORE_REQUIREMENTS.md)