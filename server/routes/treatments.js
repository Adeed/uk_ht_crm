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
            const treatments = await db.query('SELECT * FROM treatments');
            res.json(treatments);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    .post(checkSchema(treatmentSchema), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newTreatment = await db.query('INSERT INTO treatments SET ?', req.body);
            res.status(201).json(newTreatment);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            const treatment = await db.query('SELECT * FROM treatments WHERE treatment_id = ?', [req.params.id]);
            res.json(treatment);
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

        try {
            const updatedTreatment = await db.query('UPDATE treatments SET ? WHERE treatment_id = ?', [req.body, req.params.id]);
            res.json(updatedTreatment);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedTreatment = await db.query('DELETE FROM treatments WHERE treatment_id = ?', [req.params.id]);
            res.json(deletedTreatment);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

module.exports = router;
