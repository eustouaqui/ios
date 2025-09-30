# iOS App Deployment Guide

This guide explains how to update your iOS app to connect to the production backend deployed on Render.com instead of the local development server.

## 🎯 Overview

When you deploy your backend to Render.com, you need to update your iOS app to point to the new production URL instead of the localhost development URL.

## 🔧 Updating the API Base URL

### 1. Update Constants.swift

The API base URL is configured in the [Constants.swift](file:///c%3A/a_aia/ios/SubscriptionApp/MindReprogrammingProject/ios-app/Utils/Constants.swift) file. The file is already configured to use different URLs for development and production environments:

```swift
// API Configuration
#if DEBUG
static let apiBaseURL = "http://localhost:5000/api" // Development URL
#else
static let apiBaseURL = "https://YOUR_RENDER_APP_NAME.onrender.com/api" // Production URL - Replace with your actual Render URL
#endif
```

### 2. Replace with Your Actual Render URL

1. Go to your Render dashboard
2. Find your deployed web service
3. Copy the URL from the top of the service page
4. Replace `YOUR_RENDER_APP_NAME.onrender.com` with your actual Render URL in [Constants.swift](file:///c%3A/a_aia/ios/SubscriptionApp/MindReprogrammingProject/ios-app/Utils/Constants.swift)

For example, if your Render URL is `https://mindreprogramming-api.onrender.com`, update the line to:
```swift
static let apiBaseURL = "https://mindreprogramming-api.onrender.com/api" // Production URL
```

## 🔍 Verification Steps

### 1. Test the API Health Endpoint

Before testing in the iOS app, verify your Render backend is working:

1. Open your browser
2. Navigate to: `https://YOUR_RENDER_APP_NAME.onrender.com/api/health`
3. You should see a JSON response like:
   ```json
   {
     "status": "OK",
     "environment": "production",
     "database": "Connected",
     "timestamp": "2025-09-30T12:34:56.789Z"
   }
   ```

### 2. Test in Xcode Simulator

1. Open your iOS project in Xcode
2. Make sure you've updated the [Constants.swift](file:///c%3A/a_aia/ios/SubscriptionApp/MindReprogrammingProject/ios-app/Utils/Constants.swift) file with your Render URL
3. Build and run the app in the simulator
4. Test functionality that communicates with the backend:
   - User registration
   - User login
   - Affirmation generation
   - Subscription validation

### 3. Check Network Activity

In Xcode, you can monitor network activity:
1. Open the Network Inspector (Window > Organizer > Network Report)
2. Run your app and perform API calls
3. Verify requests are being made to your Render URL, not localhost

## 🛠️ Environment Configuration

The [Constants.swift](file:///c%3A/a_aia/ios/SubscriptionApp/MindReprogrammingProject/ios-app/Utils/Constants.swift) file uses conditional compilation to automatically switch between development and production URLs:

- **Debug builds** (development): Uses `http://localhost:5000/api`
- **Release builds** (production): Uses your Render URL

This means:
- When running in the simulator or on a device from Xcode (Debug), it uses localhost
- When building for App Store submission (Release), it uses your Render URL

## 🧪 Testing Different Environments

### Testing Production URL in Development

If you want to test the production URL while developing:

1. In Xcode, go to Product > Scheme > Edit Scheme
2. Select "Run" from the left sidebar
3. Go to the "Info" tab
4. Change "Build Configuration" from "Debug" to "Release"
5. Run the app in the simulator

Note: This will disable some debugging features.

### Testing Local Development with Release Build

If you want to keep using localhost even in Release builds:
1. Modify [Constants.swift](file:///c%3A/a_aia/ios/SubscriptionApp/MindReprogrammingProject/ios-app/Utils/Constants.swift) to use localhost for both configurations
2. Remember to change it back before submitting to the App Store

## ⚠️ Common Issues and Solutions

### 1. "App Transport Security" Errors

If you get network errors, you might need to update App Transport Security settings in your Info.plist:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

Note: This is not recommended for App Store submission. Instead, allow specific domains:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>your-render-app.onrender.com</key>
        <dict>
            <key>NSExceptionAllowsInsecureHTTPLoads</key>
            <true/>
            <key>NSIncludesSubdomains</key>
            <true/>
        </dict>
    </dict>
</dict>
```

### 2. CORS Issues

If you see CORS errors, make sure your backend is configured to allow requests from your iOS app. The backend should already be configured correctly, but you can verify in [server.js](file:///c%3A/a_aia/ios/SubscriptionApp/MindReprogrammingProject/backend/server.js):

```javascript
app.use(cors({
  origin: '*', // Allows all origins for mobile apps
  credentials: true
}));
```

### 3. SSL/TLS Connection Issues

If you encounter SSL/TLS issues:
1. Ensure your Render URL uses HTTPS (it should by default)
2. Check that your MongoDB Atlas IP whitelisting is configured correctly
3. Verify your Render service is running and not sleeping

## 🎉 Success Verification

When everything is working correctly:

1. Your iOS app should be able to:
   - Register new users
   - Log in existing users
   - Generate affirmations
   - Validate subscriptions
2. All API calls should show in the Render logs
3. Your MongoDB Atlas database should show new records
4. The app should work both in the simulator and on physical devices

See [Render Deployment Verification](RENDER_DEPLOYMENT_VERIFICATION.md) for detailed verification results.

## 📝 Notes for App Store Submission

Before submitting to the App Store:

1. Ensure your [Constants.swift](file:///c%3A/a_aia/ios/SubscriptionApp/MindReprogrammingProject/ios-app/Utils/Constants.swift) file has the correct Render URL for Release builds
2. Remove any temporary debugging code
3. Test thoroughly in Release configuration
4. Verify all API endpoints work correctly with production data

## 📞 Support Resources

- [Render Dashboard](https://dashboard.render.com)
- [MongoDB Atlas](https://cloud.mongodb.com)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)