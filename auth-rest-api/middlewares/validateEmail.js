const { check, validationResult } = require('express-validator');

const validateEmail = [
    check('email', 'Email must be valid').exists().trim().isEmail(),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(errors.array());
        }
        next();
    },
];

module.exports = validateEmail;
