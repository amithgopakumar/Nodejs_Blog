const express = require('express');
const router = express.Router();
const Post=require('../model/post');
const upload = require('../middlewares/upload');

// Define a route for users
router.get('', async (req, res) => {
    const locals = {
        title: "All Things Cricket: Insights, Legends, and Stories",
        description: "Dive into the world of cricket with our blog. Explore stories of legendary players, match insights, and the latest updates in the sport."
     };
    try {
         const data= await Post.find();
         res.render('public/index', {locals,data }); 
    
    }
    catch(error)
    {
        console.log(error)
    }
    
});

// Route to display an individual post
router.get('/post/:slug', async (req, res) => {
    const slug = req.params.slug;

    try {
        const post = await Post.findOne({ slug }); // Find post by slug
        if (!post) {
            return res.status(404).send("Post not found");
        }

        const locals = {
            title: post.metatitle,
            description: post.metadescription
        };

        res.render('public/post', { locals, post });
    } catch (error) {
        console.log("Error Fetching Post:", error);
        res.status(500).send("An error occurred while fetching the post.");
    }
});




module.exports = router;
