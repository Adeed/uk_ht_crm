const express = require('express');
const db = require('../database');

const router = express.Router();

// Get all payments
router.get('/', async (req, res) => {
    try {
        const payments = await db.query('SELECT * FROM payments');
        res.json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
    try {
        const payment = await db.query('SELECT * FROM payments WHERE payment_id = ?', [req.params.id]);
        res.json(payment);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create new payment
router.post('/', async (req, res) => {
    try {
        const newPayment = await db.query('INSERT INTO payments SET ?', req.body);
        res.status(201).json(newPayment);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update payment
router.put('/:id', async (req, res) => {
    try {
        const updatedPayment = await db.query('UPDATE payments SET ? WHERE payment_id = ?', [req.body, req.params.id]);
        res.json(updatedPayment);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete payment
router.delete('/:id', async (req, res) => {
    try {
        const deletedPayment = await db.query('DELETE FROM payments WHERE payment_id = ?', [req.params.id]);
        res.json(deletedPayment);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
