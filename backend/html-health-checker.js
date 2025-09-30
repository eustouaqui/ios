// HTML File Health Checker
// A tool to evaluate the health of HTML files in your project

const fs = require('fs');
const path = require('path');

class HTMLHealthChecker {
  constructor() {
    this.issues = [];
  }

  // Check a single HTML file
  checkHTMLFile(filePath) {
    try {
      const htmlContent = fs.readFileSync(filePath, 'utf8');
      return this.analyzeHTMLContent(htmlContent, filePath);
    } catch (error) {
      return {
        file: filePath,
        error: error.message,
        issues: ['Failed to read file'],
        healthy: false
      };
    }
  }

  // Analyze HTML content for issues
  analyzeHTMLContent(htmlContent, filePath) {
    const issues = [];
    const warnings = [];
    
    // Check for DOCTYPE
    if (!htmlContent.includes('<!DOCTYPE html>')) {
      warnings.push('Missing DOCTYPE declaration');
    }
    
    // Check for html tag
    if (!htmlContent.includes('<html') && !htmlContent.includes('<HTML')) {
      issues.push('Missing html tag');
    }
    
    // Check for head tag
    if (!htmlContent.includes('<head>') && !htmlContent.includes('<HEAD>')) {
      issues.push('Missing head tag');
    }
    
    // Check for title tag
    if (!htmlContent.includes('<title>') && !htmlContent.includes('<TITLE>')) {
      issues.push('Missing title tag');
    }
    
    // Check for body tag
    if (!htmlContent.includes('<body>') && !htmlContent.includes('<BODY>')) {
      issues.push('Missing body tag');
    }
    
    // Check for meta charset
    if (!htmlContent.includes('charset=') && !htmlContent.includes('Charset=')) {
      warnings.push('Missing charset declaration');
    }
    
    // Check for viewport meta tag
    if (!htmlContent.includes('name="viewport"') && !htmlContent.includes('name=\'viewport\'')) {
      warnings.push('Missing viewport meta tag');
    }
    
    // Check for alt attributes on images
    const imgTags = htmlContent.match(/<img[^>]*>/gi) || [];
    let missingAltCount = 0;
    imgTags.forEach(img => {
      if (!img.includes('alt=')) {
        missingAltCount++;
      }
    });
    
    if (missingAltCount > 0) {
      issues.push(`Missing alt attribute on ${missingAltCount} image(s)`);
    }
    
    // Check for form labels
    const inputTags = htmlContent.match(/<input[^>]*>/gi) || [];
    let missingLabelCount = 0;
    inputTags.forEach(input => {
      if (!input.includes('aria-label') && !input.includes('id=')) {
        missingLabelCount++;
      }
    });
    
    if (missingLabelCount > 0) {
      warnings.push(`Missing labels on ${missingLabelCount} input(s)`);
    }
    
    // Check for deprecated tags
    const deprecatedTags = ['<center>', '<font>', '<marquee>', '<blink>'];
    deprecatedTags.forEach(tag => {
      if (htmlContent.includes(tag)) {
        warnings.push(`Contains deprecated tag: ${tag}`);
      }
    });
    
    // Check for inline styles
    const inlineStyles = htmlContent.match(/style\s*=\s*["'][^"']*["']/gi) || [];
    if (inlineStyles.length > 5) {
      warnings.push(`Contains ${inlineStyles.length} inline styles (recommend using CSS classes)`);
    }
    
    // Check for broken links (basic check)
    const links = htmlContent.match(/href\s*=\s*["'][^"']*["']/gi) || [];
    const brokenLinks = links.filter(link => {
      const url = link.match(/["']([^"']*)["']/);
      if (url && url[1]) {
        const href = url[1];
        return href.startsWith('http') && !href.includes('.');
      }
      return false;
    });
    
    if (brokenLinks.length > 0) {
      warnings.push(`Contains ${brokenLinks.length} potentially broken links`);
    }
    
    return {
      file: filePath,
      issues: issues,
      warnings: warnings,
      healthy: issues.length === 0,
      issueCount: issues.length,
      warningCount: warnings.length
    };
  }

  // Check all HTML files in a directory
  checkHTMLDirectory(directoryPath) {
    const results = [];
    
    try {
      const files = fs.readdirSync(directoryPath);
      
      files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // Recursively check subdirectories
          results.push(...this.checkHTMLDirectory(filePath));
        } else if (file.endsWith('.html') || file.endsWith('.htm')) {
          // Check HTML files
          const result = this.checkHTMLFile(filePath);
          results.push(result);
          
          if (result.healthy) {
            console.log(`✅ ${filePath} - Healthy`);
          } else {
            console.log(`❌ ${filePath} - ${result.issues.length} issues, ${result.warnings.length} warnings`);
          }
        }
      });
    } catch (error) {
      console.error(`Error reading directory ${directoryPath}:`, error.message);
    }
    
    return results;
  }

  // Generate health report
  generateReport(results) {
    const total = results.length;
    const healthy = results.filter(r => r.healthy).length;
    const unhealthy = total - healthy;
    const totalIssues = results.reduce((sum, r) => sum + r.issueCount, 0);
    const totalWarnings = results.reduce((sum, r) => sum + r.warningCount, 0);
    
    console.log('\n=== HTML Health Report ===');
    console.log(`Total HTML files checked: ${total}`);
    console.log(`Healthy: ${healthy} (${((healthy/total)*100).toFixed(1)}%)`);
    console.log(`Unhealthy: ${unhealthy} (${((unhealthy/total)*100).toFixed(1)}%)`);
    console.log(`Total issues: ${totalIssues}`);
    console.log(`Total warnings: ${totalWarnings}`);
    
    console.log('\nDetailed Results:');
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.file}`);
      if (result.healthy) {
        console.log(`   ✅ Healthy`);
      } else {
        console.log(`   ❌ Issues: ${result.issues.length}, Warnings: ${result.warnings.length}`);
        if (result.issues.length > 0) {
          result.issues.forEach(issue => console.log(`      - ${issue}`));
        }
        if (result.warnings.length > 0) {
          result.warnings.forEach(warning => console.log(`      ⚠️ ${warning}`));
        }
      }
    });
    
    return {
      total,
      healthy,
      unhealthy,
      totalIssues,
      totalWarnings,
      healthyPercentage: ((healthy/total)*100).toFixed(1),
      unhealthyPercentage: ((unhealthy/total)*100).toFixed(1),
      details: results
    };
  }
}

// Example usage
function runHTMLHealthCheck() {
  const checker = new HTMLHealthChecker();
  
  // Check HTML files in your project (adjust path as needed)
  const projectPath = path.join(__dirname, '..', 'ios-app'); // Adjust this path
  console.log(`Checking HTML files in: ${projectPath}`);
  
  try {
    const results = checker.checkHTMLDirectory(projectPath);
    const report = checker.generateReport(results);
    
    // Save report to file
    fs.writeFileSync('html-health-report.json', JSON.stringify(report, null, 2));
    console.log('\nReport saved to html-health-report.json');
    
    return report;
  } catch (error) {
    console.error('HTML health check failed:', error);
  }
}

// Export for use in other modules
module.exports = HTMLHealthChecker;

// Run if called directly
if (require.main === module) {
  runHTMLHealthCheck();
}

console.log('HTML Health Checker initialized. Run to check HTML files.');
console.log('Example: node html-health-checker.js');