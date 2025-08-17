# 🚀 Vercel Deployment Guide

## Overview
This project can be deployed to Vercel as a **monorepo** with both frontend (React/Vite) and backend (Node.js/Express) running on the same domain.

## ✅ What Works on Vercel

### Frontend (React/Vite)
- ✅ **Fully compatible** - Vercel is optimized for React applications
- ✅ **Automatic builds** from your `package.json` scripts
- ✅ **Environment variables** support
- ✅ **Custom domains** and SSL certificates

### Backend (Node.js/Express)
- ✅ **Serverless functions** - Vercel converts Express to serverless
- ✅ **JSON file storage** - Perfect for Vercel's filesystem
- ✅ **API routes** work seamlessly
- ✅ **Environment variables** for configuration

## 🛠️ Deployment Steps

### 1. Prepare Your Repository

Your current structure is perfect:
```
done-site/
├── src/                 # Frontend React code
├── backend/             # Backend Node.js code
├── package.json         # Frontend dependencies
├── backend/package.json # Backend dependencies
├── vercel.json          # Root Vercel config
└── backend/vercel.json  # Backend Vercel config
```

### 2. Set Environment Variables in Vercel

In your Vercel dashboard, set these environment variables:

```env
# Backend Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# CORS Configuration (your Vercel domain)
CORS_ORIGIN=https://your-app.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set build command: npm run build
# - Set output directory: dist
# - Set install command: npm install
```

#### Option B: Using GitHub Integration
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect and deploy

### 4. Update Frontend API URLs

After deployment, update your frontend API calls to use your Vercel domain:

```typescript
// In admin-login.tsx, admin-dashboard.tsx, test-order.tsx
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-app.vercel.app/api' 
  : 'http://localhost:5000/api';

// Example usage:
const response = await fetch(`${API_BASE}/admin/login`, {
  // ... rest of the code
});
```

## 🔧 Configuration Files

### Root vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Backend vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

## 🌐 How It Works

1. **Frontend**: Vercel builds your React app using `npm run build`
2. **Backend**: Vercel converts your Express app to serverless functions
3. **Routing**: 
   - `/api/*` routes go to your backend
   - All other routes serve your React app
4. **Data Storage**: JSON files are stored in Vercel's filesystem

## 📊 Benefits of This Setup

- ✅ **Single domain** for both frontend and backend
- ✅ **No CORS issues** - same origin
- ✅ **Automatic SSL** certificates
- ✅ **Global CDN** for fast loading
- ✅ **Serverless scaling** - pay only for what you use
- ✅ **Easy deployment** - just push to GitHub

## 🔍 Testing After Deployment

1. **Frontend**: Visit your Vercel URL
2. **Admin Login**: Go to `/admin-login`
3. **API Health**: Visit `/api/health`
4. **Create Orders**: Use `/test-order` page

## 🚨 Important Notes

### Data Persistence
- JSON files are **read-only** in production
- For production, consider using a database (MongoDB Atlas, Supabase, etc.)
- Current setup is perfect for development and small-scale production

### Environment Variables
- Set all environment variables in Vercel dashboard
- Never commit `.env` files to Git
- Use different values for development and production

### CORS Configuration
- Update `CORS_ORIGIN` to your Vercel domain
- Remove localhost origins in production

## 🎯 Next Steps

1. **Deploy to Vercel** using the steps above
2. **Test all functionality** (login, dashboard, orders)
3. **Set up custom domain** if needed
4. **Configure monitoring** and analytics
5. **Set up database** for production data persistence

## 🆘 Troubleshooting

### Common Issues:
- **Build fails**: Check `package.json` scripts
- **API 404**: Verify routes in `vercel.json`
- **CORS errors**: Update `CORS_ORIGIN` environment variable
- **Environment variables**: Ensure they're set in Vercel dashboard

### Support:
- Vercel documentation: https://vercel.com/docs
- Vercel community: https://github.com/vercel/vercel/discussions
