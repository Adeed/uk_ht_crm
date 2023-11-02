const express = require('express');
const db = require('../database');
const CircularJSON = require('circular-json');

const router = express.Router();

// Get all payments
router.get('/', async (req, res) => {
    try {
        const payments = await db.query('SELECT * FROM payments');
        res.json(CircularJSON.stringify(payments));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
    try {
        const payment = await db.query('SELECT * FROM payments WHERE payment_id = ?', [req.params.id]);
        res.json(CircularJSON.stringify(payment));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create new payment
router.post('/', async (req, res) => {
    try {
        const newPayment = await db.query('INSERT INTO payments SET ?', req.body);
        res.status(201).json(CircularJSON.stringify(newPayment));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update payment
router.put('/:id', async (req, res) => {
    try {
        const updatedPayment = await db.query('UPDATE payments SET ? WHERE payment_id = ?', [req.body, req.params.id]);
        res.json(CircularJSON.stringify(updatedPayment));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete payment
router.delete('/:id', async (req, res) => {
    try {
        const deletedPayment = await db.query('DELETE FROM payments WHERE payment_id = ?', [req.params.id]);
        res.json(CircularJSON.stringify(deletedPayment));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
