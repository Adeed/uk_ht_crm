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
    patient_treatment_id: {
        in: ['body'],
        isInt: true,
        optional: { options: { nullable: true } },
        errorMessage: 'Patient Treatment ID should be an integer'
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
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await db.query('INSERT INTO appointments SET ?', req.body);
            res.status(201).json({ message: "Appointment created successfully!" });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM appointments WHERE appointment_id = ?', [req.params.id]);
            const appointment = result[0]; // Assuming you're using a library like MySQL for Node.js
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

router.get('/count', (req, res) => {
    const date = req.query.date;
    // Wrap the db.query call in a new Promise
    new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) as count FROM appointments WHERE DATE(appointment_date) = ?', [date], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    })
        .then(results => {
            // Assuming results is an array with one object containing the count
            res.json({ count: results[0].count });
        })
        .catch(err => {
            console.error(err.message || err);
            // Send a generic error message to avoid exposing details
            res.status(500).json({ error: 'Server Error' });
        });
});

// surery room availability by date

router.get('/available-rooms/:date', (req, res) => {
    const date = req.params.date;

    // Get all rooms from the database
    const allRoomsQuery = `SELECT room_id FROM surgery_rooms WHERE is_available = 1`; // Adjust this query based on your table name and structure

    // Get rooms that are blocked for the given date
    const blockedRoomsQuery = `SELECT room_id FROM room_blocked_dates WHERE blocked_date = ?`;

    // Get rooms that are already booked for the given date
    const bookedRoomsQuery = `SELECT room_id FROM appointments WHERE appointment_date = ?`;

    db.query(allRoomsQuery, (err, allRooms) => {
        if (err) return res.status(500).send(err);

        db.query(blockedRoomsQuery, [date], (err, blockedRooms) => {
            if (err) return res.status(500).send(err);

            db.query(bookedRoomsQuery, [date], (err, bookedRooms) => {
                if (err) return res.status(500).send(err);

                const unavailableRooms = [...blockedRooms, ...bookedRooms].map(room => room.room_id);
                const availableRooms = allRooms.filter(room => !unavailableRooms.includes(room.room_id));

                res.json(availableRooms);
            });
        });
    });
});

module.exports = router;
