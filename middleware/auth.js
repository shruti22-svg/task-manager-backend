// Import jsonwebtoken to verify tokens
const jwt = require('jsonwebtoken');

// Authentication middleware
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided.' 
      });
    }

    // Extract token from "Bearer token" format
    const token = authHeader.split(' ')[1];

    // Check if token exists after splitting
    if (!token) {
      return res.status(401).json({ 
        message: 'Access denied. Invalid token format.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object
    req.user = decoded.userId;

    // Continue to next middleware/route
    next();

  } catch (error) {
    res.status(401).json({ 
      message: 'Invalid token' 
    });
  }
};

// Export middleware
module.exports = authMiddleware;


