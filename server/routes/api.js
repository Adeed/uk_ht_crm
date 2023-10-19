const express = require('express');
const db = require('../database');

const patientsRoutes = require('./routes/patients');
const usersRoutes = require('./routes/users');

const router = express.Router();

router.use('/patients', patientsRoutes);
router.use('/users', usersRoutes);
// ...and so on for other resources

module.exports = router;