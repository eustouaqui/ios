# API Functionality Test Guide

This guide explains how to use the test script to verify the functionality of the Mind Reprogramming backend API endpoints.

## 🎯 Purpose

The [test-functionality.js](file:///c%3A/a_aia/ios/SubscriptionApp/MindReprogrammingProject/backend/test-functionality.js) script tests the core API endpoints to ensure they are working correctly:

1. User registration: `POST /api/users`
2. User retrieval: `GET /api/users/:email`
3. Affirmation saving: `POST /api/affirmations`
4. Affirmation retrieval: `GET /api/affirmations/user/:userId`
5. Health check endpoints: `GET /health` and `GET /api/health`

## 📋 Prerequisites

1. The backend server must be running locally on port 5000
2. MongoDB Atlas must be properly configured with correct IP whitelisting
3. Environment variables must be set correctly in the `.env` file

## ▶️ Running the Test

### Method 1: Using npm script (Recommended)

From the backend directory, run:
```bash
npm run test-functionality
```

### Method 2: Direct execution

From the backend directory, run:
```bash
node test-functionality.js
```

## 🧪 What the Test Does

The test performs the following steps:

1. **Health Check Tests**
   - Verifies the basic health endpoint (`/health`)
   - Verifies the API health endpoint (`/api/health`)

2. **User Registration Test**
   - Sends a POST request to `/api/users` with test user data
   - Handles both successful registration and "user already exists" scenarios

3. **User Retrieval Test**
   - Sends a GET request to `/api/users/:email` to retrieve the test user
   - Verifies the user data matches what was registered

4. **Affirmation Saving Test**
   - Sends a POST request to `/api/affirmations` with test affirmation data
   - Verifies the affirmation was saved successfully

5. **Affirmation Retrieval Test**
   - Sends a GET request to `/api/affirmations/user/:userId` to retrieve affirmations
   - Verifies the affirmations are returned correctly

## 📊 Expected Output

When all tests pass, you should see output similar to:
```
🧪 Testing API Functionality...

🚀 Starting API API Functionality Tests...

5️⃣ Testing Health Check Endpoints...
   Testing basic health endpoint (GET /health)...
   Basic Health Status: 200
   ✅ Basic health endpoint working
   Testing API health endpoint (GET /api/health)...
   API Health Status: 200
   ✅ API health endpoint working
   Database: Connected
   Environment: development

1️⃣ Testing User Registration (POST /api/users)...
   Status: 201
   ✅ User registration successful
   Message: User created

2️⃣ Testing Get User by Email (GET /api/users/:email)...
   Status: 200
   ✅ User retrieval successful
   User: Test User (test@example.com)

3️⃣ Testing Save Affirmation (POST /api/affirmations)...
   Status: 201
   ✅ Affirmation saved successfully
   Message: Affirmation saved

4️⃣ Testing Get Affirmations by User ID (GET /api/affirmations/user/:userId)...
   Status: 200
   ✅ Affirmations retrieval successful
   Found 1 affirmation(s)
   Sample: I am capable of achieving my goals

🎉 All tests completed!
```

## ❌ Troubleshooting

### Common Issues and Solutions

1. **"Error connecting to server"**
   - Make sure the backend server is running (`npm start` or `npm run dev`)
   - Verify the server is listening on port 5000

2. **MongoDB Connection Errors**
   - Check MongoDB Atlas IP whitelisting
   - Verify connection string in `.env` file
   - Ensure network connectivity

3. **400 Bad Request Errors**
   - Check request data format
   - Verify required fields are present

4. **404 Not Found Errors**
   - Verify the endpoint path is correct
   - Check if the requested resource exists

## 🛠️ Customizing the Test

You can modify the test data in the script:
- `testUser`: User data for registration test
- `testAffirmation`: Affirmation data for saving test

## 🔄 Re-running Tests

The test is designed to be idempotent:
- If a user already exists, it will retrieve the existing user
- Previous test data won't interfere with new test runs

## 📝 Notes

- The test uses localhost:5000 by default
- All requests use JSON format for data exchange
- Error responses include detailed information to help with debugging