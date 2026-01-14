/**
 * TASK MANAGER API - Main Server File
 * 
 * This is the entry point of our backend application.
 * It sets up Express server, connects to MongoDB, and configures middleware.
 * 
 * Author: Shruti
 * Date: January 2024
 * Version: 1.0.1
 */

// ========================================
// DEPENDENCIES
// ========================================
const express = require('express');        // Web framework
const mongoose = require('mongoose');      // MongoDB ODM
const dotenv = require('dotenv');          // Environment variables
const cors = require('cors');              // Cross-origin requests
const mongoSanitize = require('express-mongo-sanitize');  // Security

// Load environment variables from .env file
dotenv.config();

// ========================================
// ENVIRONMENT CONFIGURATION
// ========================================
// Check if we're in production or development
const isProduction = process.env.NODE_ENV === 'production';

// ========================================
// EXPRESS APP INITIALIZATION
// ========================================
const app = express();

// ========================================
// MIDDLEWARE CONFIGURATION
// ========================================
// Parse JSON request bodies
app.use(express.json());

// Configure CORS (Cross-Origin Resource Sharing)
const corsOptions = {
  origin: isProduction 
    ? process.env.FRONTEND_URL     // Production: specific frontend URL
    : 'http://localhost:3000',      // Development: local React app
  credentials: true                 // Allow cookies and auth headers
};
app.use(cors(corsOptions));

// Sanitize user input to prevent NoSQL injection attacks
app.use(mongoSanitize());

// ========================================
// MONGODB CONNECTION
// ========================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);  // Exit app if database connection fails
  });

// ========================================
// ROUTES
// ========================================
// Import route handlers
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Mount routes
app.use('/api/auth', authRoutes);   // Authentication routes (register, login)
app.use('/api/tasks', taskRoutes);  // Task CRUD routes

// Root route - API information
app.get('/api', (req, res) => {
  res.json({
    message: 'Task Manager API',
    version: '1.0.1',
    status: 'Server is running',
    endpoints: {
      auth: '/api/auth (POST /register, POST /login)',
      tasks: '/api/tasks (GET, POST, PUT, DELETE)'
    }
  });
});

// Health check endpoint - used for monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// ========================================
// SERVER STARTUP
// ========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server is running!`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌍 Environment: ${isProduction ? 'Production' : 'Development'}`);
  if (!isProduction) {
    console.log(`🔗 Local URL: http://localhost:${PORT}`);
    console.log(`📝 API Docs: http://localhost:${PORT}/api`);
  }
  console.log(`\n`);
});