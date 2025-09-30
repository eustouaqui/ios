# Local Testing Setup Guide

This guide will help you set up a local environment to test the Mind Reprogramming iOS app on your device.

## 📋 Prerequisites

1. **Node.js** (version 14 or higher)
2. **MongoDB Atlas** account
3. **Xcode** (latest version)
4. **iOS device** for testing (iPhone/iPad)

## 🛠️ Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Ensure your [.env](file:///c:/a_aia/ios/SubscriptionApp/MindReprogrammingProject/backend/.env) file is properly configured with your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster-url/database-name?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### 3. Start the Backend Server

```bash
cd backend
npm run dev
```

The server will start on `http://localhost:5000`

### 4. Test Backend Endpoints

You can test the API using the provided test scripts:

```bash
# Test basic functionality
npm run test-functionality

# Test binaural audio features
npm run test-binaural
```

## 📱 iOS App Setup

### 1. Open the Project in Xcode

1. Open `SubscriptionApp.xcodeproj` in Xcode
2. Select your iOS device as the target (or use Simulator)
3. Build and run the app

### 2. Network Configuration for Device Testing

When testing on a physical iOS device, you'll need to:

1. Ensure your iOS device and computer are on the same Wi-Fi network
2. Find your computer's local IP address:
   - On macOS: System Preferences > Network > Wi-Fi > Status shows your IP
   - On Windows: Open Command Prompt and run `ipconfig`

3. Update the Constants.swift file with your computer's IP address:
   ```swift
   #if DEBUG
   static let apiBaseURL = "http://YOUR_COMPUTER_IP:5000/api" // Development URL
   #else
   static let apiBaseURL = "https://ios-hm94.onrender.com/api" // Production URL
   #endif
   ```

### 3. Running Tests

The app is configured to use different API endpoints based on the build configuration:
- **Debug builds** (development): Uses your local server
- **Release builds** (production): Uses the Render deployment

## 🔧 Troubleshooting

### Common Issues and Solutions

1. **MongoDB Connection Issues**
   - Ensure your IP address is whitelisted in MongoDB Atlas
   - For local testing, you can temporarily add `0.0.0.0/0` to Network Access in MongoDB Atlas

2. **Network Connection Issues**
   - Make sure your iOS device and computer are on the same network
   - Check firewall settings on your computer
   - Ensure port 5000 is not blocked

3. **API Endpoint Issues**
   - Verify the backend server is running
   - Check that all environment variables are correctly set
   - Use the health check endpoints to verify connectivity:
     - `http://localhost:5000/health`
     - `http://localhost:5000/api/health`

## 🧪 Testing Workflow

1. Start the backend server locally
2. Update the iOS app Constants.swift with your computer's IP
3. Build and run the iOS app on your device
4. Test all functionality:
   - User registration
   - Affirmation saving and retrieval
   - Binaural audio generation and playback
   - Sleep mode functionality

## 📞 Support

If you encounter any issues during setup:
1. Check the console logs in Xcode for iOS errors
2. Check the terminal output for backend errors
3. Verify all environment variables are correctly set
4. Ensure MongoDB Atlas is properly configured