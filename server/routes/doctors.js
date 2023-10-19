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
            const doctors = await db.query('SELECT * FROM doctors');
            res.json(doctors);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    .post(checkSchema(doctorSchema), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newDoctor = await db.query('INSERT INTO doctors SET ?', req.body);
            res.status(201).json(newDoctor);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
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
    .put(checkSchema(doctorSchema), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const updatedDoctor = await db.query('UPDATE doctors SET ? WHERE doctor_id = ?', [req.body, req.params.id]);
            res.json(updatedDoctor);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedDoctor = await db.query('DELETE FROM doctors WHERE doctor_id = ?', [req.params.id]);
            res.json(deletedDoctor);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

module.exports = router;
