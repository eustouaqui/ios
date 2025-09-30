const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  let localIP = null;

  // Iterate through network interfaces
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and IPv6 addresses
      if (iface.internal || iface.family !== 'IPv4') {
        continue;
      }
      
      // Skip virtual ethernet adapters and docker interfaces
      if (name.includes('docker') || name.includes('vm') || name.includes('VirtualBox')) {
        continue;
      }
      
      // Prefer WiFi interfaces (common names)
      if (name.includes('Wi-Fi') || name.includes('en0') || name.includes('wlan') || name.includes('wifi')) {
        return iface.address;
      }
      
      // Store as fallback
      if (!localIP) {
        localIP = iface.address;
      }
    }
  }
  
  return localIP;
}

function getAllIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.internal || iface.family !== 'IPv4') {
        continue;
      }
      ips.push({
        interface: name,
        address: iface.address,
        mac: iface.mac
      });
    }
  }
  
  return ips;
}

// Main execution
console.log('🔍 Finding your local IP address for iOS device testing...\n');

const localIP = getLocalIP();
const allIPs = getAllIPs();

if (localIP) {
  console.log('✅ Recommended IP for iOS testing:', localIP);
  console.log('   Update Constants.swift with: http://' + localIP + ':5000/api\n');
} else {
  console.log('⚠️  Could not automatically determine your local IP address.\n');
}

if (allIPs.length > 0) {
  console.log('📋 All available network interfaces:');
  allIPs.forEach((iface, index) => {
    console.log(`   ${index + 1}. ${iface.interface}: ${iface.address}`);
  });
  console.log('\n   Choose the WiFi interface that your iOS device can access.');
}

console.log('\n🔧 Instructions:');
console.log('1. Update Constants.swift in your iOS project:');
console.log('   #if DEBUG');
console.log('   static let apiBaseURL = "http://YOUR_IP:5000/api" // Development URL');
console.log('   #else');
console.log('   static let apiBaseURL = "https://ios-hm94.onrender.com/api" // Production URL');
console.log('   #endif');
console.log('\n2. Make sure your iOS device and computer are on the same WiFi network.');
console.log('3. Build and run the iOS app on your device.');