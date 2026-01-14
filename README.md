# 📝 Task Manager API

> A full-stack RESTful API for managing tasks with user authentication, advanced filtering, search capabilities, and pagination.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://task-manager-api-2-d2ti.onrender.com)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/database-MongoDB-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---
## ✨ Features

### 🔐 Authentication & Security
- User registration with email validation
- Secure login with JWT (JSON Web Tokens)
- Password hashing using bcryptjs
- Protected routes with authentication middleware
- Input sanitization against NoSQL injection

### 📝 Task Management
- **Create** tasks with title, description, status, and priority
- **Read** all tasks or get a specific task by ID
- **Update** task details (only task owner can update)
- **Delete** tasks (only task owner can delete)
- Tasks are linked to user accounts (user ownership)

### 🔍 Advanced Features
- **Filtering**: Filter tasks by status (pending, in-progress, completed)
- **Filtering**: Filter by priority (low, medium, high)
- **Search**: Search tasks by title or description (case-insensitive)
- **Pagination**: Handle large datasets efficiently
  - Customizable page size
  - Page navigation metadata
  - Total count of results
- **Sorting**: Tasks sorted by creation date (newest first)

### 🛡️ Data Validation
- Required field validation
- Email format validation
- Password strength requirements (min 6 characters)
- MongoDB ObjectId validation
- Status and priority value validation

### 🌐 CORS Configuration
- Cross-Origin Resource Sharing enabled
- Configured for frontend integration
- Credentials support for authentication

---
```

**Press** `Ctrl + S` to save

---

**Explanation:**

**Why organize by category?**
```
Without categories:
- Create tasks
- User registration
- Filter by status
- Password hashing
- Search tasks
[Confusing! Hard to read!]

With categories:
🔐 Authentication & Security
  - User registration
  - Password hashing
  
📝 Task Management
  - Create tasks
  
🔍 Advanced Features
  - Filter by status
  - Search tasks
[Clear! Easy to scan!]


## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Encryption**: bcryptjs
- **Security**: express-mongo-sanitize (NoSQL injection prevention)
- **CORS**: Express CORS middleware

### Development Tools
- **Version Control**: Git & GitHub
- **API Testing**: Postman
- **Code Editor**: VS Code
- **Package Manager**: npm

### Deployment & Hosting
- **Backend Hosting**: Render
- **Database Hosting**: MongoDB Atlas
- **Version Control**: GitHub

### Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "express-mongo-sanitize": "^2.2.0"
}
```

---
```

**Press** `Ctrl + S` to save

---


## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download here](https://git-scm.com/)
- **Postman** (optional, for API testing) - [Download here](https://www.postman.com/)

### Installation

Follow these steps to run the project locally:

#### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/task-manager-backend.git
cd task-manager-backend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Create environment variables

Create a `.env` file in the root directory:
```bash
touch .env
```

Add the following variables:
```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

#### 4. Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier)
3. Create a database user
4. Whitelist your IP (or use `0.0.0.0/0` for development)
5. Get your connection string
6. Replace `<password>` with your database password
7. Add `/task-manager` at the end of the connection string

**Example:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/task-manager?retryWrites=true&w=majority
```

#### 5. Start the development server
```bash
npm run dev
```

You should see:
```
🚀 Server is running!
📡 Port: 5000
🌍 Environment: Development
🔗 Local URL: http://localhost:5000

✅ MongoDB connected successfully
📊 Database: task-manager
```

#### 6. Test the API

Open your browser and go to:
```
http://localhost:5000/api
```

You should see:
```json
{
  "message": "Task Manager API",
  "version": "1.0.1",
  "status": "Server is running"
}
```

✅ **Your API is running successfully!**

---

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/task-manager` |
| `JWT_SECRET` | Secret key for JWT token generation | `your-super-secret-key-min-32-chars` |
| `PORT` | Port number for the server | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |

**⚠️ Security Note:** Never commit your `.env` file to GitHub! It's already in `.gitignore`.

---
```
**IMPORTANT:** Replace `YOUR-USERNAME` with your GitHub username!

**Press** `Ctrl + S` to save
---


## 📚 API Documentation

### Base URL

- **Local**: `http://localhost:5000/api`
- **Production**: `YOUR_RENDER_URL/api`

---

### Authentication

All endpoints (except register and login) require authentication using JWT tokens.

**How to authenticate:**
1. Register or login to get a token
2. Include token in request headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| POST | `/tasks` | Create new task | ✅ |
| GET | `/tasks` | Get all tasks (with filters) | ✅ |
| GET | `/tasks/:id` | Get single task | ✅ |
| PUT | `/tasks/:id` | Update task | ✅ |
| DELETE | `/tasks/:id` | Delete task | ✅ |

---

### 1️⃣ Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account

**Request Body:**
```json
{
  "username": "shruti",
  "email": "shruti@example.com",
  "password": "securepass123"
}
```

**Success Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "659abc123def456789012345",
    "username": "shruti",
    "email": "shruti@example.com"
  }
}
```

**Error Responses:**

| Status | Response | Reason |
|--------|----------|--------|
| 400 | `"All fields required"` | Missing username, email, or password |
| 400 | `"User already exists"` | Email already registered |
| 500 | `"Server error"` | Database or server error |

---

### 2️⃣ Login User

**Endpoint:** `POST /api/auth/login`

**Description:** Login and get JWT token

**Request Body:**
```json
{
  "email": "shruti@example.com",
  "password": "securepass123"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "659abc123def456789012345",
    "username": "shruti",
    "email": "shruti@example.com"
  }
}
```

**Error Responses:**

| Status | Response | Reason |
|--------|----------|--------|
| 400 | `"All fields required"` | Missing email or password |
| 401 | `"Invalid credentials"` | Wrong email or password |
| 500 | `"Server error"` | Database or server error |

**💡 Save the token!** You'll need it for all other requests.

---

### 3️⃣ Create Task

**Endpoint:** `POST /api/tasks`

**Description:** Create a new task

**Authentication:** Required (Bearer token)

**Request Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write README and API docs",
  "status": "pending",
  "priority": "high"
}
```

**Field Validations:**

| Field | Required | Type | Valid Values |
|-------|----------|------|--------------|
| `title` | ✅ Yes | String | Any text (min 1 char) |
| `description` | ❌ No | String | Any text |
| `status` | ❌ No | String | `pending`, `in-progress`, `completed` (default: `pending`) |
| `priority` | ❌ No | String | `low`, `medium`, `high` (default: `medium`) |

**Success Response (201 Created):**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "659xyz789abc012345678901",
    "title": "Complete project documentation",
    "description": "Write README and API docs",
    "status": "pending",
    "priority": "high",
    "user": {
      "_id": "659abc123def456789012345",
      "username": "shruti",
      "email": "shruti@example.com"
    },
    "createdAt": "2024-01-20T10:30:00.000Z",
    "updatedAt": "2024-01-20T10:30:00.000Z"
  }
}
```

**Error Responses:**

| Status | Response | Reason |
|--------|----------|--------|
| 400 | `"Title is required"` | Missing title field |
| 400 | `"Invalid status"` | Status not in valid values |
| 400 | `"Invalid priority"` | Priority not in valid values |
| 401 | `"Access denied"` | No token or invalid token |
| 500 | `"Server error"` | Database or server error |

---

### 4️⃣ Get All Tasks

**Endpoint:** `GET /api/tasks`

**Description:** Get all tasks for the logged-in user with filtering, search, and pagination

**Authentication:** Required

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `status` | String | Filter by status | `?status=completed` |
| `priority` | String | Filter by priority | `?priority=high` |
| `search` | String | Search in title/description | `?search=documentation` |
| `page` | Number | Page number | `?page=2` |
| `limit` | Number | Items per page | `?limit=5` |

**Example Requests:**
```bash
# Get all tasks (default: page 1, limit 10)
GET /api/tasks

# Filter by status
GET /api/tasks?status=completed

# Filter by priority
GET /api/tasks?priority=high

# Combine filters
GET /api/tasks?status=pending&priority=high

# Search
GET /api/tasks?search=documentation

# Pagination
GET /api/tasks?page=2&limit=5

