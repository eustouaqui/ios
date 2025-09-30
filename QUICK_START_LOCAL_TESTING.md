# Quick Start: Local Testing

Get up and running with local testing of the Mind Reprogramming app in just a few minutes.

## 🚀 Fast Setup

### 1. Start the Backend Server

```bash
# Navigate to the backend directory
cd backend

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The server will start on `http://localhost:5000`

### 2. Find Your Computer's IP Address

```bash
# From the backend directory
npm run find-ip
```

Note the IP address for use in the iOS app configuration.

### 3. Configure iOS App

Update [Constants.swift](file:///c:/a_aia/ios/SubscriptionApp/MindReprogrammingProject/ios-app/Utils/Constants.swift):

```swift
#if DEBUG
static let apiBaseURL = "http://YOUR_COMPUTER_IP:5000/api"  // Replace YOUR_COMPUTER_IP
#else
static let apiBaseURL = "https://ios-hm94.onrender.com/api"
#endif
```

### 4. Build and Run on iOS Device

1. Connect your iOS device to your computer
2. Open the project in Xcode
3. Select your device as the target
4. Build and run the app

## 🧪 Quick Tests

### Test Backend Connectivity

```bash
# Test basic connectivity
curl http://localhost:5000/health

# Test API health
curl http://localhost:5000/api/health
```

### Test from iOS Device

1. On your iOS device, open Safari
2. Navigate to `http://YOUR_COMPUTER_IP:5000`
3. You should see the test page

## 🛠️ Alternative: Simple Connectivity Test

If you want to test network connectivity without the full backend:

```bash
# From the backend directory
npm run test-ios
```

This starts a simple test server that you can use to verify iOS device connectivity.

## 📱 Testing Checklist

- [ ] Backend server running
- [ ] IP address configured in iOS app
- [ ] iOS device on same network as computer
- [ ] App builds and runs on device
- [ ] Basic functionality works (registration, affirmations)
- [ ] Binaural audio plays correctly
- [ ] Sleep mode functions properly

## ⚡ Troubleshooting

**Most common issues:**

1. **Can't connect from iOS device**
   - Check that both devices are on the same WiFi network
   - Verify the IP address in Constants.swift
   - Check firewall settings

2. **MongoDB connection issues**
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Check the connection string in .env

3. **Audio not playing**
   - Check the Xcode console for errors
   - Verify temporary file permissions

## 📞 Need Help?

1. Check the detailed guides:
   - [LOCAL_TESTING_SETUP.md](file:///c:/a_aia/ios/SubscriptionApp/MindReprogrammingProject/LOCAL_TESTING_SETUP.md)
   - [IOS_DEVICE_TESTING_GUIDE.md](file:///c:/a_aia/ios/SubscriptionApp/MindReprogrammingProject/IOS_DEVICE_TESTING_GUIDE.md)

2. Run diagnostic scripts:
   ```bash
   npm run find-ip          # Find your IP address
   npm run test-health      # Test backend health
   npm run test-functionality # Test all API endpoints
   ```

Happy testing! 🎉