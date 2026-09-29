# TaskFlow

Interactive Dynamic Task Dashboard — A full-stack task management dashboard built with React, Express, and MySQL.

## ✨ Features

- 🔐 JWT Authentication (register / login / protected routes)
- ✅ Full CRUD for tasks (create / read / update / delete)
- 🔍 Search, filter by status & priority, sort by multiple criteria
- 📊 Dynamic stats & analytics dashboard
- 🎨 Modern dark SaaS UI
- 🛡️ User-owned tasks — every user sees only their own data
- 🧱 Centralized error handling & input validation (Zod)

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS v4
- React Router v6
- Fetch API

**Backend**
- Node.js + Express 5
- Prisma ORM 7
- MySQL (via XAMPP)
- JWT + bcrypt
- Zod validation

## 📁 Project Structure
taskflow-dashboard/
├── client/ # React + Vite frontend
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── services/
└── server/ # Express + Prisma backend
├── prisma/
└── src/
├── controllers/
├── routes/
├── middleware/
├── validators/
└── utils/



## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- MySQL (or XAMPP)
- Git

### 1) Clone

```bash
git clone <your-repo-url>
cd taskflow-dashboard
2) Backend Setup
bash
cd server
npm install
Create server/.env:

env
DATABASE_URL="mysql://root@localhost:3306/taskflow"
JWT_SECRET="your-long-random-secret-here"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=development
Create the database in MySQL:

sql
CREATE DATABASE taskflow CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
Run migrations & start:

bash
npx prisma migrate dev
npm run dev
Backend runs on http://localhost:5000.

3) Frontend Setup
bash
cd client
npm install
npm run dev
Frontend runs on http://localhost:5173.

📡 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login and get JWT
GET	/api/auth/me	Get current user (protected)
Tasks (all protected)
Method	Endpoint	Description
GET	/api/tasks	List tasks (supports ?status=&priority=&search=&sort=)
POST	/api/tasks	Create task
GET	/api/tasks/:id	Get single task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task