# Combine everything
GET /api/tasks?status=pending&priority=high&search=project&page=1&limit=10
```

**Success Response (200 OK):**
```json
{
  "message": "Tasks retrieved successfully",
  "tasks": [
    {
      "_id": "659xyz789abc012345678901",
      "title": "Complete project documentation",
      "description": "Write README and API docs",
      "status": "pending",
      "priority": "high",
      "user": {
        "_id": "659abc123def456789012345",
        "username": "shruti",
        "email": "shruti@example.com"
      },
      "createdAt": "2024-01-20T10:30:00.000Z",
      "updatedAt": "2024-01-20T10:30:00.000Z"
    }
    // ... more tasks
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalTasks": 25,
    "tasksPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Error Responses:**

| Status | Response | Reason |
|--------|----------|--------|
| 401 | `"Access denied"` | No token or invalid token |
| 500 | `"Server error"` | Database or server error |

---

### 5️⃣ Get Single Task

**Endpoint:** `GET /api/tasks/:id`

**Description:** Get a specific task by ID (only if you own it)

**Authentication:** Required

**URL Parameters:**
- `id` - Task ID (MongoDB ObjectId)

**Example Request:**
```bash
GET /api/tasks/659xyz789abc012345678901
```

**Success Response (200 OK):**
```json
{
  "message": "Task retrieved successfully",
  "task": {
    "_id": "659xyz789abc012345678901",
    "title": "Complete project documentation",
    "description": "Write README and API docs",
    "status": "pending",
    "priority": "high",
    "user": {
      "_id": "659abc123def456789012345",
      "username": "shruti",
      "email": "shruti@example.com"
    },
    "createdAt": "2024-01-20T10:30:00.000Z",
    "updatedAt": "2024-01-20T10:30:00.000Z"
  }
}
```

**Error Responses:**

| Status | Response | Reason |
|--------|----------|--------|
| 400 | `"Invalid task ID format"` | ID is not valid MongoDB ObjectId |
| 401 | `"Access denied"` | No token or invalid token |
| 404 | `"Task not found"` | Task doesn't exist or doesn't belong to you |
| 500 | `"Server error"` | Database or server error |

---

### 6️⃣ Update Task

**Endpoint:** `PUT /api/tasks/:id`

**Description:** Update a task (only if you own it)

**Authentication:** Required

**URL Parameters:**
- `id` - Task ID

**Request Body:** (all fields optional, send only what you want to update)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress",
  "priority": "medium"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "659xyz789abc012345678901",
    "title": "Updated title",
    "description": "Updated description",
    "status": "in-progress",
    "priority": "medium",
    "user": {
      "_id": "659abc123def456789012345",
      "username": "shruti",
      "email": "shruti@example.com"
    },
    "createdAt": "2024-01-20T10:30:00.000Z",
    "updatedAt": "2024-01-20T11:00:00.000Z"
  }
}
```

**Error Responses:**

| Status | Response | Reason |
|--------|----------|--------|
| 400 | `"Invalid task ID format"` | ID is not valid |
| 400 | `"Invalid status value"` | Status not in valid values |
| 400 | `"Invalid priority value"` | Priority not in valid values |
| 401 | `"Access denied"` | No token or invalid token |
| 404 | `"Task not found"` | Task doesn't exist or doesn't belong to you |
| 500 | `"Server error"` | Database or server error |

---

### 7️⃣ Delete Task

**Endpoint:** `DELETE /api/tasks/:id`

**Description:** Delete a task (only if you own it)

**Authentication:** Required

**URL Parameters:**
- `id` - Task ID

**Success Response (200 OK):**
```json
{
  "message": "Task deleted successfully",
  "task": {
    "_id": "659xyz789abc012345678901",
    "title": "Complete project documentation",
    "description": "Write README and API docs",
    "status": "pending",
    "priority": "high"
  }
}
```

**Error Responses:**

| Status | Response | Reason |
|--------|----------|--------|
| 400 | `"Invalid task ID format"` | ID is not valid |
| 401 | `"Access denied"` | No token or invalid token |
| 404 | `"Task not found"` | Task doesn't exist or doesn't belong to you |
| 500 | `"Server error"` | Database or server error |

---

### 🔒 Authentication Flow

**Step-by-step guide to using the API:**

#### 1. Register a new user
```bash
POST /api/auth/register
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

