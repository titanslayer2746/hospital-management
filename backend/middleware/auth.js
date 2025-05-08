import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

// Middleware to check if user is manager
const isManager = async (req, res, next) => {
    if (req.user.role !== 'manager') {
        return res.status(403).json({ error: 'Access denied. Manager role required.' });
    }
    next();
};

// Middleware to check if user is staff
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