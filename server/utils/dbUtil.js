const db = require('../database');

const dbUtil = {
    async query(sql, params) {
        try {
            const result = await db.query(sql, params);
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('Database Error');
        }
    }
};

module.exports = dbUtil;
