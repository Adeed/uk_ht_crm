const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const db = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM patient_treatments', (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    });
});

router.get('/all-patient-treatments', (req, res) => {
    const query = `
            SELECT pt.patient_id, 
            GROUP_CONCAT(CONCAT_WS('|', 
                pt.patient_treatment_id,
                pt.treatment_name,
                pt.no_of_grafts,
                pt.area_of_transplant,
                pt.sessions_agreed
            )) as treatments 
        FROM patient_treatments pt
        GROUP BY pt.patient_id;
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    });
});


// Get all treatments for a specific patient by ID
router.get('/:patientId', (req, res) => {
    const patientId = req.params.patientId;
    db.query('SELECT * FROM patient_treatments WHERE patient_id = ?', [patientId], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    });
});

// Add a new treatment for a patient
router.post('/', (req, res) => {
    console.log('Received data on server:', req.body);

    const {
        patient_id,
        treatment_name,
        no_of_grafts,
        area_of_transplant,
        sessions_agreed,
        final_cost
    } = req.body;

    const query = 'INSERT INTO patient_treatments (patient_id, treatment_name, no_of_grafts, area_of_transplant, sessions_agreed, final_cost) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [patient_id, treatment_name, no_of_grafts, area_of_transplant, sessions_agreed, final_cost];

    console.log('Query:', query);
    console.log('Values:', values);

    db.query(query, values, (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json({ message: "Treatment added successfully!", insertId: results.insertId });
    });
});
router.post('/createTreatmentAndPaymentPlan', async (req, res) => {
    try {
        // Insert into PaymentPlan
        const newPlan = await db.query('INSERT INTO PaymentPlan SET ?', req.body.paymentPlanDetails);
        
        // Get the ID of the inserted payment plan
        const paymentPlanId = newPlan.insertId;

        // Create a new treatment using the payment plan ID
        const treatmentData = {
            ...req.body.treatmentDetails,
            payment_plan_id: paymentPlanId
        };
        const newTreatment = await db.query('INSERT INTO patient_treatments SET ?', treatmentData);

        // Return the results
        res.status(201).json({
            paymentPlan: newPlan,
            treatment: newTreatment
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



// Update a specific treatment by ID
router.put('/:treatmentId', (req, res) => {
    const treatmentId = req.params.treatmentId;
    const treatmentData = req.body;
    db.query('UPDATE patient_treatments SET ? WHERE treatment_id = ?', [treatmentData, treatmentId], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json({ message: "Treatment updated successfully!" });
    });
});

// Delete a specific treatment by ID
router.delete('/:treatmentId', (req, res) => {
    const treatmentId = req.params.treatmentId;
    db.query('DELETE FROM patient_treatments WHERE treatment_id = ?', [treatmentId], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json({ message: "Treatment deleted successfully!" });
    });
});

module.exports = router;
