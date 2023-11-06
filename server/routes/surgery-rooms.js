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

// Add a new surgery room with validation
router.post('/', (req, res) => {
    const roomName = req.body.name;
    // Check if the room name already exists
    db.query('SELECT * FROM surgery_rooms WHERE name = ?', [roomName], (error, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: "Room name already exists." });
        }

        db.query('INSERT INTO surgery_rooms SET ?', req.body, (error, results) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).send('Server Error');
            }
            res.status(201).json(results);
        });
    });
});

// Update a surgery room by ID with validation
router.put('/:id', (req, res) => {
    const roomId = req.params.id;

    if (req.body.is_available !== undefined) {
        // Validate 'is_available'
        if (typeof req.body.is_available !== 'boolean') {
            return res.status(400).json({ message: "Invalid availability status." });
        }
    }

    db.query('UPDATE surgery_rooms SET ? WHERE room_id = ?', [req.body, roomId], (error, results) => {
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

    // Validation: Ensure the dates are in the future
    const currentDate = new Date().toISOString().split('T')[0];
    if (dates.some(date => date < currentDate)) {
        return res.status(400).json({ message: "Invalid date. Can't block past dates." });
    }

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

// Unblock a specific date for a room
router.delete('/:id/unblock/:date', (req, res) => {
    const roomId = req.params.id;
    const dateToUnblock = req.params.date;
    db.query('DELETE FROM room_blocked_dates WHERE room_id = ? AND blocked_date = ?', [roomId, dateToUnblock], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    });
});


module.exports = router;
