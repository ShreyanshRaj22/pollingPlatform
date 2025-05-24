const { createPoll, getAllPolls, getPollById, updatePoll, deletePoll } = require('../db/data-providers/poll.provider');
const { successResponse } = require('../helpers/responseWrapper');

const createNewPoll = async (req, res, next) => {
    try {
        const { options, title, description, settledAt } = req.body;
        if (!Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ message: 'Poll must have at least two options' });
        }
        const formattedOptions = options.map(opt => {
            const text = typeof opt === 'string' ? opt : opt.text;
            return { text, votes: 0 };
        });
        const poll = await createPoll({ title, description, options: formattedOptions, ownerId: req.user.id, settledAt });
        res.status(201).json(successResponse({ status: 201, message: 'Poll created', data: poll }));
    } catch (err) {
        next(err);
    }
};

const getPolls = async (req, res, next) => {
    try {
        const polls = await getAllPolls();
        res.status(200).json(successResponse({ status: 200, message: 'Polls fetched', data: polls }));
    } catch (err) {
        next(err);
    }
};

const getPollDetailById = async (req, res, next) => {
    try {
        const poll = await getPollById(req.params.id);
        if (!poll) return res.status(404).json({ message: 'Poll not found' });
        res.status(200).json(successResponse({ status: 200, message: 'Poll fetched', data: poll }));
    } catch (err) {
        next(err);
    }
};

const updatePollById = async (req, res, next) => {
    try {
        const poll = await updatePoll(req.params.id, req.body, req.user.id);
        if (!poll) return res.status(403).json({ message: 'Unauthorized or poll not found' });
        res.status(200).json(successResponse({ status: 200, message: 'Poll updated', data: poll }));
    } catch (err) {
        next(err);
    }
};

const deletePollById = async (req, res, next) => {
    try {
        const result = await deletePoll(req.params.id, req.user.id);
        if (!result) return res.status(403).json({ message: 'Unauthorized or poll not found' });
        res.status(200).json(successResponse({ status: 200, message: 'Poll deleted' }));
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createNewPoll,
    getPolls,
    getPollDetailById,
    updatePollById,
    deletePollById,
};
