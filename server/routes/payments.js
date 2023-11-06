const express = require('express');
const db = require('../database');
const CircularJSON = require('circular-json');

const router = express.Router();

// Get all payments
router.get('/payments', async (req, res) => {
    try {
        const payments = await db.query('SELECT * FROM payments');
        res.json(CircularJSON.stringify(payments));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get payment by ID
router.get('/payments/:id', async (req, res) => {
    try {
        const payment = await db.query('SELECT * FROM payments WHERE payment_id = ?', [req.params.id]);
        res.json(CircularJSON.stringify(payment));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create new payment
router.post('/payments', async (req, res) => {
    try {
        const newPayment = await db.query('INSERT INTO payments SET ?', req.body);
        res.status(201).json(CircularJSON.stringify(newPayment));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update payment
router.put('/payments/:id', async (req, res) => {
    try {
        const updatedPayment = await db.query('UPDATE payments SET ? WHERE payment_id = ?', [req.body, req.params.id]);
        res.json(CircularJSON.stringify(updatedPayment));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Track Refund payment
router.put('/payments/:id/refund', async (req, res) => {
    try {
        const updatedPayment = await db.query('UPDATE payments SET is_refunded = 1, refunded_amount = ?, refund_date = NOW() WHERE payment_id = ?', [req.body.refundedAmount, req.params.id]);
        res.json(CircularJSON.stringify(updatedPayment));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete payment
router.delete('/payments/:id', async (req, res) => {
    try {
        const deletedPayment = await db.query('DELETE FROM payments WHERE payment_id = ?', [req.params.id]);
        res.json(CircularJSON.stringify(deletedPayment));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get all payment plans
router.get('/plans', async (req, res) => {
    try {
        const paymentPlans = await db.query('SELECT * FROM PaymentPlan');
        res.json(CircularJSON.stringify(paymentPlans));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get payment plan by ID
router.get('/plans/:id', async (req, res) => {
    try {
        const paymentPlan = await db.query('SELECT * FROM PaymentPlan WHERE payment_plan_id = ?', [req.params.id]);
        res.json(CircularJSON.stringify(paymentPlan));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create new payment plan
router.post('/plans', async (req, res) => {
    try {
        const newPlan = await db.query('INSERT INTO PaymentPlan SET ?', req.body);
        res.status(201).json(CircularJSON.stringify(newPlan));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update payment plan
router.put('/plans/:id', async (req, res) => {
    try {
        const updatedPlan = await db.query('UPDATE PaymentPlan SET ? WHERE payment_plan_id = ?', [req.body, req.params.id]);
        res.json(CircularJSON.stringify(updatedPlan));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete payment plan
router.delete('/plans/:id', async (req, res) => {
    try {
        const deletedPlan = await db.query('DELETE FROM PaymentPlan WHERE payment_plan_id = ?', [req.params.id]);
        res.json(CircularJSON.stringify(deletedPlan));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
