# How to Find Your MongoDB Atlas Cluster URL

This guide will help you locate your actual MongoDB Atlas cluster URL to update your connection string.

## 🎯 Objective
Find your real MongoDB Atlas cluster URL to replace `YOUR_CLUSTER_URL_HERE` in your [.env](file:///c%3A/a_aia/ios/SubscriptionApp/RealProject/backend/.env) file.

## 📝 Steps to Find Your Cluster URL

### 1. Log in to MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Log in with your credentials

### 2. Navigate to Your Cluster
1. In the Atlas dashboard, you'll see a list of your clusters
2. Click on your cluster (usually named something like "Cluster0")

### 3. Get Connection String
1. Click the "Connect" button on your cluster
2. Select "Connect your application"
3. Choose "Node.js" as the driver
4. You'll see a connection string like this:
   ```
   mongodb+srv://gustavoempresamgm_db_user:<password>@cluster0.xxxxxx.mongodb.net/myDatabase?retryWrites=true&w=majority
   ```

### 4. Identify Your Cluster URL
From the connection string above, your cluster URL is:
- `cluster0.xxxxxx.mongodb.net` (the part between the @ symbol and the /)

### 5. Update Your [.env](file:///c%3A/a_aia/ios/SubscriptionApp/RealProject/backend/.env) File
Replace `YOUR_CLUSTER_URL_HERE` with your actual cluster URL:
```
# Before
MONGODB_URI=mongodb+srv://gustavoempresamgm_db_user:9dUAfIZO6WWloiCw@YOUR_CLUSTER_URL_HERE/mindreprogramming?retryWrites=true&w=majority

# After (example)
MONGODB_URI=mongodb+srv://gustavoempresamgm_db_user:9dUAfIZO6WWloiCw@cluster0.xxxxxx.mongodb.net/mindreprogramming?retryWrites=true&w=majority
```

## 🎯 Example

If your Atlas connection string is:
```
mongodb+srv://gustavoempresamgm_db_user:9dUAfIZO6WWloiCw@cluster0.abcd123.mongodb.net/myDatabase?retryWrites=true&w=majority
```

Then your [.env](file:///c%3A/a_aia/ios/SubscriptionApp/RealProject/backend/.env) should contain:
```
MONGODB_URI=mongodb+srv://gustavoempresamgm_db_user:9dUAfIZO6WWloiCw@cluster0.abcd123.mongodb.net/mindreprogramming?retryWrites=true&w=majority
```

## 🧪 Verification

After updating your [.env](file:///c%3A/a_aia/ios/SubscriptionApp/RealProject/backend/.env) file, test the connection:
```bash
cd c:\a_aia\ios\SubscriptionApp\RealProject\backend
node test-mongodb.js
```

## 🆘 Troubleshooting

### Common Issues:

1. **Cannot find cluster**
   - Make sure you're logged into the correct MongoDB Atlas account
   - Check if you have multiple projects

2. **Connection still fails**
   - Ensure your IP address (170.247.38.29) is whitelisted
   - Check that the database user exists and has correct permissions

3. **Wrong cluster URL**
   - Double-check that you copied the correct part of the connection string
   - Make sure there are no extra characters or spaces

## 🎉 Success

Once you've successfully updated your cluster URL and the test passes, you'll see:
```
✅ MongoDB Connected Successfully
✅ Connection test passed
✅ Test document saved successfully: Connection test
✅ Test document cleaned up
✅ MongoDB connection test completed successfully
```

This confirms that your MongoDB Atlas is properly configured and ready for use with your backend application.