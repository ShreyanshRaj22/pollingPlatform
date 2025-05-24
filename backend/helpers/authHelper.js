const jwt = require('jsonwebtoken');
const { COOKIE_NAME, JWT_SECRET } = require('../constants/auth');

/**
 * Generates a JWT and sets it in the response cookie.
 * @param {Object} res - Express response object
 * @param {string} userId - MongoDB user ID
 */
const setAuthToken = (res, userId) => {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: process.env.NODE_ENV === 'production',
    });

    return token;
};

module.exports = {
    setAuthToken,
};
