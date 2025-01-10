const express = require('express');
const nodemon = require('nodemon');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const expressLayout=require('express-ejs-layouts');
require('dotenv').config(); // Load environment variables from .env




// Initialize the Express app
const app = express();

// db connetion
const connectDB=require('./server/config/db');
connectDB();

// Define the server port
const PORT = process.env.PORT || 3000;
const path = require('path');

// Serve static files from the 'public/img' folder
app.use('/img', express.static(path.join(__dirname, 'public/img')));

app.use(cookieParser()); // Use cookie-parser middleware


app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.json()); // Parse JSON payloads


// Templating Engine
app.use(expressLayout); // Enable Express Layouts middleware
app.set('layout', './layouts/main'); // Set the default layout
app.set('view engine', 'ejs'); // Set the view engine to EJS


// Static Files
app.use(express.static('public')); // Serve static files like CSS, JS, images


//routes 
const indexRoutes = require('./server/routes/main'); // Update path for main routes
const adminProfile=require('./server/routes/admin');
const loginDashBoard=require('./server/routes/login');
const logout=require('./server/routes/logout');
const createPost=require('./server/routes/createpost');
const listPost=require('./server/routes/listpost');
const editPost=require('./server/routes/edit')
const apiList=require('./server/routes/api')

app.use('/', indexRoutes); // Homepage routes
app.use('/login', loginDashBoard); 
app.use('/admin', adminProfile);
app.use('/logout', logout); // logoutroutes
app.use('/createpost',createPost);
app.use('/listpost',listPost);
app.use('/',editPost);
app.use('/api', apiList);



app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

