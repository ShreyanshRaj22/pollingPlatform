// src/data-providers/user.provider.js

const userRepo = require('../mongodb/repositories/user.repository');

const createUser = async (data) => {
    return userRepo.create(data);
};

const getUserByEmail = async (email) => {
    return userRepo.findByEmail(email);
};

const getUserById = async (id) => {
    return userRepo.findById(id);
};

const addPollToHistory = async (userId, pollId) => {
    return userRepo.updateById(userId, {
        $push: { history: { pollId } }
    });
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    addPollToHistory
};
