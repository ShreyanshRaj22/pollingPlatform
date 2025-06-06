const { handleVote } = require('../../services/feed/vote.service');
const { emitToPollRoom } = require('../utils/socketUtils');

module.exports = (io, socket) => {
    socket.on('vote', async ({ pollId, optionId }) => {
        const updatedPoll = await handleVote(pollId, optionId, socket.user);

        // Notify all users viewing this poll
        emitToPollRoom(io, pollId, 'pollUpdate', updatedPoll);

        // Optionally update general feed too
        io.emit('feedUpdate', { pollId, updated: true });
    });
};
