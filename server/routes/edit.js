const express = require('express');
const router = express.Router();
const Post = require('../model/post'); // Import Post model
const upload = require('../middlewares/upload');
const adminLayout = ('../views/layouts/admin');
const { authenticate } = require('../middlewares/auth'); // Import authenticate middleware


// Render edit form
router.get('/post/edit/:id',authenticate,async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send("Post not found");

        res.render('dashboard/edit', { post ,layout: adminLayout});
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).send("An error occurred while fetching the post.");
    }
});

// Update post
router.post('/post/edit/:id', async (req, res) => {
    try {
        const { title, body, metatitle, metadescription, keywords } = req.body;

        await Post.findByIdAndUpdate(req.params.id, {
            title,
            body,
            metatitle,
            metadescription,
            keywords: keywords.split(','),
            updatedAt: Date.now()
        });

        res.redirect('dashboard/edit');
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).send("An error occurred while updating the post.");
    }
});
router.get('/post/delete/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("An error occurred while deleting the post.");
    }
});

module.exports = router;