const jwt = require('jsonwebtoken');
function authenticate(req, res, next) {
    console.log('Cookies:', req.cookies); // Debugging: log cookies
    // Safely access the token
    const token = req.cookies?.token;a
    if (!token) {
        console.log('No token found, redirecting to login.');
        return res.redirect('/login'); // Redirect if no token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.redirect('/login'); // Redirect if token invalid
    }
}
function authorize(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Access Denied');
        }
        next();
    };
}
module.exports = { authenticate, authorize };
