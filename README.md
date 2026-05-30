# SecureAuth | Unified Syllabus & Role Authorization Portal

SecureAuth is an engineered role-based access control (RBAC) portal showcasing secure web engineering practices, stateless JSON Web Token (JWT) management, HTTPOnly cookie authentication sessions, and dynamic course syllabus administration.

## 🚀 Key Features

*   **Role-Based Access Control (RBAC):** Custom route guards restricting system viewports based on authorization permissions (`Visitor`, `Student`, `Admin`).
*   **JWT Sandbox Playground:** An interactive sandbox widget on the home page allowing real-time token claim inspection (Header, Payload, Signature) and live route clearance simulation.
*   **Dynamic Syllabus Syncing:** Course syllabi publishers inside the Admin dashboard feed immediately into the Student dashboard and Home page directories.
*   **Sleek Glassmorphic Design:** Harmonics tailored for both Light Mode (default) and Dark Mode, powered by Tailwind CSS v4 and Google Fonts (*Outfit* & *Inter*).
*   **Encrypted HTTPOnly Cookie Handling:** Safe session cookie configurations with credentials sharing enabled across CORS headers.

---

## 📂 Project Structure

```text
AUTHAPP/
├── client/                 # Frontend React codebase
│   ├── src/
│   │   ├── components/     # Navbar, Footer, Route Guards, Skeleton loaders
│   │   ├── context/        # Auth & Course Global state provider
│   │   ├── pages/          # Home, Login, Signup, Student & Admin dashboards
│   │   └── index.css       # Custom glassmorphic styles & animations
│   ├── .env                # Client environment config (VITE_API_URL)
│   └── package.json
│
├── server/                 # Backend Express codebase
│   ├── config/             # Database connection pools
│   ├── controllers/        # Register, Login, Auth check route logic
│   ├── middlewares/        # Authorization guards checks
│   ├── models/             # User & Course DB Models
│   ├── routes/             # API routing mappings
│   ├── .env                # Server configuration (PORT, DB URL, JWT secrets)
│   └── package.json
│
└── .gitignore              # Project-wide Git ignore configurations
```

---

## 🛠️ Technology Stack

*   **Frontend Client:** React 19, Vite, Tailwind CSS v4, Lucide Icons, Axios.
*   **Backend Server:** Node.js, Express.js, JSON Web Tokens (JWT), Cookie-Parser.
*   **Database Engine:** MongoDB Atlas, Mongoose ODM.

---

## ⚙️ Configuration Setup

### 1. Server Environment (`/server/.env`)
Create a `.env` file inside the `server/` directory:
```env
PORT = 4000
MONGODB_URL = <your-mongodb-connection-string>
JWT_SECRET = <your-jwt-signing-secret>
```

### 2. Client Environment (`/client/.env`)
Create a `.env` file inside the `client/` directory:
```env
VITE_API_URL = http://localhost:4000/api/v1
```

---

## 🏁 How to Run Locally

### Step 1: Start Backend Server
```bash
cd server
npm install
npm run dev
```
The server will start listening at `http://localhost:4000` and confirm connection to MongoDB.

### Step 2: Start Client Server
```bash
cd client
npm install
npm run dev
```
Vite will compile and serve the frontend at `http://localhost:5173`.

---

## 🔌 API Mappings

| Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/signup` | Public | Register a new user (`Visitor`, `Student`, `Admin`) |
| **POST** | `/api/v1/login` | Public | Authenticates credentials and sets secure token cookie |
| **GET** | `/api/v1/student` | Student | Protected route retrieving student statistics & charts |
| **GET** | `/api/v1/admin` | Admin | Protected console panel for term status & course publishing |
