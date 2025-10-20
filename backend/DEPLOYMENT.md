# 🚀 Render Deployment Guide

This guide will help you deploy the SolsTice Agro Exports backend to Render in under 10 minutes.

## 📋 Prerequisites

1. **GitHub Account** - Your code repository
2. **Render Account** - Sign up at [render.com](https://render.com) (free)
3. **MongoDB Atlas Account** - Sign up at [mongodb.com](https://mongodb.com) (free)
4. **Gmail Account** - For email notifications (or SendGrid)

## 🗂️ Step 1: Prepare Your Repository

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add backend API"
   git push origin main
   ```

2. **Ensure your repository structure looks like this**:
   ```
   your-repo/
   ├── backend/           # Backend API code
   ├── frontend/          # Your existing React app
   └── README.md
   ```

## 🍃 Step 2: Set Up MongoDB Atlas (Free Database)

1. **Go to [MongoDB Atlas](https://www.mongodb.com/atlas)**
2. **Create a free account** and sign in
3. **Create a new cluster**:
   - Choose "M0 Sandbox" (FREE)
   - Select a region close to you
   - Click "Create Cluster"

4. **Set up database access**:
   - Go to "Database Access" → "Add New Database User"
   - Username: `solstice-admin`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Read and write to any database"

5. **Set up network access**:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

6. **Get your connection string**:
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like):
   ```
   mongodb+srv://solstice-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password

## 📧 Step 3: Set Up Email Service (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Save the 16-character password

## 🌐 Step 4: Deploy to Render

1. **Sign up/Login to Render**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub (recommended)

2. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure the service**:
   ```
   Name: solstice-agro-backend
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

4. **Set Environment Variables**:
   Click "Advanced" and add these environment variables:

   ```bash
   # Database
   MONGODB_URI_PROD=mongodb+srv://solstice-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/solstice-agro?retryWrites=true&w=majority

   # Server
   NODE_ENV=production
   PORT=10000

   # JWT Secret (generate a random string)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   EMAIL_FROM=noreply@solstice-agro.com

   # Admin Configuration
   ADMIN_EMAIL=your-admin-email@gmail.com

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100

   # CORS (replace with your actual frontend URL)
   FRONTEND_URL_PROD=https://your-vercel-app.vercel.app
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)

## ✅ Step 5: Verify Deployment

1. **Check the deployment logs** in Render dashboard
2. **Test the API** - your API will be available at:
   ```
   https://your-service-name.onrender.com/api/health
   ```
3. **You should see**:
   ```json
   {
     "status": "OK",
     "message": "SolsTice Agro Exports API is running",
     "timestamp": "2024-10-20T...",
     "environment": "production"
   }
   ```

## 🌱 Step 6: Seed Your Database (Optional)

1. **In Render dashboard**, go to your service
2. **Open the Shell** (Console tab)
3. **Run the seed command**:
   ```bash
   npm run seed
   ```

## 🔗 Step 7: Update Frontend

Update your frontend to use the new API URL:

```javascript
// In your frontend constants or config
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-service-name.onrender.com/api'
  : 'http://localhost:5000/api';
```

## 🎯 Your API Endpoints

Once deployed, your API will be available at:
- **Health Check**: `https://your-service-name.onrender.com/api/health`
- **Products**: `https://your-service-name.onrender.com/api/products`
- **Blog**: `https://your-service-name.onrender.com/api/blog`
- **Contact**: `https://your-service-name.onrender.com/api/contact`
- **Inquiries**: `https://your-service-name.onrender.com/api/inquiries`

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Check MongoDB Atlas IP whitelist
   - Verify connection string and password
   - Ensure database user has correct permissions

2. **Email Not Working**:
   - Verify Gmail app password is correct
   - Check 2FA is enabled on Gmail
   - Test with a simple email service first

3. **CORS Errors**:
   - Update `FRONTEND_URL_PROD` with your actual Vercel URL
   - Ensure no trailing slashes in URLs

4. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs in Render dashboard

### Getting Help:
- Check Render logs in the dashboard
- Use the health check endpoint to verify API status
- Contact support if deployment issues persist

## 💰 Cost Information

- **Render Free Tier**: 750 hours/month (enough for 1 service)
- **MongoDB Atlas**: 512MB free forever
- **Gmail**: Free for reasonable email volume
- **Total Monthly Cost**: $0 (within free tier limits)

## 🚀 Next Steps

After successful deployment:
1. Test all API endpoints
2. Update your frontend to use the new API
3. Set up monitoring and alerts
4. Consider upgrading to paid tiers for production use

Your backend is now live and ready to handle requests! 🎉