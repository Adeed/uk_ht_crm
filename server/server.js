const express = require('express');
const session = require('express-session');

const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const initializePassport = require('./config/passport-config');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
  secret: 'somerandomstring',  // Change 'your-secret-key'
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set secure to true if your app is served over HTTPS
}));

// Passport middleware for authentication
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Importing routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Error handling middleware (Consider moving to a separate file in middleware directory)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
