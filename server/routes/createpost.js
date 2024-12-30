const express = require('express');
const router = express.Router();
const Post = require('../model/post');
const upload = require('../middlewares/upload');
const adminLayout = ('../views/layouts/admin');
const { authenticate } = require('../middlewares/auth'); // Import authenticate middleware

// Render post creation form
router.get('/', authenticate,(req, res) => {
    res.render('dashboard/postcreate', { locals: { title: 'Create a New Post' },layout: adminLayout  });
});

// Handle form submission
router.post('/',authenticate, upload.single('featureimage'), async (req, res) => {
    const { title, body, slug, metatitle, metadescription } = req.body;

    try {
        const featureImagePath = req.file ? `/img/${req.file.filename}` : null;
        const newPost = new Post({
            title,
            body,
            slug,
            metatitle,
            metadescription,
            keywords,
            featureimage: featureImagePath,
            
        });
        await newPost.save();
        res.redirect('/'); // Redirect to the home page after creation
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(400).send('Error creating post');
    }
});

module.exports = router;