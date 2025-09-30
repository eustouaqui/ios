# MongoDB Connection Troubleshooting Guide

This guide helps resolve common MongoDB Atlas connection issues when deploying to Render.com.

## 🎯 Common Issues and Solutions

### 1. SSL/TLS Connection Errors

**Error**: `SSL routines:ssl3_read_bytes:tlsv1 alert internal error`

**Solution**: 
- Added SSL/TLS options to MongoClient configuration
- Set `tls: true` and `tlsInsecure: false`
- Added connection timeout options

### 2. IP Whitelist Issues

**Problem**: Render's servers need to be whitelisted in MongoDB Atlas

**Solution**:
1. Log in to MongoDB Atlas
2. Go to "Network Access" in the left sidebar
3. Add these IP addresses:
   - `0.0.0.0/0` (for development - allows access from anywhere)
   - Or specifically add Render's IP ranges if known

### 3. Connection String Issues

**Problem**: Incorrect or incomplete connection string

**Solution**:
Ensure your MongoDB URI includes all required parameters:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/DATABASE_NAME?retryWrites=true&w=majority
```

## 🔧 Render-Specific Configuration

### Environment Variables
Make sure these are set in Render:
```
MONGODB_URI=mongodb+srv://gustavoempresamgm_db_user:9dUAfIZO6WWloiCw@clustertest.jw84vuq.mongodb.net/mindreprogramming?retryWrites=true&w=majority
NODE_ENV=production
```

### Root Directory
Set to `backend` in Render configuration

## 🔄 Automatic Redeployment

Render will automatically redeploy when you push to GitHub:
1. Changes pushed to GitHub
2. Render detects the changes
3. Build process starts automatically
4. New version is deployed

## 📊 Monitoring Connection Status

Check your API health endpoint:
- `https://YOUR_RENDER_APP.onrender.com/api/health`

This will show:
- Database connection status
- Environment information
- Timestamp of last check

## 🛡️ Security Best Practices

1. **Never commit credentials**:
   - Keep connection strings in environment variables
   - Use [.env.example](file:///c%3A/a_aia/ios/SubscriptionApp/RealProject/backend/.env.example) for templates

2. **IP Whitelisting**:
   - For production: Use specific IP addresses
   - For development: Use `0.0.0.0/0` (less secure)

3. **Regular Credential Rotation**:
   - Change database passwords periodically
   - Update environment variables when credentials change

## 🆘 Advanced Troubleshooting

### Enable Detailed Logging
Add this to your server.js for more detailed error information:
```javascript
console.error('Error details:', error);
```

### Test Connection Locally
Before deploying, test the connection locally:
```bash
cd backend
npm start
```

### Check MongoDB Atlas Status
1. Visit MongoDB Atlas status page
2. Check if there are any service interruptions
3. Verify your cluster is running

## 📞 Support Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [MongoDB Node.js Driver Documentation](https://mongodb.github.io/node-mongodb-native/)

## 🎉 Success Verification

When the fix is successful, you should see:
```
✅ Pinged your deployment. You successfully connected to MongoDB!
🚀 Server running on port 10000
```

And your API health endpoint should return:
```json
{
  "status": "OK",
  "environment": "production",
  "database": "Connected",
  "timestamp": "2025-09-30T12:34:56.789Z"
}
```