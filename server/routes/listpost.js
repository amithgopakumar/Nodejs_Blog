const express = require('express');
const router = express.Router();
const Post = require('../model/post'); // Import Post model
const upload = require('../middlewares/upload');
const adminLayout = ('../views/layouts/admin');
const { authenticate } = require('../middlewares/auth'); // Import authenticate middleware

// Route to list all posts
router.get('',authenticate, async (req, res) => {
    try {
        // Fetch all posts from the database and populate the author's name
        const posts = await Post.find().populate('author', 'name');
        const locals = {
            title: "Post Dashboard",
            description: "Manage all your posts here"
        };

        // Render the dashboard view with all posts
        res.render('dashboard/listpost', { locals, posts,layout: adminLayout  });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("An error occurred while fetching posts.");
    }
});

module.exports = router;
