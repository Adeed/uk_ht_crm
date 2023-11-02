const express = require('express');
const router = express.Router();

// Importing other route handlers
const userRoutes = require('./users');
const patientRoutes = require('./patients');
const doctorRoutes = require('./doctors');
const consultantRoutes = require('./consultants');
const treatmentRoutes = require('./treatments');
const appointmentRoutes = require('./appointments');
const paymentRoutes = require('./payments');
const surgeryRoomsRoutes  = require('./surgery-rooms');

// Assigning route handlers to paths
router.use('/users', userRoutes);
router.use('/patients', patientRoutes);
router.use('/doctors', doctorRoutes);
router.use('/consultants', consultantRoutes);
router.use('/treatments', treatmentRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/payments', paymentRoutes);
router.use('/surgery-rooms', surgeryRoomsRoutes);

// Exporting the router to be used in server.js
module.exports = router;
