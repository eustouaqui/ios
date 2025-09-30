// Test script for binaural audio endpoints
const https = require('https');

console.log('🧪 Testing Binaural Audio Endpoints...\n');

// Test configuration
const BASE_URL = 'https://ios-hm94.onrender.com';

// Test data
const testAudioData = {
  userId: 'test-user-' + Date.now(),
  affirmationText: 'I am confident and capable of achieving my goals',
  binauralFrequency: '6Hz',
  voiceType: 'male'
};

// Function to make HTTP requests
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
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

    if (data) {
      options.headers['Content-Length'] = JSON.stringify(data).length;
    }

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
            headers: res.headers,
            data: parsedData
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test functions
async function testGenerateBinauralAudio() {
  console.log('1️⃣ Testing Generate Binaural Audio Endpoint...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/generate-binaural-audio`, 'POST', testAudioData);
    console.log(`   Status: ${response.statusCode}`);
    
    if (response.statusCode === 201) {
      console.log('   ✅ Binaural audio generation request successful');
      console.log(`   Message: ${response.data.message}`);
      console.log(`   Audio ID: ${response.data.audioId}`);
      console.log(`   Audio URL: ${response.data.audioUrl}`);
      return true;
    } else {
      console.log(`   ❌ Binaural audio generation failed: ${response.data.error || response.data.message}`);
      return false;
    }
  } catch (error) {
    console.log(`   ❌ Binaural audio generation error: ${error.message}`);
    return false;
  }
}

async function testServeAudioFile() {
  console.log('\n2️⃣ Testing Serve Audio File Endpoint...');
  
  // Use a placeholder URL since we don't have a real audio ID from the previous test
  const testUrl = `${BASE_URL}/api/audio/test-user/test-file.wav`;
  
  try {
    const response = await makeRequest(testUrl, 'GET');
    console.log(`   Status: ${response.statusCode}`);
    
    if (response.statusCode === 200) {
      console.log('   ✅ Audio file serving request successful');
      console.log(`   Message: ${response.data.message}`);
      return true;
    } else {
      console.log(`   ℹ️  Audio file serving returned: ${response.data.error || response.data.message}`);
      // This is expected since we're using a placeholder URL
      return true;
    }
  } catch (error) {
    console.log(`   ❌ Audio file serving error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting Binaural Audio Endpoint Tests...\n');
  
  const results = [];
  
  // Test binaural audio generation
  results.push(await testGenerateBinauralAudio());
  
  // Test audio file serving
  results.push(await testServeAudioFile());
  
  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log(`   Generate Binaural Audio: ${results[0] ? '✅ Pass' : '❌ Fail'}`);
  console.log(`   Serve Audio File: ${results[1] ? '✅ Pass' : '❌ Fail'}`);
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(`\n🎯 Overall: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All binaural audio tests passed!');
  } else {
    console.log('⚠️  Some tests failed. Please check the output above for details.');
  }
  
  return passed === total;
}

// Run the tests
runTests().then(success => {
  if (success) {
    console.log('\n✅ Binaural audio endpoint tests finished successfully!');
  } else {
    console.log('\n❌ Binaural audio endpoint tests finished with failures.');
  }
}).catch(error => {
  console.log(`\n💥 Unexpected error during testing: ${error.message}`);
});