/**
 * AUTHENTICATION MIDDLEWARE
 * 
 * This middleware protects routes by verifying JWT tokens.
 * It runs before protected route handlers to ensure user is authenticated.
 * 
 * How it works:
 * 1. Extract token from Authorization header
 * 2. Verify token is valid
 * 3. Decode token to get user ID
 * 4. Attach user ID to request object
 * 5. Allow request to proceed to route handler
 * 
 * Usage:
 * router.get('/protected', authMiddleware, (req, res) => { ... });
 */

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // ========================================
    // STEP 1: GET TOKEN FROM HEADER
    // ========================================
    // Authorization header format: "Bearer TOKEN_STRING"
    const authHeader = req.header('Authorization');
    
    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided.' 
      });
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.replace('Bearer ', '');

    // Check if token exists after removing "Bearer "
    if (!token) {
      return res.status(401).json({ 
        message: 'Access denied. Invalid token format.' 
      });
    }

    // ========================================
    // STEP 2: VERIFY TOKEN
    // ========================================
    // jwt.verify() does two things:
    // 1. Checks if token is valid (correct signature)
    // 2. Checks if token is not expired
    // 3. Returns decoded payload if valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ========================================
    // STEP 3: ATTACH USER ID TO REQUEST
    // ========================================
    // The decoded token contains: { userId: "...", iat: ..., exp: ... }
    // We extract userId and attach it to req object
    // Now route handlers can access req.user to get logged-in user's ID
    req.user = decoded.userId;

    // ========================================
    // STEP 4: PROCEED TO NEXT MIDDLEWARE/ROUTE
    // ========================================
    // Authentication successful, continue to route handler
    next();

  } catch (error) {
    // ========================================
    // ERROR HANDLING
    // ========================================
    // Token verification failed (invalid or expired)
    console.error('Auth middleware error:', error.message);
    
    return res.status(401).json({ 
      message: 'Invalid or expired token. Please login again.' 
    });
  }
};

module.exports = authMiddleware;