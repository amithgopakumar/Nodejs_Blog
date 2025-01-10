const express = require('express');
const router = express.Router();
const Post = require('../model/post'); // Import the Post model

// API to get the list of posts
router.get('/posts', async (req, res) => {
    try {
        // Fetch all posts and populate the author's name
        const posts = await Post.find().populate('author', 'name email');
        // Send the posts as a JSON response
        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching posts."
        });
    }
});

module.exports = router;
