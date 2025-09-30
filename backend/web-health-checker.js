// Web Page Health Checker
// A simple tool to evaluate the health of web pages

const https = require('https');
const http = require('http');
const { URL } = require('url');

class WebHealthChecker {
  constructor() {
    this.results = [];
  }

  // Check if a URL is valid
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Perform HTTP request and get response
  async checkUrl(url) {
    return new Promise((resolve, reject) => {
      if (!this.isValidUrl(url)) {
        reject(new Error('Invalid URL'));
        return;
      }

      const urlObj = new URL(url);
      const protocol = urlObj.protocol === 'https:' ? https : http;
      
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + urlObj.search,
        method: 'GET',
        timeout: 10000 // 10 second timeout
      };

      const req = protocol.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          resolve({
            url: url,
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            headers: res.headers,
            responseTime: Date.now() - startTime,
            contentLength: data.length,
            healthy: res.statusCode >= 200 && res.statusCode < 400
          });
        });
      });
      
      req.on('error', (error) => {
        reject({
          url: url,
          error: error.message,
          healthy: false
        });
      });
      
      req.on('timeout', () => {
        req.destroy();
        reject({
          url: url,
          error: 'Request timeout',
          healthy: false
        });
      });
      
      const startTime = Date.now();
      req.end();
    });
  }

  // Check multiple URLs
  async checkUrls(urls) {
    const results = [];
    
    for (const url of urls) {
      try {
        const result = await this.checkUrl(url);
        results.push(result);
        console.log(`✅ ${result.url} - Status: ${result.statusCode} (${result.responseTime}ms)`);
      } catch (error) {
        const result = {
          url: url,
          error: error.error || error.message,
          healthy: false
        };
        results.push(result);
        console.log(`❌ ${url} - Error: ${error.error || error.message}`);
      }
    }
    
    return results;
  }

  // Generate health report
  generateReport(results) {
    const total = results.length;
    const healthy = results.filter(r => r.healthy).length;
    const unhealthy = total - healthy;
    
    console.log('\n=== Web Page Health Report ===');
    console.log(`Total URLs checked: ${total}`);
    console.log(`Healthy: ${healthy} (${((healthy/total)*100).toFixed(1)}%)`);
    console.log(`Unhealthy: ${unhealthy} (${((unhealthy/total)*100).toFixed(1)}%)`);
    
    console.log('\nDetailed Results:');
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.url}`);
      if (result.healthy) {
        console.log(`   ✅ Status: ${result.statusCode} (${result.responseTime}ms)`);
        console.log(`   Content Length: ${result.contentLength} bytes`);
      } else {
        console.log(`   ❌ Error: ${result.error}`);
      }
    });
    
    return {
      total,
      healthy,
      unhealthy,
      healthyPercentage: ((healthy/total)*100).toFixed(1),
      unhealthyPercentage: ((unhealthy/total)*100).toFixed(1),
      details: results
    };
  }

  // Check for common SEO issues
  checkSEOIssues(htmlContent, url) {
    const issues = [];
    
    // Check for title tag
    if (!htmlContent.includes('<title>') || !htmlContent.includes('</title>')) {
      issues.push('Missing title tag');
    }
    
    // Check for meta description
    if (!htmlContent.includes('name="description"') && !htmlContent.includes('name=\'description\'')) {
      issues.push('Missing meta description');
    }
    
    // Check for H1 tag
    if (!htmlContent.includes('<h1>') && !htmlContent.includes('<H1>')) {
      issues.push('Missing H1 heading');
    }
    
    // Check for viewport meta tag
    if (!htmlContent.includes('name="viewport"') && !htmlContent.includes('name=\'viewport\'')) {
      issues.push('Missing viewport meta tag');
    }
    
    return issues;
  }

  // Check for accessibility issues
  checkAccessibilityIssues(htmlContent) {
    const issues = [];
    
    // Check for alt attributes on images
    const imgTags = htmlContent.match(/<img[^>]*>/gi) || [];
    imgTags.forEach(img => {
      if (!img.includes('alt=')) {
        issues.push('Image missing alt attribute');
      }
    });
    
    // Check for form labels
    const inputTags = htmlContent.match(/<input[^>]*>/gi) || [];
    inputTags.forEach(input => {
      if (!input.includes('aria-label') && !input.includes('id=')) {
        issues.push('Input missing label or aria-label');
      }
    });
    
    return issues;
  }
}

// Example usage
async function runHealthCheck() {
  const checker = new WebHealthChecker();
  
  // URLs to check (replace with your actual URLs)
  const urls = [
    'https://YOUR_RENDER_APP.onrender.com/health',
    'https://YOUR_RENDER_APP.onrender.com/api/health',
    // Add more URLs as needed
  ];
  
  console.log('Starting web page health check...');
  
  try {
    const results = await checker.checkUrls(urls);
    const report = checker.generateReport(results);
    
    // Save report to file
    const fs = require('fs');
    fs.writeFileSync('web-health-report.json', JSON.stringify(report, null, 2));
    console.log('\nReport saved to web-health-report.json');
    
    return report;
  } catch (error) {
    console.error('Health check failed:', error);
  }
}

// Export for use in other modules
module.exports = WebHealthChecker;

// Run if called directly
if (require.main === module) {
  runHealthCheck();
}

console.log('Web Health Checker initialized. Run with URLs to check.');
console.log('Example: node web-health-checker.js');