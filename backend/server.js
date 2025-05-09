// Import required dependencies
import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import patientsRouter from "./routes/patient.route.js"
import doctorsRouter from "./routes/doctor.route.js"
import appoinmentsRouter from "./routes/appointment.route.js"
import connectDB from './db/index.js';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

// Load environment variables from .env file
dotenv.config({
    path:'./.env',
});

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to the database
connectDB()

// MongoDB connection configuration
mongoose.connect('mongodb://localhost:27017/hospital-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/patients', patientsRouter); // Patient management routes
app.use('/api/doctors', doctorsRouter); // Doctor management routes
app.use('/api/appointments', appoinmentsRouter) // Appointment management routes
app.use('/api/auth', authRoutes); // Authentication routes

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});