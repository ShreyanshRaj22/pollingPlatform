const { sendLiveFeed } = require('../../services/feed/feed.service');

module.exports = (io, socket) => {
    socket.on('joinFeed', async () => {
        const feedData = await sendLiveFeed();
        socket.emit('feedUpdate', feedData);
    });
};
