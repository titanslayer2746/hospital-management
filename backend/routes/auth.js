import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import {User} from '../models/User.js'; 
import { auth } from '../middleware/auth.js';

// JWT secret key for token generation and verification
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Route: POST /api/auth/register
 * Description: Register a new user in the system
 * Request Body: { username, password, email, role }
 * Response: User object and JWT token
 */
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        // Check if user already exists with the same email or username
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user instance
        const user = new User({
            username,
            password,
            email,
            role
        });

        await user.save();

        // Generate JWT token for the new user
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        // Return user data and token
        res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Route: POST /api/auth/login
 * Description: Authenticate user and generate JWT token
 * Request Body: { username, password }
 * Response: User object and JWT token
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        // Return user data and token
        res.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Route: GET /api/auth/me
 * Description: Get current authenticated user's information
 * Middleware: Requires authentication token
 * Response: User object
 */
router.get('/me', auth, async (req, res) => {
    res.json({
        user: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role
        }
    });
});

export default router; 