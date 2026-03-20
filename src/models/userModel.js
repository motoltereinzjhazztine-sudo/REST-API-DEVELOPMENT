const mongoose = require('mongoose');
const brypt = require('bcryptjs');
const roomModel = require('./roomModel');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true, // Validation: No duplicate emails
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters'] // Validation
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager'], // RBAC Roles
        default: 'user'
    }
});

// Pre-save hook to hash password before saving to the database
userSchema.pre('save', async function () {
    // If password is not modified, skip hashing
    if (!this.isModified('password')) return;
        next();
    // Hash the password
    const salt = await brypt.genSalt(10);
    this.password = await brypt.hash(this.password, salt);
});

// Method to compare password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await brypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);