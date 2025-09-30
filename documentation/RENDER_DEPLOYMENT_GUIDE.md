# Render.com Deployment Guide

This guide will help you deploy your backend to Render.com using the free tier.

## 🎯 Objective
Deploy your Node.js backend to Render.com with MongoDB Atlas integration.

## 📝 Prerequisites
- A Render.com account (free)
- A GitHub account
- Your MongoDB Atlas connection string
- Your backend code committed to GitHub

## 🚀 Deployment Process

### 1. Prepare Your GitHub Repository
1. Create a new repository on GitHub named "mindreprogramming-backend"
2. Push your backend code to the repository:
   ```bash
   cd c:\a_aia\ios\SubscriptionApp\RealProject\backend
   git remote add origin https://github.com/YOUR_USERNAME/mindreprogramming-backend.git
   git branch -M main
   git push -u origin main
   ```

### 2. Connect Render to GitHub
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" and select "Web Service"
3. Connect your GitHub account when prompted
4. Select your "mindreprogramming-backend" repository

### 3. Configure Your Web Service
Render will automatically detect configuration from your `render.yaml` file:
- **Name**: mindreprogramming-api
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 4. Configure Environment Variables
In the "Advanced" section, add these environment variables:
```
MONGODB_URI=mongodb+srv://gustavoempresamgm_db_user:9dUAfIZO6WWloiCw@clustertest.jw84vuq.mongodb.net/mindreprogramming?retryWrites=true&w=majority
NODE_ENV=production
```

Note: Render automatically sets the PORT to 10000 for free tier services.

### 5. Deploy
1. Click "Create Web Service"
2. Render will automatically:
   - Clone your repository
   - Run the build command (`npm install`)
   - Run the start command (`npm start`)
   - Deploy your application

### 6. Monitor Deployment
1. Watch the build logs in the Render dashboard
2. Wait for "Your service is live" message
3. Note your deployed URL (e.g., https://mindreprogramming-api.onrender.com)

## 🔧 Post-Deployment Configuration

### 1. Test Your Deployed API
Visit your health check endpoint:
```
GET https://YOUR_APP_NAME.onrender.com/health
GET https://YOUR_APP_NAME.onrender.com/api/health
```

### 2. Update Your iOS App
Update your Constants.swift file:
```swift
struct Constants {
    #if DEBUG
    static let baseURL = "http://localhost:5000"
    #else
    static let baseURL = "https://YOUR_APP_NAME.onrender.com"
    #endif
}
```

## ⚡ Preventing Service Suspension

Render's free tier suspends services after 15 minutes of inactivity. To prevent this:

### Option 1: Add a Health Check Endpoint (Already included)
Your backend already has a `/health` endpoint that returns "OK".

### Option 2: Set Up External Pinging
Use a free service like [cron-job.org](https://cron-job.org) to ping your service every 10 minutes:

1. Sign up at [cron-job.org](https://cron-job.org)
2. Create a new cron job
3. Set URL to: `https://YOUR_APP_NAME.onrender.com/health`
4. Set frequency to every 10 minutes
5. Save and activate

## 🛡️ Security Best Practices

### 1. Environment Variables
- Never hardcode sensitive information
- Always use environment variables for:
  - Database connection strings
  - API keys
  - Secrets

### 2. HTTPS
Render automatically provides HTTPS for your service, so all traffic is encrypted.

### 3. Rate Limiting
Consider implementing rate limiting for your API endpoints to prevent abuse.

## 📈 Free Tier Limitations

- **Sleep**: Services sleep after 15 minutes of inactivity
- **Resources**: 512MB RAM, shared CPU
- **Bandwidth**: 100GB/month
- **Build Minutes**: 500/month
- **Support**: Community support only

## 🆘 Troubleshooting

### Common Issues:

1. **Deployment fails**
   - Check build logs for errors
   - Ensure all dependencies are in package.json
   - Verify start command in package.json

2. **Application crashes after deployment**
   - Check runtime logs
   - Verify environment variables are set correctly
   - Ensure MongoDB connection string is correct

3. **API returns 503 or connection errors**
   - Service might be sleeping, wait for restart
   - Check if MongoDB Atlas IP whitelist includes Render's IPs
   - Verify MongoDB connection string

### Useful Render Commands:
```bash
# Check logs
render logs -s your-service-name

# Redeploy
git commit --allow-empty -m "Trigger deploy"
git push origin main
```

## 🔄 Continuous Deployment

Render automatically redeploys when you push to your connected GitHub repository:
1. Make changes to your code
2. Commit and push to GitHub
3. Render automatically detects changes and redeploys

## 🎉 Next Steps

1. Test your deployed API endpoints
2. Update your iOS app to use the deployed backend
3. Set up monitoring with UptimeRobot or similar
4. Configure automatic pinging to prevent sleep
5. Test the complete user flow from iOS app to backend

## 📊 Monitoring Your Service

### Render Dashboard
- View logs and metrics
- Check deployment status
- Monitor resource usage

### External Monitoring
- **UptimeRobot**: Free website monitoring
- **Sentry**: Error tracking (free tier available)

## 💡 Tips for Success

1. **Test locally first**: Always test your changes locally before deploying
2. **Use environment variables**: Never commit secrets to Git
3. **Monitor logs**: Check Render logs for errors and debugging information
4. **Plan for sleep**: Design your app to handle service restarts gracefully
5. **Backup data**: Regularly backup your MongoDB data