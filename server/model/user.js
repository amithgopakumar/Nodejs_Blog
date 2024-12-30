const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Add encryption for security
    role: { type: String, enum: ['admin', 'editor', 'user'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);