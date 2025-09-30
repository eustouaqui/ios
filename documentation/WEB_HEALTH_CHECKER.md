# Web Health Checker Documentation

This documentation explains how to use the web health checker tools to evaluate the health of your web pages and HTML files.

## 📁 Files Included

1. `web-health-checker.js` - Checks the health of live web pages via HTTP requests
2. `html-health-checker.js` - Analyzes HTML files for common issues
3. Updated `package.json` with new scripts

## 🚀 Web Page Health Checker

### Purpose
Checks the health of live web pages by making HTTP requests and analyzing responses.

### Usage
```bash
cd backend
npm run health-check
```

### Features
- HTTP status code validation
- Response time measurement
- Content length analysis
- Error detection
- Detailed reporting

### Configuration
Edit the `web-health-checker.js` file to add your URLs:

```javascript
const urls = [
  'https://YOUR_RENDER_APP.onrender.com/health',
  'https://YOUR_RENDER_APP.onrender.com/api/health',
  // Add more URLs as needed
];
```

### Output
Generates a `web-health-report.json` file with detailed results.

## 📄 HTML Health Checker

### Purpose
Analyzes HTML files for common issues, accessibility problems, and best practices.

### Usage
```bash
cd backend
npm run html-check
```

### Features
- DOCTYPE validation
- Tag structure checking
- Accessibility issue detection
- SEO best practice validation
- Deprecated tag identification
- Inline style detection

### Configuration
The checker looks for HTML files in the `ios-app` directory by default. You can modify the path in `html-health-checker.js`:

```javascript
const projectPath = path.join(__dirname, '..', 'ios-app'); // Adjust this path
```

### Output
Generates an `html-health-report.json` file with detailed results.

## 📊 Health Report Format

Both checkers generate JSON reports with the following structure:

```json
{
  "total": 2,
  "healthy": 2,
  "unhealthy": 0,
  "healthyPercentage": "100.0",
  "unhealthyPercentage": "0.0",
  "details": [
    {
      "url": "https://example.com/health",
      "statusCode": 200,
      "responseTime": 125,
      "healthy": true
    }
  ]
}
```

## 🛠️ Customization

### Adding More URLs
Edit the URL array in `web-health-checker.js`:

```javascript
const urls = [
  'https://YOUR_RENDER_APP.onrender.com/health',
  'https://YOUR_RENDER_APP.onrender.com/api/health',
  'https://YOUR_RENDER_APP.onrender.com/api/users',
  // Add more endpoints as needed
];
```

### Adjusting Timeout
Modify the timeout value in `web-health-checker.js`:

```javascript
const options = {
  // ... other options
  timeout: 15000 // 15 seconds instead of 10
};
```

### Changing Directory Path
Update the path in `html-health-checker.js`:

```javascript
const projectPath = path.join(__dirname, '..', 'your-html-directory');
```

## 🧪 Testing

### Test Web Health Checker
```bash
npm run health-check
```

### Test HTML Health Checker
```bash
npm run html-check
```

## 📈 Interpreting Results

### Healthy Page
- Status code 200-399
- Fast response time (< 1000ms)
- No errors

### Unhealthy Page
- Status code 400-599
- Timeout errors
- Connection errors
- SSL/TLS issues

### Common HTML Issues
- Missing title tags
- Missing alt attributes
- Missing viewport meta tags
- Deprecated HTML tags
- Inline styles

## 🛡️ Best Practices

### For Web Pages
1. Ensure all endpoints return 200-399 status codes
2. Optimize response times (< 1000ms)
3. Implement proper error handling
4. Use HTTPS for all production endpoints
5. Regular health checks in CI/CD pipelines

### For HTML Files
1. Always include DOCTYPE declaration
2. Use semantic HTML tags
3. Provide alt attributes for images
4. Associate labels with form inputs
5. Use external CSS instead of inline styles
6. Include viewport meta tag for mobile responsiveness

## 🆘 Troubleshooting

### Common Issues

1. **Permission Denied**
   - Ensure the script has read permissions for HTML files
   - Check directory paths

2. **Network Errors**
   - Verify URLs are correct
   - Check internet connectivity
   - Ensure firewall isn't blocking requests

3. **Timeout Errors**
   - Increase timeout value
   - Check server response times
   - Verify server is running

### Getting Help
- Check console output for error messages
- Verify file paths are correct
- Ensure Node.js is properly installed

## 🎉 Success Metrics

When health checks are successful, you should see:
- High percentage of healthy pages/files
- Fast response times
- No critical issues
- Proper HTTP status codes

Example successful output:
```
✅ https://YOUR_RENDER_APP.onrender.com/health - Status: 200 (45ms)
✅ https://YOUR_RENDER_APP.onrender.com/api/health - Status: 200 (62ms)

=== Web Page Health Report ===
Total URLs checked: 2
Healthy: 2 (100.0%)
Unhealthy: 0 (0.0%)
```