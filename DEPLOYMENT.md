# Kryptonix MERN Stack - Deployment Guide

Your production-ready MERN app is now built and ready to deploy!

---

## 📦 What's Built

- ✅ **Frontend**: Optimized Vite bundle in `frontend/dist/`
- ✅ **Backend**: Express API with in-memory storage (ready for MongoDB)
- ✅ **Package.json**: Both services have production scripts

---

## 🚀 Deployment Options

### Option 1: Railway (Recommended - Easiest for full stack)
Railway hosts both frontend and backend together.

**Steps:**
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project → Select "Deploy from GitHub repo"
4. Connect your Fullstack Kryptonix repository
5. Railway auto-detects Node.js backend
6. Add env variables in Railway dashboard:
   - `PORT=5000`
   - `NODE_ENV=production`
   - `MONGO_URI=your_atlas_connection` (optional)
7. Deploy backend → Frontend will be served from `backend/dist`

**Frontend in backend:**
- The backend (server.js) already serves frontend from `../frontend/dist` in production
- No separate frontend deployment needed

---

### Option 2: Vercel (Frontend) + Render (Backend)

#### Frontend on Vercel
1. Go to https://vercel.com
2. Import project from GitHub
3. Set build command: `npm run build`
4. Output directory: `frontend`
5. Deploy

#### Backend on Render
1. Go to https://render.com
2. Create New → Web Service
3. Connect GitHub repo
4. Settings:
   - Runtime: Node
   - Build: `npm install`
   - Start: `npm start`
   - Environment:
     - `PORT=10000`
     - `NODE_ENV=production`
     - `MONGO_URI=your_connection_string`
5. Deploy

**Update frontend to call backend:**
- In `frontend/src/App.jsx`, change:
  ```javascript
  const api = process.env.VITE_API_URL || '/api';
  ```
  To use your Render backend URL

---

### Option 3: Heroku (Full Stack)
1. Install Heroku CLI
2. `heroku login`
3. `heroku create kryptonix-studio`
4. Set env vars:
   ```bash
   heroku config:set PORT=5000 NODE_ENV=production
   ```
5. `git push heroku main`
6. `heroku open`

---

### Option 4: Docker (Self-hosted or any cloud)

#### Build Docker image
```dockerfile
# Dockerfile
FROM node:18

WORKDIR /app

# Copy backend
COPY backend ./backend
COPY frontend/dist ./frontend/dist

WORKDIR /app/backend

RUN npm install --only=production

EXPOSE 5000

CMD ["npm", "start"]
```

**Build & run:**
```bash
docker build -t kryptonix .
docker run -p 5000:5000 -e PORT=5000 -e NODE_ENV=production kryptonix
```

---

## 🔑 Convert to MongoDB (Production)

Currently using in-memory storage. To use MongoDB Atlas:

1. Update `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/kryptonix
   PORT=5000
   NODE_ENV=production
   ```

2. Restore MongoDB models & routes:
   - Replace `backend/routes/tasks.js` with MongoDB version
   - Restore `backend/server.js` to use `connectDB()`
   - Uncomment `const connectDB = require('./config/db');`

3. Deploy

---

## ✅ Pre-deployment Checklist

- [ ] Frontend builds without errors (`npm run build`)
- [ ] Backend runs on port 5000
- [ ] API endpoints work: `/api/tasks` GET/POST/PUT/DELETE
- [ ] `.env.example` is properly configured
- [ ] `.gitignore` excludes `node_modules`, `.env`, `dist`
- [ ] MongoDB is optional (in-memory works for MVP)
- [ ] All dependencies installed

---

## 📡 Production Startup Command

```bash
cd backend
PORT=5000 NODE_ENV=production npm start
```

Backend will automatically serve frontend from `../frontend/dist`

---

## 🔗 Quick Links

- **Railway**: https://railway.app
- **Render**: https://render.com
- **Vercel**: https://vercel.com
- **Heroku**: https://heroku.com
- **MongoDB Atlas**: https://cloud.mongodb.com

---

## 📞 Support

For issues:
1. Check logs on deployment platform
2. Verify env variables are set
3. Ensure ports are open (not blocked by firewall)
4. Test locally with `npm run dev` first
