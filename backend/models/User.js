import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Schema Definition
 * Defines the structure and validation rules for user documents
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['manager', 'staff'], // Only allows 'manager' or 'staff' roles
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
 * Pre-save Middleware
 * Hashes the password before saving to the database
 * Only hashes if the password field has been modified
 */
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

/**
 * Password Comparison Method
 * Compares a candidate password with the stored hashed password
 * @param {string} candidatePassword - The password to compare
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
export const User = mongoose.model('User', userSchema); 