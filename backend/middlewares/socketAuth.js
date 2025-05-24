const cookie = require('cookie');
const jwt = require('jsonwebtoken');
// const { getUserById } = require('../db/data-providers/user.provider'); // your data-provider

const socketAuth = async (socket, next) => {
    try {
        const cookies = socket.handshake.headers.cookie;
        if (!cookies) return next(new Error('No cookies provided'));
        const parsedCookies = cookie.parse(cookies);
        const token = parsedCookies.accessToken;
        if (!token) return next(new Error('Access token missing'));

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded:===> ", decoded);
        // const user = await getUserById(decoded.userId);
        // if (!user) return next(new Error('User not found'));

        socket.user = decoded.userId;
        next();
    } catch (err) {
        next(new Error('Unauthorized: ' + err.message));
    }
};

module.exports = socketAuth;
