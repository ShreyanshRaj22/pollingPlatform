const emitToPollRoom = (io, pollId, event, data) => {
    io.to(`poll-${pollId}`).emit(event, data);
};

module.exports = {
    emitToPollRoom,
};
