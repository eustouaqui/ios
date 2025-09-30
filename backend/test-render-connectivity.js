// Test script to check if Render service is responding
const https = require('https');

console.log('Testing Render service connectivity...');

// Test the health endpoint
const url = 'https://ios-hm94.onrender.com/health';

console.log(`Making request to: ${url}`);

https.get(url, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Headers:', res.headers);
    console.log('Response Body:', data);
    
    try {
      const jsonData = JSON.parse(data);
      console.log('Parsed JSON Response:', jsonData);
    } catch (error) {
      console.log('Response is not JSON:', data);
    }
  });
}).on('error', (error) => {
  console.log('Request Error:', error.message);
  console.log('This might indicate the service is sleeping or having issues');
}).setTimeout(30000, () => {
  console.log('Request timed out after 30 seconds');
  console.log('This is normal for free Render services that may be sleeping');
});