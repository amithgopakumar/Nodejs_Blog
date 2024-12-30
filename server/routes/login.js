const express = require('express');
const router = express.Router();
const User = require('../model/user'); // Import your User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // For password hashing

router.get('/', async (req, res) => {
    const locals = {
        title: "Login Page",
        description: "Login to your account"
    };
    try {
        res.render('public/login', { locals, layout: '../views/layouts/main' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set token in cookies
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/admin'); // Redirect to admin page
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});



module.exports = router;


