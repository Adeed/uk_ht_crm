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
        errorMessage: 'Appointment datetime is required'
    },
    appointment_time: {
        in: ['body'],
        matches: {
            options: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/], // HH:mm format validation
        },
        notEmpty: true,
        errorMessage: 'Appointment time is required and should be in HH:mm format'
    },
    appointment_status: {
        in: ['body'],
        isIn: {
            options: [['Scheduled', 'Completed', 'Cancelled']],
        },
        notEmpty: true,
        errorMessage: 'Appointment status is required'
    },
    appointment_notes: {
        in: ['body'],
        optional: { options: { nullable: true } },
        errorMessage: 'Appointment Notes should be string'
    },
    room_id: {
        in: ['body'],
        notEmpty: true,
        errorMessage: 'Room ID Error'
    }
};

router.get('/', (req, res) => {
    db.query('SELECT * FROM appointments', (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    });
});


router.route('/')
    .post(checkSchema(appointmentSchema), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(req.body);

            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await db.query('INSERT INTO appointments SET ?', req.body);
            res.status(201).json({ message: "Appointment created successfully!" });
        } catch (err) {
            console.log(req.body);

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
