const express = require('express');
const db = require('../database');

const router = express.Router();

// Get all surgery rooms
router.get('/', (req, res) => {
    db.query('SELECT * FROM surgery_rooms', (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    });
});

// Add a new surgery room
router.post('/', (req, res) => {
    db.query('INSERT INTO surgery_rooms SET ?', req.body, (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.status(201).json(results);
    });
});

// Update a surgery room by ID
router.put('/:id', (req, res) => {
    db.query('UPDATE surgery_rooms SET ? WHERE room_id = ?', [req.body, req.params.id], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    });
});

// Mark a surgery room as unavailable
router.put('/mark-unavailable/:id', (req, res) => {
    db.query('UPDATE surgery_rooms SET is_available = false WHERE room_id = ?', [req.params.id], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    });
});

// Mark a surgery room as available
router.put('/mark-available/:id', (req, res) => {
    db.query('UPDATE surgery_rooms SET is_available = true WHERE room_id = ?', [req.params.id], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    });
});

// Delete a surgery room by ID
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM surgery_rooms WHERE room_id = ?', [req.params.id], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    });
});

router.post('/:id/block', (req, res) => {
    const roomId = req.params.id;
    const { dates } = req.body; // Assume 'dates' is an array of dates to block

    const values = dates.map(date => [roomId, date]);

    db.query('INSERT INTO room_blocked_dates (room_id, blocked_date) VALUES ?', [values], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.status(201).json(results);
    });
});

// Fetch blocked dates for a specific surgery room
router.get('/:id/blocked-dates', (req, res) => {
    const roomId = req.params.id;
    db.query('SELECT blocked_date FROM room_blocked_dates WHERE room_id = ?', [roomId], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json(results.map(r => r.blocked_date)); // return only the dates
    });
});



module.exports = router;
