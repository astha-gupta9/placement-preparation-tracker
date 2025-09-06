# 📌 Placement Preparation Tracker (MERN + Cloud)

A **full-stack web application** to track placement preparation progress. Built with **MERN stack (MongoDB, Express, React, Node.js)** and deployed on **AWS/GCP**. Features include **CRUD for problems, analytics dashboard, resume upload, and CI/CD deployment.**

## 🚀 Features
- 🔐 **Authentication** (JWT + bcrypt)
- 📚 **CRUD operations** for problems (title, difficulty, tags, status)
- 📊 **Analytics Dashboard** (topic-wise progress using Recharts)
- 📝 **Resume Upload** (AWS S3 / GCP Cloud Storage)
- ☁️ **Cloud Deployment** (Frontend + Backend + DB)
- ⚡**CI/CD Pipeline** (GitHub Actions auto-deploy)

## 🛠️ Tech Stack
- **Frontend:** React, Axios, React Router, Tailwind CSS/Material UI
- **Backend:** Node.js, Express.js, JWT, bcrypt
- **Database:** MongoDB Atlas
- **Cloud:** AWS (EC2, S3) / GCP (Cloud Run, Storage)
- **Deployment:** Vercel/Netlify (frontend), AWS/GCP (backend)
- **CI/CD:** GitHub Actions

## 📂 Project Structure

    placement-tracker/
    ├── backend/
    │    ├── server.js
    │    ├── models/
    │    ├── routes/
    │    ├── controllers/
    │    └── .env (ignored in git)
    ├── frontend/
    │    ├── src/
    |    |    ├── assets/
    |    |    ├── components/
    |    |    ├── context/
    |    |    ├── pages/
    |    |    └── utils/
    │    ├── public/
    │    ├── vite.config.js
    │    ├── .gitignore
    │    ├── eslint.config.js
    │    ├── index.html
    │    ├── postcss.config.js
    │    ├── tailwind.config.js
    │    └── README.md
    ├── README.md
    └── .gitignore

## Progress Log

- **Day 1**: Setup MERN boilerplate (backend server, MongoDB Atlas connection, React App initialized)
- **Day 2**: Added User model, basic auth routes setup.
- **Day 3**: Implemented secure authentication (bcrypt password hashing, JWT token generation, protected route)
- **Day 4**: Designed Problem model, implemented CRUD APIs with JWT protection, tested using Thunder Client (VS Code extension).
- **Day 5**: Implemented Problem model, CRUD routes, controllers
- **Day 6**: Added Problem stats API, error handling improvements, middleware refactor
- **Day 7**: Setup frontend with React + Vite + Tailwind, created App layout for testing styles
- **Day 8**: Developed frontend authentication flow (Login/Register pages, AuthContext, PrivateRoute, Navbar, Layout integration)
- **Day 9**: Implemented Problems UI with full CRUD (Add/Edit/Delete, filter-ready), integrated backend controller, improved API handling with axios instance