const express = require('express');
const passport = require('passport');

const db = require('../database');
const jwtUtil = require('../utils/jwtUtil');

const verifyToken = require('../middleware/verifyToken');

const router = express.Router();
// Patients Routes
router.route('/patients')
    // GET endpoint for retrieving a list of all patients
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM patients');
            res.json(result[0]);  // Assuming result[0] contains the actual query result
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    // POST endpoint for creating a new patient
    .post(async (req, res) => {
        try {
            const result = await db.query('INSERT INTO patients SET ?', req.body);
            res.status(201).json(result[0]);  // Assuming result[0] contains the actual query result
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

router.route('/patients/:id')
    // GET endpoint for retrieving a specific patient by id
    .get(async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM patients WHERE patient_id = ?', [req.params.id]);
            res.json(result[0]);  // Assuming result[0] contains the actual query result
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    // PUT endpoint for updating a specific patient by id
    .put(async (req, res) => {
        try {
            const result = await db.query('UPDATE patients SET ? WHERE patient_id = ?', [req.body, req.params.id]);
            res.json(result[0]);  // Assuming result[0] contains the actual query result
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    })
    // DELETE endpoint for deleting a specific patient by id
    .delete(async (req, res) => {
        try {
            const result = await db.query('DELETE FROM patients WHERE patient_id = ?', [req.params.id]);
            res.json(result[0]);  // Assuming result[0] contains the actual query result
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });
    
// Exporting the router object to be used in server.js
module.exports = router;
