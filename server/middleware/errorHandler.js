const { errorMessages } = require('../config/errorMessages');

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    const message = errorMessages[err.message] || 'An unexpected error occurred';
    res.status(500).send({ error: message });
}

module.exports = errorHandler;
