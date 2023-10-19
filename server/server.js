const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const initializePassport = require('./config/passport-config');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
