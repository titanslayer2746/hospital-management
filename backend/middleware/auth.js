import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

// JWT secret key for token verification
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {Error} If token is invalid or user not found
 */
const auth = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error();
        }

        // Verify token and decode user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
            throw new Error();
        }

        // Attach token and user to request object
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

/**
 * Manager Role Middleware
 * Checks if the authenticated user has manager role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {Error} If user is not a manager
 */
const isManager = async (req, res, next) => {
    if (req.user.role !== 'manager') {
        return res.status(403).json({ error: 'Access denied. Manager role required.' });
    }
    next();
};

/**
 * Staff Role Middleware
 * Checks if the authenticated user has staff role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {Error} If user is not staff
 */
const isStaff = async (req, res, next) => {
    if (req.user.role !== 'staff') {
        return res.status(403).json({ error: 'Access denied. Staff role required.' });
    }
    next();
};

export {
    auth,
    isManager,
    isStaff
}