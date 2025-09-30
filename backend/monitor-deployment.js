// Script to monitor deployment progress
const https = require('https');

console.log('🔍 Monitoring Deployment Progress...\n');

// Test configuration
const BASE_URL = 'https://ios-hm94.onrender.com';

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
        try {
          const parsedData = responseData ? JSON.parse(responseData) : {};
          resolve({
            statusCode: res.statusCode,
            data: parsedData
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: responseData
          });
        }
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

// Check deployment status
async function checkDeployment() {
  console.log('Checking deployment status...\n');
  
  try {
    // Check health endpoints first
    const healthResponse = await makeRequest(`${BASE_URL}/api/health`);
    console.log(`API Health Status: ${healthResponse.statusCode}`);
    
    if (healthResponse.statusCode === 200) {
      console.log(`Timestamp: ${healthResponse.data.timestamp}`);
      console.log(`Environment: ${healthResponse.data.environment}`);
      
      // Now check if the new endpoints are available
      const binauralResponse = await makeRequest(`${BASE_URL}/api/generate-binaural-audio`, 'POST');
      console.log(`\nBinaural Audio Endpoint Status: ${binauralResponse.statusCode}`);
      
      if (binauralResponse.statusCode !== 404) {
        console.log('✅ Deployment complete! New endpoints are available.');
        console.log('🎉 Binaural audio feature is now live!');
        return true;
      } else {
        console.log('⏳ Deployment in progress. New endpoints not available yet.');
        console.log('📝 This is normal. Deployment typically takes 2-5 minutes.');
        return false;
      }
    } else {
      console.log('⚠️  Backend health check failed. Deployment may still be in progress.');
      return false;
    }
  } catch (error) {
    console.log(`❌ Error checking deployment: ${error.message}`);
    return false;
  }
}

// Monitor deployment with retries
async function monitorDeployment() {
  console.log('🚀 Starting deployment monitoring...\n');
  
  let attempts = 0;
  const maxAttempts = 30; // 30 attempts with 30 second delays = 15 minutes max
  
  while (attempts < maxAttempts) {
    attempts++;
    console.log(`Attempt ${attempts}/${maxAttempts}...`);
    
    const isComplete = await checkDeployment();
    
    if (isComplete) {
      console.log('\n🎉 Deployment monitoring complete!');
      console.log('✅ Binaural audio feature is now available on your backend.');
      return;
    }
    
    if (attempts < maxAttempts) {
      console.log(`\n⏳ Waiting 30 seconds before next check...`);
      console.log('☕ Take a short break! ☕\n');
      
      // Wait 30 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 30000));
    }
  }
  
  console.log('\n⚠️  Deployment monitoring timed out.');
  console.log('📝 The deployment may still be in progress.');
  console.log('💡 You can run this script again to continue monitoring.');
}

// Run the monitoring
monitorDeployment();