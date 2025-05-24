module.exports = (io, socket) => {
    socket.on('subscribeToPoll', (pollId) => {
        socket.join(`poll-${pollId}`);
    });

    socket.on('unsubscribeFromPoll', (pollId) => {
        socket.leave(`poll-${pollId}`);
    });
};
