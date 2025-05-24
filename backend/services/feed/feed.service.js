const { getAllPolls } = require('../../db/data-providers/poll.provider');
const { formatPolls } = require('../../helpers/poll.helper');
const { FEED_POLL_NUMBER } = require("../../constants/poll");

const sendLiveFeed = async () => {
    const allPolls = await getAllPolls();
    return formatPolls(allPolls, FEED_POLL_NUMBER);
};

module.exports = {
    sendLiveFeed,
};
