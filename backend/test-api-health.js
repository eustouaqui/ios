const https = require('https');

console.log('Testing API health endpoint...');

https.get('https://ios-hm94.onrender.com/api/health', (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  res.on('data', (d) => {
    try {
      const data = JSON.parse(d);
      console.log('Response:', data);
    } catch (e) {
      console.log('Raw response:', d.toString());
    }
  });
}).on('error', (error) => {
  console.log('Error:', error.message);
});