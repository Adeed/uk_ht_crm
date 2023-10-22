const express = require('express');
const db = require('../database');
const { checkSchema, validationResult } = require('express-validator');
const { authorize } = require('../middleware/authorize');
const { roles } = require('../config/accessRoles');

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
};

router.route('/patients')
    .get(
        authorize([roles.Admin, roles.Consultant, roles.Doctor]),
        async (req, res) => {
            try {
                const patients = await db.query('SELECT * FROM patients');
                res.json(patients);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        }
    )
    .post(
        checkSchema(patientSchema),
        authorize([roles.Admin, roles.Consultant]),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const newPatient = await db.query('INSERT INTO patients SET ?', req.body);
                res.status(201).json(newPatient);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        }
    );

router.route('/patients/:id')
    .get(
        authorize([roles.Admin, roles.Consultant, roles.Doctor]),
        async (req, res) => {
            try {
                const patient = await db.query('SELECT * FROM patients WHERE patient_id = ?', [req.params.id]);
                res.json(patient);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        }
    )
    .put(
        checkSchema(patientSchema),
        authorize([roles.Admin]),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const updatedPatient = await db.query('UPDATE patients SET ? WHERE patient_id = ?', [req.body, req.params.id]);
                res.json(updatedPatient);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        }
    )
    .delete(
        authorize([roles.Admin]),
        async (req, res) => {
            try {
                const deletedPatient = await db.query('DELETE FROM patients WHERE patient_id = ?', [req.params.id]);
                res.json(deletedPatient);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        }
    );

module.exports = router;
