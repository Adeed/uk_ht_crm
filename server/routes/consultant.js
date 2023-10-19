const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const db = require('../database');

const router = express.Router();

const consultantSchema = {
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
            const consultants = await db.query('SELECT * FROM consultants');
            res.json(consultants);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    .post(checkSchema(consultantSchema), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newConsultant = await db.query('INSERT INTO consultants SET ?', req.body);
            res.status(201).json(newConsultant);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            const consultant = await db.query('SELECT * FROM consultants WHERE consultant_id = ?', [req.params.id]);
            res.json(consultant);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    .put(checkSchema(consultantSchema), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const updatedConsultant = await db.query('UPDATE consultants SET ? WHERE consultant_id = ?', [req.body, req.params.id]);
            res.json(updatedConsultant);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedConsultant = await db.query('DELETE FROM consultants WHERE consultant_id = ?', [req.params.id]);
            res.json(deletedConsultant);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

module.exports = router;
