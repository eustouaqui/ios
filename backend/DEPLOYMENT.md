# Deployment to Render

This guide explains how to deploy the Mind Reprogramming backend to Render.

## 🚀 Deployment Steps

### 1. Push Code to GitHub
First, make sure your code is pushed to a GitHub repository:

```bash
git remote add origin https://github.com/YOUR_USERNAME/mindreprogramming-backend.git
git branch -M main
git push -u origin main
```

### 2. Connect Render to GitHub
1. Go to https://dashboard.render.com
2. Click "New" and select "Web Service"
3. Connect your GitHub account
4. Select your `mindreprogramming-backend` repository

### 3. Configure Your Web Service
Render will automatically detect the configuration from your `render.yaml` file:

- **Name**: mindreprogramming-api
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `NODE_ENV` = production (set in render.yaml)
  - `PORT` = 10000 (set in render.yaml)

### 4. Add Your MongoDB URI
In the "Advanced" section, add your MongoDB Atlas connection string:

- Key: `MONGODB_URI`
- Value: `mongodb+srv://gustavoempresamgm_db_user:9dUAfIZO6WWloiCw@clustertest.jw84vuq.mongodb.net/mindreprogramming?retryWrites=true&w=majority`

### 5. Deploy
Click "Create Web Service" to deploy your application.

## 🧪 Testing Your Deployment

After deployment, you can test your API endpoints:

- Health check: `https://YOUR_RENDER_APP.onrender.com/health`
- API health: `https://YOUR_RENDER_APP.onrender.com/api/health`

## ⚡ Preventing Service Suspension

Render's free tier suspends services after 15 minutes of inactivity. To prevent this:

1. Use the built-in `/health` endpoint
2. Set up an external service like https://cron-job.org to ping your service every 10 minutes:
   - URL: `https://YOUR_RENDER_APP.onrender.com/health`
   - Schedule: Every 10 minutes

## 🆘 Troubleshooting

### Common Issues:

1. **Deployment fails**
   - Check build logs in Render dashboard
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

## 🔄 Continuous Deployment

Render automatically redeploys when you push to your connected GitHub repository:
1. Make changes to your code
2. Commit and push to GitHub
3. Render automatically detects changes and redeploys