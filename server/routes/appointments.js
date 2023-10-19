const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const db = require('../database');

const router = express.Router();

const appointmentSchema = {
    patient_id: {
        in: ['body'],
        isInt: true,
        notEmpty: true,
        errorMessage: 'Patient ID is required'
    },
    consultant_id: {
        in: ['body'],
        isInt: true,
        optional: { options: { nullable: true } },
        errorMessage: 'Consultant ID should be an integer'
    },
    doctor_id: {
        in: ['body'],
        isInt: true,
        optional: { options: { nullable: true } },
        errorMessage: 'Doctor ID should be an integer'
    },
    treatment_id: {
        in: ['body'],
        isInt: true,
        optional: { options: { nullable: true } },
        errorMessage: 'Treatment ID should be an integer'
    },
    appointment_date: {
        in: ['body'],
        isISO8601: true,
        notEmpty: true,
        errorMessage: 'Appointment date is required'
    },
    appointment_status: {
        in: ['body'],
        isIn: {
            options: [['Scheduled', 'Completed', 'Cancelled']],
        },
        notEmpty: true,
        errorMessage: 'Appointment status is required'
    },
};

router.route('/')
    .get(async (req, res) => {
        try {
            const appointments = await db.query('SELECT * FROM appointments');
            res.json(appointments);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    .post(checkSchema(appointmentSchema), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newAppointment = await db.query('INSERT INTO appointments SET ?', req.body);
            res.status(201).json(newAppointment);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            const appointment = await db.query('SELECT * FROM appointments WHERE appointment_id = ?', [req.params.id]);
            res.json(appointment);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    .put(checkSchema(appointmentSchema), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const updatedAppointment = await db.query('UPDATE appointments SET ? WHERE appointment_id = ?', [req.body, req.params.id]);
            res.json(updatedAppointment);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedAppointment = await db.query('DELETE FROM appointments WHERE appointment_id = ?', [req.params.id]);
            res.json(deletedAppointment);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

module.exports = router;
