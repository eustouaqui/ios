# End-to-End Testing Guide

This guide will help you test the complete functionality of the Mind Reprogramming application from iOS app to backend to database.

## 📋 Prerequisites Checklist

Before testing, ensure all components are properly configured:

### 1. MongoDB Atlas Setup
- [x] Account created
- [x] Cluster created (M0 free tier)
- [x] Database user with read/write permissions
- [x] IP whitelisting configured (Render IPs added)
- [x] Connection string obtained

### 2. Render.com Backend Deployment
- [x] Backend deployed to Render
- [x] Environment variables configured:
  - `MONGODB_URI` - Your MongoDB Atlas connection string
  - `NODE_ENV` - Set to "production"
- [x] Health endpoints accessible

### 3. iOS App Configuration
- [ ] Constants.swift updated with Render URL
- [ ] App builds successfully in Xcode
- [ ] All dependencies resolved

## 🧪 Testing Steps

### Step 1: Verify Backend Health

1. Open your browser and navigate to:
   - Basic health: `https://ios-hm94.onrender.com/health`
   - API health: `https://ios-hm94.onrender.com/api/health`

2. You should see responses like:
   ```json
   {
     "status": "OK",
     "environment": "production",
     "database": "Connected",
     "timestamp": "2025-09-30T12:34:56.789Z"
   }
   ```

### Step 2: Test API Endpoints

Use the web frontend API demo page or Postman to test core endpoints:

1. **User Registration**
   - Endpoint: `POST https://ios-hm94.onrender.com/api/users`
   - Body:
     ```json
     {
       "email": "test@example.com",
       "name": "Test User"
     }
     ```

2. **Save User Profile**
   - Endpoint: `POST https://ios-hm94.onrender.com/api/profile`
   - Body:
     ```json
     {
       "userId": "test-user-id",
       "religion": "spiritual",
       "maritalStatus": "single",
       "profession": "developer",
       "ambitions": "success",
       "fears": "failure",
       "dreams": "happiness"
     }
     ```

3. **Save User Goals**
   - Endpoint: `POST https://ios-hm94.onrender.com/api/goals`
   - Body:
     ```json
     {
       "userId": "test-user-id",
       "goals": ["confidence", "success", "health"]
     }
     ```

4. **Save User Preferences**
   - Endpoint: `POST https://ios-hm94.onrender.com/api/preferences`
   - Body:
     ```json
     {
       "userId": "test-user-id",
       "voiceType": "male",
       "backgroundSound": "nature"
     }
     ```

5. **Generate Affirmation**
   - Endpoint: `POST https://ios-hm94.onrender.com/api/affirmations`
   - Body:
     ```json
     {
       "userId": "test-user-id",
       "text": "I am capable of achieving my goals",
       "category": "confidence"
     }
     ```

### Step 3: Test iOS App Functionality

1. **Build and Run iOS App**
   - Open the project in Xcode
   - Select a simulator or connected device
   - Build and run the app

2. **Test Affirmation Form Flow**
   - Navigate through all 4 steps of the affirmation form:
     1. Profile collection (religion, marital status, etc.)
     2. Goals selection
     3. Voice preferences
     4. Result display
   - Verify data is saved at each step

3. **Test Subscription Flow**
   - Verify subscription options are displayed
   - Test free trial functionality
   - Check subscription status display

### Step 4: Verify Data Persistence

1. **Check Database Records**
   - Log in to MongoDB Atlas
   - Navigate to your cluster
   - Verify collections contain test data:
     - `users` collection with user profiles
     - `affirmations` collection with generated affirmations

2. **Verify Data Consistency**
   - Ensure data saved from iOS app matches database records
   - Check that all form fields are properly stored

## 🔧 Troubleshooting Common Issues

### Backend Connection Issues

**Problem**: Cannot connect to backend endpoints
**Solutions**:
1. Check Render.com dashboard for deployment status
2. Verify environment variables are correctly set
3. Confirm MongoDB Atlas IP whitelisting includes Render IPs
4. Check MongoDB Atlas cluster status (not paused)

### iOS App Connection Issues

**Problem**: iOS app cannot communicate with backend
**Solutions**:
1. Verify Constants.swift has correct Render URL
2. Ensure app is built in Debug mode for testing
3. Check network connectivity on device/simulator
4. Verify no App Transport Security issues

### Database Issues

**Problem**: Data not saving to MongoDB
**Solutions**:
1. Check MongoDB Atlas connection string
2. Verify database user permissions
3. Confirm IP whitelisting is correct
4. Check backend logs for database errors

## 📊 Verification Checklist

### Backend Verification
- [ ] Health endpoints return "OK" status
- [ ] API endpoints accept and process requests
- [ ] Database connections are successful
- [ ] Error handling works correctly

### iOS App Verification
- [ ] App builds and runs without errors
- [ ] All form steps function correctly
- [ ] Data is sent to backend successfully
- [ ] User interface displays properly

### Data Verification
- [ ] User profiles saved to database
- [ ] Goals and preferences stored correctly
- [ ] Affirmations generated and saved
- [ ] Subscription data handled properly

### Integration Verification
- [ ] End-to-end user flow works
- [ ] Data consistency between app and database
- [ ] Error states handled gracefully
- [ ] Performance meets expectations

## 🎉 Success Criteria

When all tests pass, you should see:

1. **Backend**: All health checks return "OK" with "database": "Connected"
2. **iOS App**: All form steps complete without errors
3. **Database**: Collections contain test data with proper structure
4. **Integration**: Data flows correctly from app to backend to database

## 📞 Support Resources

- **Render Dashboard**: https://dashboard.render.com
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Project Documentation**: See documentation folder for detailed guides

## 🚀 Next Steps After Successful Testing

1. Prepare for App Store submission
2. Set up monitoring and alerting
3. Plan feature enhancements
4. Gather user feedback for improvements