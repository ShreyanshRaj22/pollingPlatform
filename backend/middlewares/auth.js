const jwt = require('jsonwebtoken');
const { COOKIE_NAME, JWT_SECRET } = require('../constants/auth');
const { errorResponse } = require('../helpers/responseWrapper');

const requireAuth = (req, res, next) => {
    const token = req.cookies[COOKIE_NAME];
    if (!token) {
        return res.status(401).json(errorResponse({ status: 401, message: 'Unauthorized: No token' }));
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = { id: payload.userId };
        next();
    } catch (err) {
        return res.status(401).json(errorResponse({ status: 401, message: 'Invalid or expired token' }));
    }
};

module.exports = requireAuth;
