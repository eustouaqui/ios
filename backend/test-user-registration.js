const https = require('https');

console.log('Testing user registration endpoint...');

// Test data
const userData = {
  email: 'test@example.com',
  name: 'Test User'
};

const postData = JSON.stringify(userData);

const options = {
  hostname: 'ios-hm94.onrender.com',
  port: 443,
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  res.on('data', (d) => {
    try {
      const data = JSON.parse(d);
      console.log('Response:', data);
    } catch (e) {
      console.log('Raw response:', d.toString());
    }
  });
});

req.on('error', (error) => {
  console.log('Error:', error.message);
});

req.write(postData);
req.end();