const jwtUtil = require('../utils/jwtUtil');

function verifyToken(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwtUtil.verifyToken(token);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = verifyToken;