#### 2. Login to get token
```bash
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

# Response includes token:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Use token in subsequent requests
```bash
# Include in headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Now you can:
POST /api/tasks
GET /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
```

---


## 🌐 Deployment

This API is deployed on **Render** and uses **MongoDB Atlas** for the database.

### Live Links

- **API Base URL**: `YOUR_RENDER_URL`
- **API Documentation**: `YOUR_RENDER_URL/api`
- **Health Check**: `YOUR_RENDER_URL/health`

### Deploy Your Own Copy

#### Option 1: Deploy to Render (Recommended)

1. **Fork this repository** on GitHub

2. **Create account** on [Render](https://render.com)

3. **Create new Web Service**:
   - Connect your GitHub repository
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables** in Render dashboard:
```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
```

5. **Deploy!** Render will automatically deploy your app

**✅ Your API will be live in 2-3 minutes!**

#### Option 2: Deploy to Railway

1. Fork this repository
2. Go to [Railway](https://railway.app)
3. Click "New Project" → "Deploy from GitHub"
4. Select your forked repository
5. Add environment variables
6. Deploy!

#### Option 3: Deploy to Heroku

**Note:** Heroku no longer has a free tier.

---

### Environment Setup for Production

Make sure these environment variables are set:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
JWT_SECRET=your-production-jwt-secret-min-32-characters
NODE_ENV=production
PORT=10000  # Render assigns this automatically
```

---


## 📁 Project Structure
```
task-manager-backend/
│
├── models/
│   ├── User.js                 # User model schema
│   └── Task.js                 # Task model schema
│
├── routes/
│   ├── auth.js                 # Authentication routes
│   └── tasks.js                # Task CRUD routes
│
├── middleware/
│   └── authMiddleware.js       # JWT verification middleware
│
├── node_modules/               # Dependencies (git ignored)
│
├── .env                        # Environment variables (git ignored)
├── .gitignore                  # Git ignore rules
├── package.json                # Project metadata & dependencies
├── package-lock.json           # Locked dependency versions
├── server.js                   # Main application entry point
└── README.md                   # Project documentation (you are here!)
```

### File Descriptions

| File/Folder | Purpose |
|-------------|---------|
| `server.js` | Main entry point, Express app setup, middleware configuration |
| `models/User.js` | MongoDB schema for users (username, email, password) |
| `models/Task.js` | MongoDB schema for tasks (title, description, status, priority, user reference) |
| `routes/auth.js` | User registration and login endpoints |
| `routes/tasks.js` | CRUD operations for tasks + filtering, search, pagination |
| `middleware/authMiddleware.js` | Validates JWT tokens for protected routes |
| `.env` | Contains sensitive data (MongoDB URI, JWT secret) |
| `.gitignore` | Prevents sensitive files from being committed to Git |

---


## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### How to Contribute

1. **Fork the repository**
```bash
   # Click "Fork" button on GitHub
```

2. **Clone your fork**
```bash
   git clone https://github.com/YOUR-USERNAME/task-manager-backend.git
```

3. **Create a feature branch**
```bash
   git checkout -b feature/your-feature-name
```

4. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where needed
   - Test your changes

5. **Commit your changes**
```bash
   git add .
   git commit -m "Add: your feature description"
```

6. **Push to your fork**
```bash
   git push origin feature/your-feature-name
```

7. **Create Pull Request**
   - Go to original repository
   - Click "New Pull Request"
   - Describe your changes
   - Submit!

### Contribution Guidelines

- Write clear commit messages
- Update README if adding features
- Test before submitting PR
- Be respectful and constructive

---

## 📄 License

This project is licensed under the **MIT License**.
```
MIT License

Copyright (c) 2024 YOUR_NAME

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Contact

**Shruti**

- GitHub: (https://github.com/shruti22-svg)
- Email: shrutibhagavatham@gmail.com
- LinkedIn: (https://linkedin.com/in/Shruti-Bhagavatham)
---

## 🙏 Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [Render Documentation](https://render.com/docs)

---

##  Show Your Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!

---

**Made by Shruti**