const { check, validationResult } = require('express-validator');

const validateEmailAndPassword = [
    check('password', 'Password is required')
        .exists()
        .trim()
        .escape()
        .isLength({ min: 5 })
        .withMessage('Attention à votre mot de passe'),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(errors.array());
        }
        next();
    },
];

module.exports = validateEmailAndPassword;
