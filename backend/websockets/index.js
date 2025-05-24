const registerFeedHandlers = require('./handlers/feed.handler');
const registerVoteHandlers = require('./handlers/vote.handler');
const registerPollHandlers = require('./handlers/poll.handler');
const socketAuth = require("../middlewares/socketAuth");

module.exports = (io) => {
    io.use(socketAuth);

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        registerFeedHandlers(io, socket);
        registerVoteHandlers(io, socket);
        registerPollHandlers(io, socket);

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
};
