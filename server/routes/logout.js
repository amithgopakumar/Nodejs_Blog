const express = require('express');
const router = express.Router();
const User = require('../model/user'); // Import your User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // For password hashing

router.get('', (req, res) => {
    // Clear the JWT cookie
    res.clearCookie('token');
    // Redirect to the home page
    res.redirect('/');
});


module.exports = router;

