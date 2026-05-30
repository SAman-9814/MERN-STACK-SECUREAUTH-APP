# 🛡️ SecureAuth | Unified Syllabus & Role Authorization Portal

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-blue.svg?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-19.2.6-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind v4](https://img.shields.io/badge/tailwind-v4.3.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/database-MongoDB-emerald?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Security](https://img.shields.io/badge/auth-JWT%20%26%20HTTPOnly-blueviolet?style=flat-square&logo=json-web-tokens)](https://jwt.io/)

SecureAuth is an advanced, production-grade role-based access control (RBAC) portal showcasing secure web engineering practices, stateless JSON Web Token (JWT) transmission, HTTPOnly session management, and dynamic course syllabus publishing.

---

## 🗺️ Architectural Workflow

This application implements a decoupled client-server pattern. Here is how client authentication is verified and propagated securely:

```text
┌──────────┐            1. Login Request (Email & Password)           ┌──────────┐
│  Client  │ ───────────────────────────────────────────────────────> │  Server  │
│ (React)  │ <─────────────────────────────────────────────────────── │ (Express)│
└──────────┘         2. HTTPOnly Cookie Set (JWT Session Token)        └──────────┘
      │                                                                    ▲
      │                                                                    │
      │              3. Access Guarded Route (/student)                    │
      └────────────────────────────────────────────────────────────────────┘
                     Cookie attached automatically (Credential CORS)
```

---

## 📂 Directory Structure

The project separates logic cleanly into frontend (`client/`) and backend (`server/`) environments:

```text
AUTHAPP/
├── client/                 # Frontend React client (Port 5173)
│   ├── src/
│   │   ├── components/     # UI elements (Navbar, Footer, Skeleton loaders)
│   │   ├── context/        # Auth & Course Shared State Context
│   │   ├── pages/          # Home, Login, Signup, Student & Admin dashboards
│   │   └── index.css       # Custom glassmorphism system & keyframes
│   ├── .env                # Client environment variables (VITE_API_URL)
│   └── package.json
│
├── server/                 # Backend Express server (Port 4000)
│   ├── config/             # MongoDB connection setup
│   ├── controllers/        # Register, Login, Auth controllers
│   ├── middlewares/        # Express JWT Role Guard checks
│   ├── models/             # User & Course DB Models
│   ├── routes/             # Endpoint path mappings
│   ├── .env                # Server variables (PORT, DB URL, secrets)
│   └── package.json
│
├── .gitignore              # Project-wide Git ignore specifications
└── README.md               # Main project documentation
```

---

## 🏁 How to Get Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18.0.0 or higher).

### 2. Configure Environments

Create a `.env` file in the **`server`** directory:
```env
PORT = 4000
MONGODB_URL = mongodb+srv://<user>:<password>@cluster.mongodb.net/SecureAuthDB?retryWrites=true&w=majority
JWT_SECRET = your_jwt_secret_key_here
```

Create a `.env` file in the **`client`** directory:
```env
VITE_API_URL = http://localhost:4000/api/v1
```

### 3. Execution

First, start the **Backend Server**:
```bash
cd server
npm install
npm run dev
```

Next, open a new terminal and start the **Frontend Client**:
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` to interact with the application.

---

## 🔬 Core Security Features

### Stateless Session Verification
We avoid storing session tokens in local storage, which blocks Cross-Site Scripting (XSS) attackers from stealing active session states. The JWT is encrypted and stored in an **HTTPOnly, Secure Cookie**.

### Interactive JWT Sandbox Playground
The home page features an interactive sandbox widget. It demonstrates how a JWT is constructed from a header, claims payload, and signature key, updating instantly as you simulate different roles (`Visitor`, `Student`, `Admin`).

---

## 🔌 API Mappings

### 1. Authentication Endpoints

#### Register User
*   **Endpoint:** `POST /api/v1/signup`
*   **Access:** Public
*   **Request Body:**
    ```json
    {
      "name": "Alex Carter",
      "email": "alex.carter@university.edu",
      "password": "securepassword123",
      "role": "Student"
    }
    ```

#### Login User
*   **Endpoint:** `POST /api/v1/login`
*   **Access:** Public
*   **Request Body:**
    ```json
    {
      "email": "alex.carter@university.edu",
      "password": "securepassword123"
    }
    ```
*   **Response Header:** Sets cookie `token=eyJhbGci...; HttpOnly; Secure; SameSite=Lax`

### 2. Protected Portal Endpoints

#### Student Dashboard data
*   **Endpoint:** `GET /api/v1/student`
*   **Access:** Authenticated (Requires `Student` Role)

#### Admin Console data
*   **Endpoint:** `GET /api/v1/admin`
*   **Access:** Authenticated (Requires `Admin` Role)

---

## 🛠️ Troubleshooting

*   **CORS Policy Blocking Requests:** Ensure your Express server root has CORS configured correctly with `credentials: true` and mapped to `origin: "http://localhost:5173"`.
*   **Database Connectivity Failures:** Check that your MongoDB Atlas URL is set correctly in `server/.env` and that your local IP address is whitelisted in Atlas Network Access settings.
*   **Route Guard redirects instantly:** Verify that cookies are enabled in your browser. The backend token is stored in cookie storage, which requires cookie sharing permissions to be active.
