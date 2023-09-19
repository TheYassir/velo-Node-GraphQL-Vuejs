exports.catchErrors = fn => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

exports.notFound = (req, res, next) => {
    const err = new Error('Not Found');

    err.status = 404;

    next(err);
};

// Pas de stack pour la prod
exports.prodErrors = (err, req, res, next) => {
    const status = err.status || 500;
    res.status(status);
    const data = { message: err.message ?? err };

    res.format({
        'application/json': () => {
            res.json(data);
        },
    });
};

// Un stack pour le développement
exports.devErrors = (err, req, res, next) => {
    const status = err.status || 500;
    res.status(status);
    const data = { message: err.message ?? err, stack: err.stack ?? null };

    res.format({
        'application/json': () => {
            res.json(data);
        },
    });
};
