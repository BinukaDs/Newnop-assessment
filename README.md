# Newnop Assessment - Task Management System

A full-stack Task Management System built as part of the Newnop assessment. This application allows users to register, login, and manage tasks within a workspace.

## Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **State & Context:** React Context API
- **Deployment:** Vercel

### Backend
- **Framework:** Node.js with Express
- **Language:** TypeScript
- **Database:** MongoDB (using Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel (Serverless Functions)

## Features

- **Authentication:** Secure user registration and login.
- **Task Management:** Create, read, update, and delete tasks.
- **Filtering & Search:** Search tasks by title or filter them by status (Open, In Progress, Testing, Complete) and priority.
- **Role-based Access:** Differentiates between regular users and administrators.
- **Modern UI:** Built using a custom shadcn/ui preset for a premium, responsive look and feel.

## Git Branching Strategy

This project follows a structured, prefix-based branching strategy to keep frontend, backend, and documentation changes organized:

- **`main`**: The primary branch containing production-ready code. Commits here trigger automatic deployments to Vercel.
- **`frontend/<feature>`**: Used for all frontend-specific features, UI updates, and bug fixes (e.g., `frontend/dashboard`, `frontend/tms`).
- **`backend/<feature>`**: Used for backend API endpoints, database models, and service logic (e.g., `backend/auth`, `backend/tasks`).
- **`docs/<feature>`**: Dedicated to documentation updates (e.g., `docs/README.md`).

When working on a new feature, a branch is created off `main` with the appropriate prefix. Once the feature is complete and tested, it is merged back into `main`.

## Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- Yarn or npm
- MongoDB URI

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Create a `.env` file and configure your environment variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the development server:
   ```bash
   yarn dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Configure your `.env` to point to the local backend URL if necessary.
4. Start the development server:
   ```bash
   yarn dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.