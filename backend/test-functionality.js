// Comprehensive test script to verify all backend API endpoints functionality
const http = require('http');
const https = require('https');

// Test configuration
const hostname = 'localhost';
const port = 5000;

// Test data
const testUser = {
  email: 'test@example.com',
  name: 'Test User'
};

const testAffirmation = {
  userId: 'test-user-id',
  text: 'I am capable of achieving my goals',
  category: 'confidence'
};

console.log('🧪 Testing API Functionality...\n');

// Function to make HTTP requests
function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : {};
          resolve({ statusCode: res.statusCode, headers: res.headers, data: jsonData });
        } catch (error) {
          resolve({ statusCode: res.statusCode, headers: res.headers, data: data });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    
    req.end();
  });
}

// Test 1: User Registration (POST /api/users)
async function testUserRegistration() {
  console.log('1️⃣ Testing User Registration (POST /api/users)...');
  
  const options = {
    hostname: hostname,
    port: port,
    path: '/api/users',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await makeRequest(options, testUser);
    console.log(`   Status: ${response.statusCode}`);
    
    if (response.statusCode === 201) {
      console.log('   ✅ User registration successful');
      console.log(`   Message: ${response.data.message}`);
      return response.data.user; // Return the created user for subsequent tests
    } else if (response.statusCode === 400 && response.data.error === 'User already exists') {
      console.log('   ⚠️  User already exists (this is expected if test was run before)');
      // Try to get the existing user
      return await getUserByEmail(testUser.email);
    } else {
      console.log('   ❌ User registration failed');
      console.log('   Response:', response.data);
      return null;
    }
  } catch (error) {
    console.log('   ❌ Error during user registration:', error.message);
    return null;
  }
}

// Test 2: Get User by Email (GET /api/users/:email)
async function getUserByEmail(email) {
  console.log('\n2️⃣ Testing Get User by Email (GET /api/users/:email)...');
  
  const options = {
    hostname: hostname,
    port: port,
    path: `/api/users/${encodeURIComponent(email)}`,
    method: 'GET'
  };
  
  try {
    const response = await makeRequest(options);
    console.log(`   Status: ${response.statusCode}`);
    
    if (response.statusCode === 200) {
      console.log('   ✅ User retrieval successful');
      console.log(`   User: ${response.data.name} (${response.data.email})`);
      return response.data;
    } else if (response.statusCode === 404) {
      console.log('   ❌ User not found');
      console.log('   Response:', response.data);
      return null;
    } else {
      console.log('   ❌ User retrieval failed');
      console.log('   Response:', response.data);
      return null;
    }
  } catch (error) {
    console.log('   ❌ Error during user retrieval:', error.message);
    return null;
  }
}

// Test 3: Save Affirmation (POST /api/affirmations)
async function testSaveAffirmation(userId) {
  console.log('\n3️⃣ Testing Save Affirmation (POST /api/affirmations)...');
  
  // Update the userId in the test affirmation
  const affirmationData = { ...testAffirmation, userId: userId };
  
  const options = {
    hostname: hostname,
    port: port,
    path: '/api/affirmations',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await makeRequest(options, affirmationData);
    console.log(`   Status: ${response.statusCode}`);
    
    if (response.statusCode === 201) {
      console.log('   ✅ Affirmation saved successfully');
      console.log(`   Message: ${response.data.message}`);
      return response.data.affirmation; // Return the saved affirmation for subsequent tests
    } else {
      console.log('   ❌ Affirmation save failed');
      console.log('   Response:', response.data);
      return null;
    }
  } catch (error) {
    console.log('   ❌ Error during affirmation save:', error.message);
    return null;
  }
}

// Test 4: Get Affirmations by User ID (GET /api/affirmations/user/:userId)
async function getAffirmationsByUserId(userId) {
  console.log('\n4️⃣ Testing Get Affirmations by User ID (GET /api/affirmations/user/:userId)...');
  
  const options = {
    hostname: hostname,
    port: port,
    path: `/api/affirmations/user/${encodeURIComponent(userId)}`,
    method: 'GET'
  };
  
  try {
    const response = await makeRequest(options);
    console.log(`   Status: ${response.statusCode}`);
    
    if (response.statusCode === 200) {
      console.log('   ✅ Affirmations retrieval successful');
      console.log(`   Found ${response.data.length} affirmation(s)`);
      if (response.data.length > 0) {
        console.log(`   Sample: ${response.data[0].text}`);
      }
      return response.data;
    } else {
      console.log('   ❌ Affirmations retrieval failed');
      console.log('   Response:', response.data);
      return null;
    }
  } catch (error) {
    console.log('   ❌ Error during affirmations retrieval:', error.message);
    return null;
  }
}

// Test 5: Health Check Endpoints
async function testHealthEndpoints() {
  console.log('\n5️⃣ Testing Health Check Endpoints...');
  
  // Test basic health endpoint
  console.log('   Testing basic health endpoint (GET /health)...');
  const basicOptions = {
    hostname: hostname,
    port: port,
    path: '/health',
    method: 'GET'
  };
  
  try {
    const basicResponse = await makeRequest(basicOptions);
    console.log(`   Basic Health Status: ${basicResponse.statusCode}`);
    if (basicResponse.statusCode === 200) {
      console.log('   ✅ Basic health endpoint working');
    } else {
      console.log('   ❌ Basic health endpoint failed');
    }
  } catch (error) {
    console.log('   ❌ Error with basic health check:', error.message);
  }
  
  // Test API health endpoint
  console.log('   Testing API health endpoint (GET /api/health)...');
  const apiOptions = {
    hostname: hostname,
    port: port,
    path: '/api/health',
    method: 'GET'
  };
  
  try {
    const apiResponse = await makeRequest(apiOptions);
    console.log(`   API Health Status: ${apiResponse.statusCode}`);
    if (apiResponse.statusCode === 200) {
      console.log('   ✅ API health endpoint working');
      console.log(`   Database: ${apiResponse.data.database}`);
      console.log(`   Environment: ${apiResponse.data.environment}`);
    } else {
      console.log('   ❌ API health endpoint failed');
      console.log('   Response:', apiResponse.data);
    }
  } catch (error) {
    console.log('   ❌ Error with API health check:', error.message);
    console.log('   Please make sure the server is running on port 5000');
  }
}

// Main test function
async function runAllTests() {
  console.log('🚀 Starting API Functionality Tests...\n');
  
  try {
    // Test health endpoints first
    await testHealthEndpoints();
    
    // Test user registration
    const user = await testUserRegistration();
    if (!user) {
      console.log('\n⚠️  Skipping subsequent tests due to user registration failure');
      return;
    }
    
    // Test get user by email
    const retrievedUser = await getUserByEmail(testUser.email);
    if (!retrievedUser) {
      console.log('\n⚠️  Skipping subsequent tests due to user retrieval failure');
      return;
    }
    
    // Test save affirmation
    const affirmation = await testSaveAffirmation(user._id || 'test-user-id');
    if (!affirmation) {
      console.log('\n⚠️  Skipping affirmation retrieval test due to save failure');
    } else {
      // Test get affirmations by user ID
      await getAffirmationsByUserId(user._id || 'test-user-id');
    }
    
    console.log('\n🎉 All tests completed!');
  } catch (error) {
    console.log('\n💥 Unexpected error during testing:', error.message);
  }
}

// Run the tests
runAllTests();