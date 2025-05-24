const formatPolls = (polls, limit = 10) => {
    return polls
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
};

module.exports = {
    formatPolls,
};
