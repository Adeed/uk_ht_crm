const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./database');

// api routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// passport auth
const initializePassport = require('./passport-config');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);
app.use(passport.initialize());
app.use(passport.session());

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});