const express = require('express');
const passport = require('passport');

const db = require('../database');
const jwtUtil = require('../utils/jwtUtil');

const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Define your routes for users here...
router.route('/')
    .get(verifyToken, (req, res) => {
        // Here you would query your database to get all users
        db.query('SELECT * FROM users', (err, results) => {
            if (err) throw err;
            res.json(results);
        });
    })
    .post((req, res) => {
        // Here you would handle user registration
        const newUser = req.body;
        db.query('INSERT INTO users SET ?', newUser, (err, results) => {
            if (err) throw err;
            res.json({ id: results.insertId });
        });
    });

router.route('/:id')
    .get(verifyToken, (req, res) => {
        // Here you would query your database to get the user by id
        const userId = req.params.id;
        db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
            if (err) throw err;
            res.json(results[0]);
        });
    })
    .put(verifyToken, (req, res) => {
        // Here you would handle user update
        const userId = req.params.id;
        const updatedUser = req.body;
        db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (err, results) => {
            if (err) throw err;
            res.json({ message: 'User updated successfully' });
        });
    })
    .delete(verifyToken, (req, res) => {
        // Here you would handle user deletion
        const userId = req.params.id;
        db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
            if (err) throw err;
            res.json({ message: 'User deleted successfully' });
        });
    });

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(400).send("No User Exists");
        else {
            req.logIn(user, err => {
                if (err) throw err;
                const token = jwtUtil.generateToken({ id: user.id });
                res.status(200).json({ token });
            });
        }
    })(req, res, next);
});

module.exports = router;  // Fixed the syntax error here
