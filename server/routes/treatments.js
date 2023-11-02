const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const db = require('../database');

const router = express.Router();

const treatmentSchema = {
    treatment_name: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Treatment name is required'
    },
    description: {
        in: ['body'],
        isString: true,
        optional: { options: { nullable: true } },
        errorMessage: 'Description must be a string'
    },
    cost: {
        in: ['body'],
        isDecimal: true,
        notEmpty: true,
        errorMessage: 'Cost is required and should be a decimal value'
    },
};

router.route('/')
    .get(async (req, res) => {
        try {
            db.query('SELECT * FROM treatments', (err, results) => {
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

    .post(checkSchema(treatmentSchema), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            db.query('INSERT INTO treatments SET ?', req.body, (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Server Error');
                }
                res.status(201).json(results);
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            db.query('SELECT * FROM treatments WHERE treatment_id = ?', [req.params.id], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Server Error');
                }
                res.json(results);
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })

    .put(checkSchema(treatmentSchema), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log('Update Treatment Data:', req.body); // Log the incoming data
        console.log('Treatment ID to be updated:', req.params.id); // Log the treatment ID

        try {
            db.query('UPDATE treatments SET ? WHERE treatment_id = ?', [req.body, req.params.id], (err, results) => {
                if (err) {
                    console.error('Database Error during Treatment Update:', err); // Log any database error
                    return res.status(500).send('Server Error');
                }
                res.json(results);
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })

    .delete(async (req, res) => {
        console.log('Treatment ID to be deleted:', req.params.id); // Log the treatment ID to be deleted

        try {
            db.query('DELETE FROM treatments WHERE treatment_id = ?', [req.params.id], (err, results) => {
                if (err) {
                    console.error('Database Error during Treatment Deletion:', err); // Log any database error
                    return res.status(500).send('Server Error');
                }
                res.json(results);
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

module.exports = router;
