const responseUtil = {
    sendSuccess(res, data) {
        res.status(200).json(data);
    },
    sendError(res, message) {
        res.status(500).json({ error: message });
    },
    // ... other response utility functions
};

module.exports = responseUtil;
