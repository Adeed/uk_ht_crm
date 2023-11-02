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
            db.query('SELECT consultant_id, first_name, last_name, email, phone FROM consultants', (err, results) => {
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
    .post(checkSchema(consultantSchema), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            db.query('INSERT INTO consultants SET ?', req.body, (err, results) => {
                if (err) {
                    console.error("Database Error:", err);
                    return res.status(500).send('Server Error');
                }
                res.status(201).json({ insertId: results.insertId });
            });
        } catch (err) {
            console.error("Unexpected Error:", err);
            res.status(500).send('Server Error');
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            db.query('SELECT * FROM consultants WHERE consultant_id = ?', [req.params.id], (err, results) => {
                if (err) {
                    console.error("Database Error:", err);
                    return res.status(500).send('Server Error');
                }
                res.json(results[0]);
            });
        } catch (err) {
            console.error("Unexpected Error:", err);
            res.status(500).send('Server Error');
        }
    })
    .put(checkSchema(consultantSchema), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            db.query('UPDATE consultants SET ? WHERE consultant_id = ?', [req.body, req.params.id], (err, results) => {
                if (err) {
                    console.error("Database Error:", err);
                    return res.status(500).send('Server Error');
                }
                res.json({ affectedRows: results.affectedRows });
            });
        } catch (err) {
            console.error("Unexpected Error:", err);
            res.status(500).send('Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            db.query('DELETE FROM consultants WHERE consultant_id = ?', [req.params.id], (err, results) => {
                if (err) {
                    console.error("Database Error:", err);
                    return res.status(500).send('Server Error');
                }
                res.json({ affectedRows: results.affectedRows });
            });
        } catch (err) {
            console.error("Unexpected Error:", err);
            res.status(500).send('Server Error');
        }
    });

module.exports = router;
