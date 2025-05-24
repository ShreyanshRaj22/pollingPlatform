// src/data-providers/poll.provider.js

const pollRepo = require('../mongodb/repositories/poll.repository');

const createPoll = async (data) => {
    return pollRepo.create(data);
};

const getPollById = async (id) => {
    return pollRepo.findById(id);
};

const getPollsByUser = async (userId) => {
    return pollRepo.findAll({ ownerId: userId });
};

const getAllPolls = async () => {
    return pollRepo.findAll();
};

const updatePoll = async (pollId, data, userId) => {
    const poll = await pollRepo.findOne({ _id: pollId, ownerId: userId });
    if (!poll) return null;
    Object.assign(poll, data);
    return await poll.save();
};

const deletePoll = async (pollId, userId) => {
    return pollRepo.deleteOne({ _id: pollId, ownerId: userId });
};

module.exports = {
    createPoll,
    getPollById,
    getPollsByUser,
    getAllPolls,
    updatePoll,
    deletePoll
};
