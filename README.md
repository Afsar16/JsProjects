# Peer Learning & Academic Support (SIS Module)

Full-stack MERN implementation of an enterprise SIS dashboard module inspired by Ellucian Experience style portals.

## Project Structure

```text
JsProjects/
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/db.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── dashboardController.js
│       │   ├── messageController.js
│       │   └── postController.js
│       ├── middleware/authMiddleware.js
│       ├── models/
│       │   ├── Message.js
│       │   ├── SupportPost.js
│       │   └── User.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── dashboardRoutes.js
│       │   ├── messageRoutes.js
│       │   └── postRoutes.js
│       └── utils/generateToken.js
├── frontend/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api/client.js
│       ├── components/
│       │   ├── ChatPanel.jsx
│       │   ├── HeaderBar.jsx
│       │   ├── PostCard.jsx
│       │   ├── PostFormModal.jsx
│       │   └── Sidebar.jsx
│       ├── context/AuthContext.jsx
│       ├── layouts/PortalLayout.jsx
│       ├── pages/
│       │   ├── DashboardPage.jsx
│       │   ├── LoginPage.jsx
│       │   └── RegisterPage.jsx
│       ├── routes/ProtectedRoute.jsx
│       └── utils/time.js
└── README.md
```

## Backend (Node/Express/Mongoose)

### MongoDB Schemas
- **Users**: name, email, password (hashed), role, major, year, verifiedStudent.
- **SupportPosts**: title, description, urgency, createdBy, studentName, verified, status, acceptedBy, scheduledTime.
- **Messages**: senderId, receiverId, postId, message, timestamps.

### REST API Routes
- `POST /api/auth/register` Register student
- `POST /api/auth/login` Login and issue JWT
- `GET /api/auth/me` Current user (protected)
- `GET /api/posts` List all posts (protected)
- `POST /api/posts` Create post (protected)
- `PUT /api/posts/:id` Edit own post
- `DELETE /api/posts/:id` Delete own post
- `PUT /api/posts/:id/accept` Accept session + optional scheduling
- `PUT /api/posts/:id/complete` Mark accepted session completed
- `GET /api/messages/:postId` Session chat history for participants
- `POST /api/messages` Send message in session thread
- `GET /api/dashboard` Analytics + active/completed/recent activity

### Auth and RBAC
- JWT bearer token middleware in `authMiddleware.js`.
- Role guard helper included (`authorizeRoles`) for admin expansion.

## Frontend (React + Tailwind + Axios)

### UX module behavior
- SIS enterprise layout with top institutional header + academic sidebar nav.
- Dashboard card title: **Peer Learning & Academic Support**.
- Post cards include urgency badges, verified badge, timestamps, status, and actions.
- Students can create/edit/delete own posts.
- Other students can accept sessions, optionally set schedule, and complete sessions.
- Basic post-level chat for accepted/completed sessions.
- Dashboard widgets: total sessions, active posts count, engagement rate.
- Recent activity feed from backend analytics endpoint.

## Environment Variables

### backend/.env
```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sis_peer_support
JWT_SECRET=replace_with_secure_secret
```

### frontend/.env
```bash
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

## Notes
- This module is intentionally modeled as an SIS dashboard feature, not a standalone marketplace app.
- Socket.io can be added later for real-time messaging; this version uses REST polling.
