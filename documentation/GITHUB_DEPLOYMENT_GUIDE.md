# GitHub Deployment Guide

This guide explains how to deploy the Mind Reprogramming project to GitHub and Render.

## 🎯 Objective

Push the project to GitHub repository "ios" and deploy to Render.com.

## 📝 Prerequisites

1. GitHub account (eustouaqui)
2. Render.com account
3. This project on your local machine

## 🚀 Deployment Steps

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Name your repository "ios"
3. Choose Public or Private
4. **Important**: Leave all checkboxes unchecked (no README, .gitignore, or license)
5. Click "Create repository"

### 2. Push Code to GitHub

After creating the repository, run these commands:

```bash
cd c:\a_aia\ios\SubscriptionApp\MindReprogrammingProject
git push -u origin master
```

### 3. Deploy to Render

1. Go to https://dashboard.render.com
2. Click "New" and select "Web Service"
3. Connect your GitHub account when prompted
4. Select your "ios" repository
5. Render will automatically detect configuration from your `backend/render.yaml` file:
   - **Name**: mindreprogramming-api
   - **Environment**: Node
   - **Build Command**: `npm install` (from render.yaml)
   - **Start Command**: `npm start` (from render.yaml)

### 4. Configure Environment Variables

In the "Advanced" section, add these environment variables:
```
MONGODB_URI=mongodb+srv://gustavoempresamgm_db_user:9dUAfIZO6WWloiCw@clustertest.jw84vuq.mongodb.net/mindreprogramming?retryWrites=true&w=majority
NODE_ENV=production
```

Note: The PORT variable is automatically set by Render to 10000 for free tier services.

### 5. Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your deployed URL (e.g., https://mindreprogramming-api.onrender.com)

## ✅ Verification

After deployment, test these endpoints:
- `https://YOUR_RENDER_APP.onrender.com/health`
- `https://YOUR_RENDER_APP.onrender.com/api/health`

## ⚡ Prevent Service Suspension

Render's free tier suspends services after 15 minutes of inactivity. To prevent this:

1. Use the built-in `/health` endpoint
2. Set up an external service like https://cron-job.org to ping your service every 10 minutes:
   - URL: `https://YOUR_RENDER_APP.onrender.com/health`
   - Schedule: Every 10 minutes

## 📱 iOS App Integration

Update your iOS app Constants.swift:
```swift
struct Constants {
    #if DEBUG
    static let baseURL = "http://localhost:5000"
    #else
    static let baseURL = "https://YOUR_RENDER_APP.onrender.com"
    #endif
}
```

## 🆘 Troubleshooting

### Common Issues:

1. **Repository not found**
   - Ensure you've created the "ios" repository on GitHub
   - Check that the repository name is exactly "ios"

2. **Permission denied**
   - Ensure you're logged into the correct GitHub account
   - Check your GitHub credentials

3. **Push rejected**
   - Make sure the GitHub repository is completely empty
   - Don't initialize with README, .gitignore, or license

4. **Build failures**
   - Check that your build command is `npm install`
   - Verify that your start command is `npm start`
   - Ensure all dependencies are in package.json

## 🔄 Updates

To update your deployment after making changes:

1. Commit your changes locally:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

2. Push to GitHub:
   ```bash
   git push origin master
   ```

3. Render will automatically redeploy

## 🎉 Success Criteria

When deployment is complete, you'll have:
- ✅ Code pushed to GitHub repository "ios"
- ✅ Backend running on Render.com
- ✅ MongoDB Atlas database connected
- ✅ API endpoints accessible
- ✅ iOS app communicating with deployed backend
- ✅ Service suspension prevention configured
- ✅ Zero ongoing hosting costs