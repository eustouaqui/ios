# Render.com IP Whitelisting for MongoDB Atlas

This guide provides step-by-step instructions for getting Render.com's outbound IP addresses and adding them to your MongoDB Atlas whitelist for secure database connections.

## 🎯 Overview

When deploying applications to Render.com that connect to MongoDB Atlas, you must whitelist Render's outbound IP addresses in MongoDB Atlas Network Access settings. This replaces the less secure `0.0.0.0/0` approach.

## 📋 Step-by-Step Instructions

### 1. Get Render.com Outbound IP Addresses

1. Open the [Render Dashboard](https://dashboard.render.com)
2. Click on your service to open its details page
3. Click the "Connect" button in the upper right corner
4. Switch to the "Outbound" tab
5. Copy the list of IP addresses shown

**Current Render Outbound IP Addresses:**
- 44.229.227.142
- 54.188.71.94
- 52.13.128.108
- 74.220.48.0/24
- 74.220.56.0/24

### 2. Add IP Addresses to MongoDB Atlas

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Select your project
3. In the left sidebar, click "Network Access" under the "Security" section
4. Click the "Add IP Address" button
5. For each IP address from Render:
   - Click "Add Another IP Address"
   - Enter the IP address from Render's outbound list
   - Add a descriptive comment like "Render Outbound IP - Oregon Region"
   - Click "Confirm"

For the CIDR ranges (74.220.48.0/24 and 74.220.56.0/24), you can enter them directly as they are in CIDR notation.

### 3. Alternative: Add IP Ranges

If you prefer to add IP ranges instead of individual addresses:
1. In the Render Dashboard "Outbound" tab, look for IP ranges in CIDR notation
2. Add these ranges to MongoDB Atlas using the same process
3. Enter the CIDR notation directly in the IP address field

## ⚠️ Important Considerations

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

## 🧪 Verification

After adding the IP addresses:

1. Wait 2-5 minutes for changes to propagate in MongoDB Atlas
2. Redeploy your Render service:
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push origin main
   ```
3. Check Render logs for successful MongoDB connection:
   ```
   ✅ Pinged your deployment. You successfully connected to MongoDB!
   🚀 Server running on port 10000
   ```

## 🛡️ Security Best Practices

1. **Regular Review**: Periodically check and update your IP whitelist
2. **Remove Unused IPs**: Delete IP addresses that are no longer needed
3. **Use Comments**: Add descriptive comments to identify each IP address
4. **Monitor Changes**: Subscribe to Render's documentation updates for IP changes

## 🆘 Troubleshooting

### Issue: Still Getting Connection Errors
1. Verify all IP addresses from Render's outbound list are added
2. Check that all entries show as "Active" in MongoDB Atlas
3. Ensure your MongoDB cluster is not paused
4. Confirm your connection string is correct

### Issue: IP Addresses Not Showing in Render
1. Make sure you're viewing the details page for a specific service, not your workspace home
2. Note that static sites don't use outbound IP addresses
3. If you created your workspace before January 23, 2022, see the "Workspace Creation Date" section above

## 📞 Support Resources

- [Render Outbound IP Addresses Documentation](https://render.com/docs/outbound-ip-addresses)
- [MongoDB Atlas Network Access Documentation](https://docs.atlas.mongodb.com/security/ip-access-list/)
- [Render MongoDB Atlas Integration Guide](https://www.mongodb.com/docs/atlas/reference/partner-integrations/render/)

## 🎉 Success

When properly configured, your application will connect to MongoDB Atlas without security warnings, and you'll have a more secure setup than using `0.0.0.0/0`.