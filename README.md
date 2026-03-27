# Kryptonix Studio - MERN Task Hub

A modern, production-ready full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). Designed for early-stage startups scaling engineering execution and team velocity.

---

## 🚀 Features

- ✅ **Full CRUD API** for task management
- ✅ **Real-time task tracking** with completion status
- ✅ **KPI dashboard** showing open vs completed tasks
- ✅ **Startup-grade UI** with modern design
- ✅ **Production-ready deployment** options
- ✅ **In-memory & MongoDB** support
- ✅ **Docker & containerization** ready

---

## 📁 Project Structure

```
Fullstack Kryptonix/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   └── tasks.js           # API endpoints
│   ├── server.js              # Express app
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main component
│   │   ├── App.css            # Styling
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── dist/                  # Production build
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── Dockerfile                 # Production container
├── docker-compose.yml         # Container orchestration
├── DEPLOYMENT.md              # Deployment guide
└── README.md                  # This file
```

---

## ⚡ Quick Start (Development)

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit: **http://localhost:3000**

---

## 🏗️ Production Build

### Build Frontend
```bash
cd frontend
npm run build
```
Output: `frontend/dist/`

### Start Backend (Production)
```bash
cd backend
npm install --only=production
PORT=5000 NODE_ENV=production npm start
```

Backend automatically serves frontend from `../frontend/dist`

---

## 🐳 Docker Deployment

### Build Image
```bash
docker build -t kryptonix:latest .
```

### Run Container
```bash
docker run -p 5000:5000 \
  -e PORT=5000 \
  -e NODE_ENV=production \
  kryptonix:latest
```

### Docker Compose
```bash
docker-compose up
```

---

## 📡 Deployment Platforms

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides:

- **Railway** (Easy, recommended)
- **Vercel + Render**
- **Heroku**
- **Docker** (self-hosted)
- **AWS, GCP, Azure**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### Example Request
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Build MVP"}'
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite + Axios
- **Backend**: Express.js + Node.js
- **Database**: MongoDB (Atlas) / In-memory
- **Styling**: CSS3 (modern, responsive)
- **DevOps**: Docker, Docker Compose
- **Package Manager**: npm

---

## 📊 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/kryptonix
PORT=5000
NODE_ENV=development
```

### Frontend
Uses system environment: `VITE_API_URL` (optional, defaults to `/api`)

---

## 🚢 Deployment Checklist

- [ ] Frontend builds: `npm run build`
- [ ] Backend starts: `npm start`
- [ ] APIs respond: `curl http://localhost:5000/api/tasks`
- [ ] Environment variables set correctly
- [ ] `.gitignore` excludes sensitive files
- [ ] MongoDB Atlas IP whitelisted (if using)
- [ ] Ports are open (5000 for backend, 3000 for frontend dev)

---

## 🔒 Security Notes

- Add authentication (JWT) for production
- Implement rate limiting on API
- Use HTTPS in production
- Keep dependencies updated: `npm audit fix`
- Store secrets in `.env` (never commit)
- Whitelist MongoDB IPs for remote access

---

## 📚 Scripts

### Backend
```bash
npm run dev      # Development with nodemon
npm start        # Production
```

### Frontend
```bash
npm run dev      # Development server (port 3000)
npm run build    # Production build
npm run preview  # Preview production build
```

---

## 🤝 Contributing

1. Create a feature branch
2. Commit changes
3. Push to repository
4. Create pull request

---

## 📝 License

Built for Kryptonix Studio - Early stage startup success.

---

## 💡 Next Steps for Production

1. **Database**: Migrate to MongoDB Atlas
2. **Auth**: Add JWT authentication
3. **Testing**: Add Jest + React Testing Library
4. **CI/CD**: Setup GitHub Actions
5. **Monitoring**: Add error logging (Sentry)
6. **Performance**: Optimize bundle size
7. **UI/UX**: Enhance design system
8. **Scaling**: Add caching layer (Redis)

---

## 📞 Support

For deployment issues, check:
1. Platform logs
2. Environment variables
3. Port availability
4. Network/firewall settings
5. MongoDB connection string (if using)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed troubleshooting.
