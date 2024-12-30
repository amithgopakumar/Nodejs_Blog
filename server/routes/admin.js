const express = require('express');
const router = express.Router();
const Post = require('../model/post');
const upload = require('../middlewares/upload');
const adminLayout = ('../views/layouts/admin');
const { authenticate } = require('../middlewares/auth'); // Import authenticate middleware

router.get('', authenticate, async (req, res) => {
    console.log('User:', req.user); // Debugging log
    const locals = {
        title: "Admin Dashboard",
        description: "Manage your dashboard"
    };
    try {
        res.render('dashboard/index', { locals, layout: adminLayout });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

