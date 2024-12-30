const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    metatitle: { type: String },
    metadescription: { type: String },
    keywords: { type: [String], required: true }, // Keywords field (Array of strings)
    featureimage: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User
});

module.exports = mongoose.model('Post', postSchema);
