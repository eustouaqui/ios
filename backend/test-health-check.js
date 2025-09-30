// Test script for web health checker
// Demonstrates how to use the health checker tools

const WebHealthChecker = require('./web-health-checker');
const HTMLHealthChecker = require('./html-health-checker');

async function runTests() {
  console.log('🧪 Running Health Check Tests\n');
  
  // Test Web Health Checker
  console.log('🌐 Testing Web Page Health Checker...');
  const webChecker = new WebHealthChecker();
  
  // Example URLs (replace with your actual URLs)
  const testUrls = [
    'https://httpbin.org/get', // This should work
    'https://httpbin.org/status/404', // This will return 404
    'https://invalid-domain-that-does-not-exist-12345.com' // This will fail
  ];
  
  try {
    const webResults = await webChecker.checkUrls(testUrls);
    const webReport = webChecker.generateReport(webResults);
    console.log('✅ Web Health Check Complete\n');
  } catch (error) {
    console.log('❌ Web Health Check Failed:', error.message);
  }
  
  // Test HTML Health Checker
  console.log('📄 Testing HTML Health Checker...');
  const htmlChecker = new HTMLHealthChecker();
  
  // Check current directory for HTML files
  try {
    const htmlResults = htmlChecker.checkHTMLDirectory(__dirname);
    if (htmlResults.length > 0) {
      const htmlReport = htmlChecker.generateReport(htmlResults);
      console.log('✅ HTML Health Check Complete\n');
    } else {
      console.log('ℹ️  No HTML files found in current directory\n');
    }
  } catch (error) {
    console.log('❌ HTML Health Check Failed:', error.message);
  }
  
  console.log('🏁 All Tests Completed');
}

// Run tests if called directly
if (require.main === module) {
  runTests();
}

module.exports = runTests;