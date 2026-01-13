// Import Express library
const express = require('express');

// Import Mongoose library  
const mongoose = require('mongoose');

// Import dotenv library
const dotenv = require('dotenv');
dotenv.config();
const isProduction = process.env.NODE_ENV == 'production';

// Import CORS library
const cors = require('cors');

// Import Models
const User = require('./models/User');
const Task = require('./models/Task');

// Import Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');  // ← NEW LINE

// Create Express application
const app = express();

// Middleware: Parse JSON data from requests
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: isProduction 
    ? process.env.FRONTEND_URL  // Production: your frontend URL
    : 'http://localhost:3000',   // Development: local frontend
  credentials: true
};
app.use(cors(corsOptions));

// Get MongoDB connection string from .env file
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskmanager';

// Connect to MongoDB database
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);  // Exit if can't connect to database
  });

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);  // ← NEW LINE

// Create a test route (homepage)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Task Management API is running!',
    version: '1.0.0',
    status: 'Server is running'
  });
});

// Test route to check models
app.get('/test-models', (req, res) => {
  res.json({
    message: 'Models are working!',
    models: {
      User: 'User model loaded successfully',
      Task: 'Task model loaded successfully'
    }
  });
});

// Get port number from .env file
const PORT = process.env.PORT || 5000; 

// Start server
app.listen(PORT, () => {
  console.log(`\n Server is running!`);
  console.log(` Port: ${PORT}`);
  console.log(` Environment: ${isProduction ? 'Production' : 'Development'}`);
  if (!isProduction) {
    console.log(` Local URL: http://localhost:${PORT}`);
    console.log(` API Docs: http://localhost:${PORT}/api`);
  }
  console.log(`\n`);
});


// https://task-manager-api-2-d2ti.onrender.com
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTY1ZjJjZjI0ZmYzMzBlY2NkNjJlMGYiLCJpYXQiOjE3NjgyODkzNTksImV4cCI6MTc2ODg5NDE1OX0.zdgSHRGx45MaM0_X3et4Y8WspYh6guDsy7YKXNHX-rs