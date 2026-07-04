# 📋 Inquiry Management System

A modern, full-stack web application for submitting, viewing, updating, and deleting inquiry forms. Built using **React (Vite)** and **Tailwind CSS** on the frontend, and **Node.js (Express)** with **MongoDB** on the backend.

---

## 🌟 Key Features

* **Decoupled Component Architecture:** Form, table, and search functionality are separate components, coordinated by a single page wrapper.
* **RESTful API endpoints:** Standardized backend endpoints using HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
* **Sleek Premium Dark UI:** Dull-black charcoal background (`#1c1c1e`) inspired by modern Apple and Tesla interfaces.
* **Dual-Layer Validation:**
  * **Phone:** Caps at exactly 10 digits and flags invalid formats before submission.
  * **Email:** Live pattern validation (`user@domain.ext`) on both frontend and server.
  * **Required Fields:** Server validates all inputs to prevent saving empty fields.
* **Dynamic Search Bar:** Only appears when at least one inquiry exists. Searches case-insensitively across Name, Email, Phone, Subject, and Message fields.

---

## 📁 Project Structure

```text
Inquire_Form/
├── Backend/                 # Express API Server
│   ├── src/
│   │   ├── Database/        # DB Connection (MongoDB Atlas)
│   │   ├── Controller/      # CRUD Route Handlers
│   │   ├── model/           # Mongoose Data Schema
│   │   └── router/          # API Route Mapping
│   ├── .env                 # Backend environment secrets (Git ignored)
│   ├── index.js             # Main server entry file
│   └── package.json         # Backend script & packages config
│
└── Frontend/                # React (Vite + Tailwind) App
    ├── src/
    │   ├── components/      # Modular UI Components (Form, Table, SearchBar)
    │   ├── App.jsx          # Component Entry shell
    │   ├── index.css        # Global CSS & theme definition
    │   └── main.jsx         # React mounting entry point
    ├── .env                 # Frontend environment config
    ├── vercel.json          # Vercel SPA routing rules
    └── package.json         # Frontend script & packages config
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
Ensure you have **Node.js (version 18 or higher)** installed on your machine.

---

### 2. Backend Configuration

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `Backend/` folder:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ALLOWED_ORIGINS=http://localhost:5173,https://inquire-form.vercel.app
   ```

---

### 3. Frontend Configuration

1. Open your terminal and navigate to the frontend directory:
   ```bash
   cd ../Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `Frontend/` folder:
   ```env
   VITE_API_BASE=http://localhost:3000
   ```

---

## 🚀 Running Locally

To run the application locally, you must run both the backend server and the frontend dev server simultaneously.

### Start the Backend Server
From the `Backend/` directory:
```bash
npm run dev
```
*Outputs: `server started on port 3000` & `Database successfully connected`*

### Start the Frontend Dev Server
From the `Frontend/` directory:
```bash
npm run dev
```
*Outputs: Local URL (usually `http://localhost:5173`)*

Open your browser and visit the local URL to test the app.

---

## 📡 API Endpoints (Backend)

| Method | Endpoint | Description | Payloads / Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/inquiries` | Retrieve all inquiries | None |
| **POST** | `/api/inquiries` | Create a new inquiry | `name`, `subject`, `email`, `phone`, `message` (JSON) |
| **PUT** | `/api/inquiries/:id` | Update an existing inquiry | `:id` (URL param), updated fields (JSON) |
| **DELETE** | `/api/inquiries/:id` | Delete an inquiry | `:id` (URL param) |

---

## 📦 Deployment

### Backend (Render)
1. Push your repository to GitHub.
2. Link your repository to a new **Web Service** on Render.
3. Set root directory to `Backend`.
4. Configure env variables `MONGO_URI` and `ALLOWED_ORIGINS` (pointing to your Vercel URL).

### Frontend (Vercel)
1. Connect your repo to Vercel.
2. Set root directory to `Frontend`.
3. Add the `VITE_API_BASE` environment variable pointing to your Render backend domain.
