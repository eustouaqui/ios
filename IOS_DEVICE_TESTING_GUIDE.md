# iOS Device Testing Guide

This guide provides step-by-step instructions for testing the Mind Reprogramming app on a physical iOS device.

## 📋 Prerequisites

1. **Physical iOS device** (iPhone or iPad)
2. **Apple Developer account** (free or paid)
3. **Xcode** installed on your Mac
4. **Same WiFi network** for both your computer and iOS device
5. **Backend server running locally**

## 🛠️ Setup Process

### 1. Start the Backend Server

First, start the backend server on your computer:

```bash
cd backend
npm run dev
```

### 2. Find Your Computer's Local IP Address

Use the provided script to find your computer's IP address:

```bash
cd backend
npm run find-ip
```

This will display your local IP address that your iOS device can access.

### 3. Update iOS App Configuration

Update the [Constants.swift](file:///c:/a_aia/ios/SubscriptionApp/MindReprogrammingProject/ios-app/Utils/Constants.swift) file with your computer's IP address:

```swift
#if DEBUG
static let apiBaseURL = "http://YOUR_COMPUTER_IP:5000/api" // Development URL
#else
static let apiBaseURL = "https://ios-hm94.onrender.com/api" // Production URL
#endif
```

Replace `YOUR_COMPUTER_IP` with the IP address you found in step 2.

### 4. Configure MongoDB Atlas

Ensure your MongoDB Atlas is configured to accept connections:

1. Log in to MongoDB Atlas
2. Go to "Network Access" in the left sidebar
3. Add your current IP address or use `0.0.0.0/0` for development (temporary)

### 5. Build and Run on iOS Device

1. Connect your iOS device to your Mac
2. Open the project in Xcode
3. Select your device from the device dropdown
4. Build and run the app

## 🧪 Testing Features

### User Registration and Authentication

1. Open the app on your iOS device
2. Navigate to the registration screen
3. Enter valid user information
4. Verify the user is created in MongoDB

### Affirmation Creation and Retrieval

1. Create a new affirmation in the app
2. Verify it appears in the list
3. Check MongoDB to confirm the affirmation was saved

### Binaural Audio Playback

1. Create an affirmation with binaural audio
2. Play the audio file
3. Verify the sleep mode functionality works
4. Confirm the screen dimming feature functions properly

### Offline Functionality

1. Test app behavior when the device is offline
2. Verify error handling and user feedback

## 🔧 Troubleshooting Common Issues

### Network Connection Issues

**Problem**: iOS device cannot connect to the backend server
**Solutions**:
1. Ensure both devices are on the same WiFi network
2. Check that your computer's firewall isn't blocking port 5000
3. Verify the IP address in Constants.swift is correct
4. Try accessing `http://YOUR_IP:5000/health` from Safari on your iOS device

### SSL/HTTPS Issues

**Problem**: iOS blocks HTTP connections by default
**Solution**: The app is configured to allow HTTP connections in debug mode. If you encounter issues:
1. Check that the Constants.swift file has the correct debug configuration
2. Verify your Info.plist allows arbitrary loads for development

### Audio Playback Issues

**Problem**: Binaural audio doesn't play
**Solutions**:
1. Check that the audio files are being generated correctly
2. Verify the temporary file permissions
3. Ensure the AVAudioPlayer is properly configured

### Database Connection Issues

**Problem**: App cannot connect to MongoDB
**Solutions**:
1. Verify your MongoDB Atlas connection string is correct
2. Ensure your IP is whitelisted in MongoDB Atlas
3. Check that the MongoDB service is accessible

## 📱 Testing on Different iOS Versions

Test the app on different iOS versions if possible:
- Latest iOS version
- Previous major version
- Any specific versions your target users might be using

## 🎯 Test Scenarios

### Happy Path Testing

1. User registration → Login → Create affirmation → Play audio → Log out
2. User login → View affirmations → Play existing audio → Use sleep mode

### Edge Case Testing

1. Empty affirmation text
2. Very long affirmation text
3. Multiple simultaneous audio playbacks
4. App backgrounding during audio playback
5. Device rotation during audio playback

### Error Handling Testing

1. No internet connection
2. Server downtime
3. Invalid user credentials
4. Database errors

## 📊 Verification Checklist

Before considering the testing complete, verify all these items:

- [ ] User registration works correctly
- [ ] User login works correctly
- [ ] Affirmations can be created and saved
- [ ] Affirmations are retrieved correctly
- [ ] Binaural audio generation works
- [ ] Audio playback functions properly
- [ ] Sleep mode dims the screen
- [ ] Audio loops correctly
- [ ] App handles network errors gracefully
- [ ] App handles database errors gracefully
- [ ] All UI elements display correctly
- [ ] App works in both portrait and landscape modes
- [ ] App properly handles background/foreground transitions

## 📞 Support

If you encounter any issues during testing:

1. Check the Xcode console for error messages
2. Check the backend terminal for error messages
3. Verify all configuration files are correctly set up
4. Ensure your development environment meets all requirements

For additional help, refer to:
- [LOCAL_TESTING_SETUP.md](file:///c:/a_aia/ios/SubscriptionApp/MindReprogrammingProject/LOCAL_TESTING_SETUP.md)
- [README.md](file:///c:/a_aia/ios/SubscriptionApp/MindReprogrammingProject/backend/README.md)
- [API Documentation](file:///c:/a_aia/ios/SubscriptionApp/MindReprogrammingProject/documentation/API_DOCUMENTATION.md)