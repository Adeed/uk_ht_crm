const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');

const jwtUtil = {
    generateToken(payload) {
        return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    },
    verifyToken(token) {
        return jwt.verify(token, jwtSecret);
    }
};

module.exports = jwtUtil;
