const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const db = require('../database');

const router = express.Router();

const doctorSchema = {
    first_name: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'First name is required'
    },
    last_name: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Last name is required'
    },
    email: {
        in: ['body'],
        isEmail: true,
        errorMessage: 'Valid email is required'
    },
    phone: {
        in: ['body'],
        isString: true,
        optional: { options: { nullable: true } },
        errorMessage: 'Phone number must be a string'
    },
};

router.route('/')
    .get(async (req, res) => {
        try {
            db.query('SELECT * FROM doctors', (err, results) => {
                if (err) {
                    console.error("Database Error:", err);
                    return res.status(500).send('Server Error');
                }
                res.json(results);
            });
        } catch (err) {
            console.error("Unexpected Error:", err);
            res.status(500).send('Server Error');
        }
    })

    .post(checkSchema(doctorSchema), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        db.query('INSERT INTO doctors SET ?', req.body, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            // Send back the ID of the newly created doctor
            res.status(201).json({ id: results.insertId });
        });
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            const doctor = await db.query('SELECT * FROM doctors WHERE doctor_id = ?', [req.params.id]);
            res.json(doctor);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    
    .put(checkSchema(doctorSchema), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        db.query('UPDATE doctors SET ? WHERE doctor_id = ?', [req.body, req.params.id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            // Send back a simple success message
            res.json({ message: 'Doctor updated successfully' });
        });
    })

    .delete((req, res) => {
        db.query('DELETE FROM doctors WHERE doctor_id = ?', [req.params.id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            // Send back a simple success message
            res.json({ message: 'Doctor deleted successfully' });
        });
    });

module.exports = router;
