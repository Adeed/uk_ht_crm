const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const db = require('../database');

const router = express.Router();

const userSchema = {
    username: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Username is required'
    },
    password: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'Password is required'
    },
    email: {
        in: ['body'],
        isEmail: true,
        notEmpty: true,
        errorMessage: 'Valid email is required'
    },
    role: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        custom: {
            options: (value) => {
                return ['Admin', 'Consultant', 'Doctor'].includes(value);
            },
            errorMessage: 'Role must be one of: Admin, Consultant, Doctor'
        },
    },
};

router.route('/')
    .get((req, res) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) return res.status(500).send('Server Error');
            res.json(results);
        });
    })
    .post(checkSchema(userSchema), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const newUser = req.body;
        db.query('INSERT INTO users SET ?', newUser, (err, results) => {
            if (err) return res.status(500).send('Server Error');
            res.json({ id: results.insertId });
        });
    });

router.route('/:id')
    .get((req, res) => {
        const userId = req.params.id;
        db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
            if (err) return res.status(500).send('Server Error');
            res.json(results[0]);
        });
    })
    .put(checkSchema(userSchema), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const userId = req.params.id;
        const updatedUser = req.body;
        db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (err, results) => {
            if (err) return res.status(500).send('Server Error');
            res.json({ message: 'User updated successfully' });
        });
    })
    .delete((req, res) => {
        const userId = req.params.id;
        db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
            if (err) return res.status(500).send('Server Error');
            res.json({ message: 'User deleted successfully' });
        });
    });

// Removed the login route since it involves authentication using passport and jwt, which we temporarily removed.

module.exports = router;
