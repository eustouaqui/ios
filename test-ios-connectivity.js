const express = require('express');
const cors = require('cors');
const path = require('path');

// Simple test server to verify iOS connectivity
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve a simple test page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>iOS Connectivity Test</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <h1>iOS Connectivity Test Server</h1>
      <p>This server is running to test iOS device connectivity.</p>
      <p>If you can see this page on your iOS device, the network connection is working.</p>
      
      <h2>API Endpoints:</h2>
      <ul>
        <li><a href="/test">/test</a> - Simple test endpoint</li>
        <li><a href="/health">/health</a> - Health check endpoint</li>
        <li><a href="/api/test">/api/test</a> - API test endpoint</li>
      </ul>
      
      <button onclick="testAPI()">Test API Connection</button>
      <div id="result"></div>
      
      <script>
        async function testAPI() {
          const resultDiv = document.getElementById('result');
          try {
            const response = await fetch('/api/test');
            const data = await response.json();
            resultDiv.innerHTML = '<p style="color: green;">✅ API Connection Successful: ' + JSON.stringify(data) + '</p>';
          } catch (error) {
            resultDiv.innerHTML = '<p style="color: red;">❌ API Connection Failed: ' + error.message + '</p>';
          }
        }
      </script>
    </body>
    </html>
  `);
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'iOS connectivity test successful',
    timestamp: new Date().toISOString(),
    server: 'iOS Test Server'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// API test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API test successful',
    timestamp: new Date().toISOString(),
    server: 'iOS Test API Server'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`📡 iOS Connectivity Test Server running on port ${PORT}`);
  console.log(`📱 Test from your iOS device by visiting: http://YOUR_COMPUTER_IP:${PORT}`);
  console.log(`📋 Find your computer's IP address by running: npm run find-ip`);
  console.log(`\n🔧 To test with the actual backend, start it with: npm run dev`);
});