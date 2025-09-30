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

3. **Get Render.com Outbound IP Addresses**
   - Open the [Render Dashboard](https://dashboard.render.com)
   - Click on your service to open its details page
   - Click the "Connect" button in the upper right
   - Switch to the "Outbound" tab
   - Copy the list of IP addresses shown

4. **Add IP Addresses to MongoDB Atlas**
   - Return to MongoDB Atlas Network Access page
   - Click the "Add IP Address" button
   - For each IP address from Render:
     - Click "Add Another IP Address"
     - Enter the IP address from Render's outbound list
     - Add a comment like "Render Outbound IP" for reference
   - Alternatively, you can add IP ranges in CIDR notation

**Current Render Outbound IP Addresses:**
- 44.229.227.142
- 54.188.71.94
- 52.13.128.108
- 74.220.48.0/24
- 74.220.56.0/24

5. **Alternative: Allow Access from Anywhere (Development Only)**
   - Click "Allow Access from Anywhere"
   - This automatically sets the IP to `0.0.0.0/0`
   - Add a comment like "Development - Replace with specific IPs for production"
   - Click "Confirm"

6. **Wait for Changes to Propagate**
   - It may take a few minutes for the changes to take effect
   - You'll see the new IP entries in the list with status "Active"

## 🛡️ Security Best Practices

### For Development
- Use `0.0.0.0/0` to allow access from any IP for convenience
- Remember to replace with specific IPs for production

### For Production
- Use specific IP addresses from Render's outbound list
- Regularly review and update your whitelist
- Remove any unnecessary IP addresses

## 🔄 Updating IP Whitelist

If you need to update your IP whitelist later:
1. Go to "Network Access" in MongoDB Atlas
2. Click "Edit" next to an existing entry, or "Add IP Address" for new entries
3. Make your changes
4. Click "Confirm"

## ⚠️ Important Notes

### IP Address Changes
- Render periodically updates their outbound IP addresses
- Check [Render's Outbound IP documentation](https://render.com/docs/outbound-ip-addresses) for updates
- On October 27, 2025, Render will roll out new outbound IP ranges
- You'll need to add the new IP ranges to your MongoDB Atlas access rules

### Workspace Creation Date
- If you created your Render workspace before January 23, 2022:
  - Services in the Oregon region do not use a fixed set of outbound IP addresses
  - Consider creating a new workspace for fixed IP addresses
  - Or use a static IP provider like QuotaGuard

## 🆘 Troubleshooting

### Issue: Still Getting Connection Errors
1. Double-check that you added all IP addresses from Render's outbound list
2. Verify all entries show as "Active" in Network Access
3. Check that your MongoDB cluster is not paused
4. Ensure your connection string is correct

### Issue: Can't Find Network Access
- Make sure you're in the correct project
- Check that you have the necessary permissions
- Look under "Security" in the left sidebar

## 📞 Support Resources

- [MongoDB Atlas Network Access Documentation](https://docs.atlas.mongodb.com/security/ip-access-list/)
- [Render.com Outbound IP Addresses Documentation](https://render.com/docs/outbound-ip-addresses)
- [Render.com MongoDB Atlas Integration Guide](https://www.mongodb.com/docs/atlas/reference/partner-integrations/render/)
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