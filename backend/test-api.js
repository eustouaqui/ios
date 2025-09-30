// Simple test script to verify backend API endpoints
const http = require('http');

// Test configuration
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/health',
  method: 'GET'
};

console.log('Testing API endpoints...');

// Test health endpoint
const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  res.on('data', (d) => {
    try {
      const data = JSON.parse(d);
      console.log('Response:', data);
      console.log('✅ Health endpoint working correctly');
    } catch (error) {
      console.log('Response:', d.toString());
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Error connecting to server:', error.message);
  console.log('Please make sure the server is running on port 5000');
});

req.end();

// Test basic endpoint
setTimeout(() => {
  const basicOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/health',
    method: 'GET'
  };
  
  const basicReq = http.request(basicOptions, (res) => {
    console.log(`Basic health check - Status: ${res.statusCode}`);
    if (res.statusCode === 200) {
      console.log('✅ Basic health endpoint working correctly');
    }
  });
  
  basicReq.on('error', (error) => {
    console.log('❌ Error with basic health check:', error.message);
  });
  
  basicReq.end();
}, 1000);