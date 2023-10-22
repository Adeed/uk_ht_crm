function authorize(roles) {
    return (req, res, next) => {
        if (req.user && roles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).send('Forbidden');
        }
    };
}

module.exports = authorize;