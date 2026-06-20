# 🔥 Ember & Oak — Complete Solution

> **Full Stack Restaurant + CRM Platform**  
> Static website + React-based Mini CRM with Node/Express backend & MongoDB

---

## 📦 Project Overview

This monorepo contains:
1. **Main Website** — Ember & Oak restaurant static site (HTML/CSS/JS)
2. **Mini CRM** — Lead management system with React frontend + Express backend

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)

### Local Development (Full Stack)

1. **Clone and navigate:**
   ```bash
   cd LocalBusiness\ portal
   ```

2. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your MongoDB URI and JWT secret.

3. **Install backend dependencies:**
   ```bash
   cd mini-crm/server
   npm install
   ```

4. **Install frontend dependencies:**
   ```bash
   cd mini-crm/client
   npm install
   ```

5. **Start backend server** (new terminal):
   ```bash
   cd mini-crm/server
   npm run dev
   ```
   Backend runs on: **http://localhost:5000**

6. **Start frontend dev server** (new terminal):
   ```bash
   cd mini-crm/client
   npm run dev
   ```
   Frontend runs on: **http://localhost:5173**

7. **Open main website:**
   Open `index.html` in your browser for the static restaurant site.

8. **Seed sample data (optional):**
   ```
   GET http://localhost:5000/seed-now
   ```
   Creates 3 test users and 10 sample leads.

---

## 📂 Project Structure

```
LocalBusiness portal/
├── index.html              → Restaurant home
├── menu.html               → Full menu
├── about.html              → Our story
├── gallery.html            → Photo gallery
├── contact.html            → Contact form + map
├── reservations.html       → Table booking
├── css/
│   ├── style.css           → Design system
│   ├── animations.css      → Keyframe animations
│   └── responsive.css      → Mobile breakpoints
├── js/
│   ├── main.js             → Navigation, scroll effects
│   ├── menu.js             → Menu filtering
│   ├── gallery.js          → Photo lightbox
│   └── reservation.js      → Form validation
├── mini-crm/               → React + Node CRM app
│   ├── client/             → React frontend (Vite)
│   │   ├── src/
│   │   │   ├── pages/      → Login, Dashboard, Leads, Analytics
│   │   │   ├── components/ → Reusable UI components
│   │   │   ├── context/    → Auth, Theme, Toast
│   │   │   └── api/        → Axios instance
│   │   └── vite.config.js
│   ├── server/             → Express backend
│   │   ├── routes/         → /auth, /leads, /analytics
│   │   ├── models/         → User, Lead, Activity schemas
│   │   ├── middleware/     → Auth, validation
│   │   └── controllers/    → Business logic
│   ├── DEPLOYMENT.md       → Production deployment guide
│   ├── DEPLOYMENT_CHECKLIST.md
│   └── API_DOCS.md         → Complete API reference
├── .env.example            → Environment template
├── .gitignore              → Git exclusions
└── README.md               → This file
```

---

## 🔐 Environment Variables

### Root Development (`.env.local`)
```env
# Backend
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/mini-crm
JWT_SECRET=your_secret_key_min_32_characters
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173

# Frontend
VITE_API_URL=http://localhost:5000/api
```

### Production (Render + Vercel)
See [mini-crm/DEPLOYMENT.md](mini-crm/DEPLOYMENT.md) for full instructions.

---

## 📖 Documentation

- **[API Documentation](mini-crm/API_DOCS.md)** — Complete endpoint reference
- **[Deployment Guide](mini-crm/DEPLOYMENT.md)** — Deploy to Render (backend) & Vercel (frontend)
- **[Deployment Checklist](mini-crm/DEPLOYMENT_CHECKLIST.md)** — Pre-launch verification

---

## 🛠️ Available Scripts

### Main Website
- Open `index.html` — no build required

### Backend (mini-crm/server)
```bash
npm run dev      # Development with nodemon
npm start        # Production
npm run seed     # Seed sample data
npm run reset    # Reset users database
```

### Frontend (mini-crm/client)
```bash
npm run dev      # Vite dev server (http://localhost:5173)
npm run build    # Production build → dist/
npm run lint     # ESLint check
npm run preview  # Preview production build
```

---

## 🌐 Deployment

### Option 1: Static Site (Main Website Only)
Drag the project to [netlify.com/drop](https://app.netlify.com/drop) for instant hosting.

### Option 2: Full Stack (Restaurant + CRM)
1. Deploy backend to **Render**: [mini-crm/DEPLOYMENT.md](mini-crm/DEPLOYMENT.md)
2. Deploy frontend to **Vercel**: [mini-crm/DEPLOYMENT.md](mini-crm/DEPLOYMENT.md)
3. Update environment variables in both services

See [Deployment Checklist](mini-crm/DEPLOYMENT_CHECKLIST.md) before launching.

---

## 🔑 Default Test Credentials

After running `/seed-now`:
```
Admin:    admin@crm.com / password123
Manager:  manager@crm.com / password123
Viewer:   viewer@crm.com / password123
```
⚠️ Change passwords immediately in production.

---

## 🎨 Main Website Features

✅ Responsive design (mobile-first)  
✅ Smooth scroll animations  
✅ Image lazy loading  
✅ Menu filtering by category  
✅ Photo gallery with lightbox  
✅ Reservation form with date/time picker  
✅ Contact form with validation  
✅ Google Maps integration  
✅ Dark/light theme support  

---

## 💼 CRM Features

✅ User authentication (JWT)  
✅ Role-based access control (Admin/Manager/Viewer)  
✅ Lead management (CRUD)  
✅ Lead status tracking  
✅ Follow-up notes  
✅ Dashboard analytics  
✅ Real-time metrics  
✅ Lead filtering & search  

---

## 🐛 Troubleshooting

### Backend won't connect to MongoDB
- Check `MONGO_URI` in `.env.local`
- Ensure MongoDB Atlas has your IP whitelisted
- Verify database user has correct permissions

### Frontend API calls failing
- Ensure backend is running on `http://localhost:5000`
- Check `VITE_API_URL` in `.env.local`
- Check browser console for CORS errors

### Nodemon not restarting
```bash
npm install -D nodemon
npm run dev
```

### Port already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000    # Windows (then taskkill)
```

---

## 📝 License

This project is built as part of an internship demonstrating full-stack web development skills.

---

## 🤝 Questions?

Refer to individual documentation:
- Main site issue? Check `README.md` in root
- CRM API question? See [API_DOCS.md](mini-crm/API_DOCS.md)
- Deployment stuck? Follow [DEPLOYMENT.md](mini-crm/DEPLOYMENT.md)

---

**Last Updated:** June 20, 2026  
**Status:** Production-ready ✅
