# MongoDB Atlas Setup Guide

This guide will help you set up a free MongoDB Atlas cluster for your backend.

## 🎯 Objective
Create a free MongoDB Atlas cluster and obtain the connection string for your backend.

## 📝 Prerequisites
- A MongoDB Atlas account (free)
- Access to email for verification

## 🚀 Setup Process

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free"
3. Sign up with your email or Google account
4. Verify your email address

### 2. Create a Free Cluster
1. After logging in, click "Build a Database"
2. Select the **FREE** tier (M0 Sandbox)
3. Choose any cloud provider and region (recommend closest to your users)
4. Keep the default cluster name or change it to "MindReprogramming"
5. Click "Create Cluster"

### 3. Configure Database Access
1. In the left sidebar, click "Database Access" under Security
2. Click "Add New Database User"
3. Choose "Password" as the authentication method
4. Enter a username and password (save these for later)
5. For user privileges, select "Atlas Admin"
6. Click "Add User"

### 4. Configure Network Access
1. In the left sidebar, click "Network Access" under Security
2. Click "Add IP Address"
3. For development, you can select "Allow Access from Anywhere" (0.0.0.0/0)
4. For production, add only specific IP addresses
5. Click "Confirm"

### 5. Get Connection String
1. Click "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string

### 6. Update Connection String
Replace the placeholders in the connection string:
```
# Original (from Atlas)
mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/?retryWrites=true&w=majority

# Updated (with your credentials)
mongodb+srv://yourUsername:yourPassword@cluster0.example.mongodb.net/mindreprogramming?retryWrites=true&w=majority
```

## 🔧 Environment Configuration

Update your `.env` file with the connection string:
```env
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@cluster0.example.mongodb.net/mindreprogramming?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

## 🛡️ Security Best Practices

1. **Never commit credentials to Git**
   - Keep `.env` in `.gitignore`
   - Use `.env.example` for template

2. **Use strong passwords**
   - Generate complex passwords for database users

3. **Limit IP access**
   - Restrict network access to specific IPs when possible

4. **Regular backups**
   - Atlas provides automatic backups on paid tiers

## 🧪 Testing Connection

To test your MongoDB connection:
1. Update the `.env` file with your connection string
2. Run the backend server:
   ```bash
   npm start
   ```
3. Check for "MongoDB Connected" message in the console

## 🆘 Troubleshooting

### Common Issues:
1. **Authentication failed**
   - Check username/password in connection string
   - Verify database user exists and has correct permissions

2. **Network access denied**
   - Check IP whitelist in Network Access settings
   - Ensure your IP is allowed to connect

3. **DNS resolution errors**
   - Check connection string format
   - Ensure no typos in cluster address

### Connection String Format:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/DATABASE_NAME?retryWrites=true&w=majority
```

## 📈 Free Tier Limitations

- **Storage**: 512 MB
- **RAM**: Shared
- **CPU**: Shared
- **Backup**: Not available (available in paid tiers)
- **Support**: Community support only

## 🎉 Next Steps

1. Test your MongoDB connection locally
2. Deploy your backend to Render.com
3. Update your iOS app to use the deployed backend