const express = require('express');
const db = require('../database');
const { checkSchema, validationResult } = require('express-validator');
const { stringify, parse } = require('flatted');  // Import methods for handling circular JSON

const router = express.Router();

// Schema validation for new and updated patient data
const patientSchema = {
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
        optional: { options: { nullable: true } },  // makes field optional
        errorMessage: 'Invalid email address'
    },
    phone: {
        in: ['body'],
        isString: true,
        optional: { options: { nullable: true } },  // makes field optional
        errorMessage: 'Phone number is required'
    },
    consultant_id: {
        in: ['body'],
        isInt: true,
        optional: { options: { nullable: true } },  // makes field optional
        errorMessage: 'Consultant ID should be a number'
    },
    treatment_id: {
        in: ['body'],
        isInt: true,
        optional: { options: { nullable: true } },  // makes field optional
        errorMessage: 'Treatment ID should be a number'
    },
    dob: {
        in: ['body'],
        isDate: true,
        errorMessage: 'Valid date of birth is required'
    },
    address_line1: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Address line 1 is required'
    },
    city: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'City is required'
    },
    state: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'State is required'
    },
    postcode: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Postcode is required'
    },
    gp_name: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'GP name is required'
    },
    nhs_number: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'NHS number is required'
    }
};

const wrapQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

router.route('/')
    .get(
        async (req, res) => {
            try {
                const patients = await wrapQuery('SELECT * FROM patients');
                res.json(patients);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        }
    )
    .post(
        checkSchema(patientSchema),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const result = await wrapQuery('INSERT INTO patients SET ?', [req.body]);
                res.status(201).json(result);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        }
    );

router.route('/patients/:id')
    .get(
        async (req, res) => {
            try {
                const patient = await wrapQuery('SELECT * FROM patients WHERE patient_id = ?', [req.params.id]);
                if (patient.length === 0) {
                    return res.status(404).send('Patient not found');
                }
                res.json(patient[0]);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        }
    )
    .put(
        checkSchema(patientSchema),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const result = await wrapQuery('UPDATE patients SET ? WHERE patient_id = ?', [req.body, req.params.id]);
                res.json(result);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        }
    )
    .delete(
        async (req, res) => {
            try {
                const result = await wrapQuery('DELETE FROM patients WHERE patient_id = ?', [req.params.id]);
                res.json(result);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        }
    );

module.exports = router;
