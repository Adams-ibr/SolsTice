# 🍃 MongoDB Atlas Setup Guide

This guide will walk you through setting up a free MongoDB Atlas database for your SolsTice backend.

## 📋 Step-by-Step Setup

### Step 1: Create MongoDB Atlas Account

1. **Go to [MongoDB Atlas](https://www.mongodb.com/atlas)**
2. **Click "Try Free"**
3. **Sign up with:**
   - Email and password, OR
   - Google account (recommended for easier access)

### Step 2: Create Your First Cluster

1. **After signing in, you'll see "Create a deployment"**
2. **Choose "M0 FREE"** (this gives you 512MB free forever)
3. **Configuration:**
   ```
   Cloud Provider: AWS (recommended)
   Region: Choose closest to your location
   Cluster Name: SolsTice-Cluster (or keep default)
   ```
4. **Click "Create Deployment"**
5. **Wait 3-5 minutes** for cluster creation

### Step 3: Create Database User

1. **You'll see a "Security Quickstart" popup**
2. **Create Database User:**
   ```
   Username: solstice-admin
   Password: Click "Autogenerate Secure Password" 
   ```
   **⚠️ IMPORTANT: Copy and save this password immediately!**

3. **Click "Create User"**

### Step 4: Set Network Access

1. **In the same popup, under "Where would you like to connect from?"**
2. **Choose "My Local Environment"**
3. **Click "Add My Current IP Address"**
4. **For production, also add "0.0.0.0/0" (Allow access from anywhere)**
5. **Click "Finish and Close"**

### Step 5: Get Your Connection String

1. **Click "Connect" on your cluster**
2. **Choose "Drivers"**
3. **Select:**
   ```
   Driver: Node.js
   Version: 5.5 or later
   ```
4. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://solstice-admin:<password>@solstice-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Prepare Your Connection String

Replace `<password>` with your actual password:
```
mongodb+srv://solstice-admin:YourActualPassword@solstice-cluster.xxxxx.mongodb.net/solstice-agro?retryWrites=true&w=majority
```

**Note:** I added `/solstice-agro` at the end to specify the database name.

## ✅ Verification

Your connection string should look like this:
```
mongodb+srv://solstice-admin:Abc123XyZ789@solstice-cluster.ab1cd.mongodb.net/solstice-agro?retryWrites=true&w=majority
```

## 🔧 Troubleshooting

### Common Issues:

1. **"Authentication failed"**
   - Double-check username and password
   - Ensure no special characters are URL-encoded

2. **"Connection timeout"**
   - Check network access settings
   - Add your IP address to whitelist

3. **"Database not found"**
   - The database will be created automatically when you first insert data
   - Make sure you added the database name to the connection string

## 📊 Free Tier Limits

- **Storage:** 512MB
- **RAM:** Shared
- **Connections:** 500 concurrent
- **Perfect for:** Development and small production apps

## 🎯 Next Steps

Once you have your connection string:
1. Save it securely (you'll need it for Render deployment)
2. Test the connection with our test script
3. Use it in your environment variables

Your MongoDB Atlas database is now ready! 🎉