// Test script to verify Render deployment endpoints
const https = require('https');

// Test configuration
const baseUrl = 'https://ios-hm94.onrender.com';

// Test endpoints
const endpoints = [
  '/',
  '/health',
  '/api/health'
];

console.log('🧪 Testing Render Deployment Endpoints...\n');

// Function to make HTTPS requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
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
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Test all endpoints
async function testEndpoints() {
  for (const endpoint of endpoints) {
    const url = `${baseUrl}${endpoint}`;
    console.log(`Testing: ${url}`);
    
    try {
      const response = await makeRequest(url);
      console.log(`  Status: ${response.statusCode}`);
      
      if (response.statusCode === 200) {
        console.log('  ✅ Success');
        if (response.data && typeof response.data === 'object') {
          console.log(`  Response: ${JSON.stringify(response.data, null, 2)}`);
        } else if (response.data) {
          console.log(`  Response: ${response.data}`);
        }
      } else {
        console.log('  ❌ Failed');
        console.log(`  Response: ${response.data}`);
      }
    } catch (error) {
      console.log('  ❌ Error:', error.message);
    }
    
    console.log(''); // Empty line for spacing
  }
  
  console.log('🎉 All endpoint tests completed!');
}

// Run the tests
testEndpoints();