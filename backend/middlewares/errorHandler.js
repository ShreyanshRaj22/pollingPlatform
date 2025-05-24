const { errorResponse } = require('../helpers/responseWrapper');

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack || err);

    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const data = err.data || {};

    res.status(status).json(errorResponse({ status, message, data }));
};

module.exports = errorHandler;
