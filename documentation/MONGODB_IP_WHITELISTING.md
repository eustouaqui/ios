# MongoDB Atlas IP Whitelisting Guide

This guide explains how to whitelist IP addresses in MongoDB Atlas to allow connections from Render.com.

## 🎯 Problem

When deploying to Render.com, you may encounter this error:
```
Ensure your IP address is whitelisted in MongoDB Atlas Network Access settings
SSL routines:ssl3_read_bytes:tlsv1 alert internal error
```

This happens because MongoDB Atlas restricts connections to only whitelisted IP addresses, and Render.com's servers are not on your whitelist.

## 🔧 Solution: Whitelist Render.com IPs

### Step-by-Step Instructions

1. **Log in to MongoDB Atlas**
   - Go to https://cloud.mongodb.com
   - Log in with your credentials

2. **Navigate to Network Access**
   - In the left sidebar, click "Network Access" under the "Security" section

3. **Add IP Address**
   - Click the "Add IP Address" button
   - You have two options:

   **Option A: Allow Access from Anywhere (Recommended for Development)**
   - Click "Allow Access from Anywhere"
   - This automatically sets the IP to `0.0.0.0/0`
   - Add a comment like "Render.com deployment" for reference
   - Click "Confirm"

   **Option B: Add Specific IP Range (More Secure)**
   - If you know specific IP ranges for Render, you can add them
   - For most cases, use `0.0.0.0/0` during development

4. **Wait for Changes to Propagate**
   - It may take a few minutes for the changes to take effect
   - You'll see the new IP entry in the list with status "Active"

## 🧪 Verification

After whitelisting, redeploy your application on Render:
1. Make a small change and push to GitHub
2. Wait for Render to automatically redeploy
3. Check the logs for successful MongoDB connection

## 🛡️ Security Best Practices

### For Development
- Use `0.0.0.0/0` to allow access from any IP
- This is convenient but less secure
- Good for testing and development

### For Production
- Use specific IP addresses or ranges
- Research Render.com's IP ranges for production use
- Regularly review and update your whitelist

## 🔄 Updating IP Whitelist

If you need to update your IP whitelist later:
1. Go to "Network Access" in MongoDB Atlas
2. Click "Edit" next to an existing entry, or "Add IP Address" for new entries
3. Make your changes
4. Click "Confirm"

## 🆘 Troubleshooting

### Issue: Still Getting Connection Errors
1. Double-check that you added `0.0.0.0/0` or your specific IP
2. Verify the entry shows as "Active" in Network Access
3. Check that your MongoDB cluster is not paused
4. Ensure your connection string is correct

### Issue: Can't Find Network Access
- Make sure you're in the correct project
- Check that you have the necessary permissions
- Look under "Security" in the left sidebar

## 📞 Support Resources

- [MongoDB Atlas Network Access Documentation](https://docs.atlas.mongodb.com/security/ip-access-list/)
- [Render.com Documentation](https://render.com/docs)
- MongoDB Atlas Support: Available through the Atlas dashboard

## ✅ Success Verification

When IP whitelisting is successful, your Render logs should show:
```
✅ Pinged your deployment. You successfully connected to MongoDB!
🚀 Server running on port 10000
```

Instead of the previous error:
```
Ensure your IP address is whitelisted in MongoDB Atlas Network Access settings
```