// Script to verify available endpoints
const https = require('https');

console.log('🔍 Verifying Available API Endpoints...\n');

// Test configuration
const BASE_URL = 'https://ios-hm94.onrender.com';

// List of endpoints to test
const endpoints = [
  { method: 'GET', path: '/', description: 'Root endpoint' },
  { method: 'GET', path: '/health', description: 'Basic health check' },
  { method: 'GET', path: '/api/health', description: 'API health check' },
  { method: 'POST', path: '/api/users', description: 'User registration' },
  { method: 'GET', path: '/api/users/test@example.com', description: 'Get user by email' },
  { method: 'POST', path: '/api/affirmations', description: 'Save affirmation' },
  { method: 'GET', path: '/api/affirmations/user/test-user', description: 'Get affirmations by user ID' },
  { method: 'POST', path: '/api/generate-binaural-audio', description: 'Generate binaural audio' },
  { method: 'GET', path: '/api/audio/test-user/test-file.wav', description: 'Serve audio file' }
];

// Function to make HTTP requests
function makeRequest(url, method = 'GET') {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: responseData
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        statusCode: 0,
        error: error.message
      });
    });

    req.end();
  });
}

// Test all endpoints
async function testEndpoints() {
  console.log('Testing endpoints...\n');
  
  for (const endpoint of endpoints) {
    const url = `${BASE_URL}${endpoint.path}`;
    console.log(`Testing: ${endpoint.method} ${endpoint.path}`);
    console.log(`  Description: ${endpoint.description}`);
    
    try {
      const response = await makeRequest(url, endpoint.method);
      console.log(`  Status: ${response.statusCode}`);
      
      if (response.statusCode === 200) {
        console.log('  ✅ Available');
      } else if (response.statusCode === 404) {
        console.log('  ❌ Not found (endpoint may not be implemented yet)');
      } else if (response.statusCode === 400) {
        console.log('  ⚠️  Bad request (endpoint exists but requires valid data)');
      } else {
        console.log(`  ℹ️  Status ${response.statusCode}`);
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
    
    console.log(''); // Empty line for spacing
  }
  
  console.log('✅ Endpoint verification complete!');
  console.log('\n📝 Note: Endpoints marked as "Not found" may require a new deployment to Render.com');
}

// Run the tests
testEndpoints();