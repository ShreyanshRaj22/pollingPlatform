const express = require('express');
const { createNewPoll,
    getPolls,
    getPollDetailById,
    updatePollById,
    deletePollById, } = require('../controllers/poll.controller');
const requireAuth = require('../middlewares/auth');

const router = express.Router();

router.use(requireAuth);

router.post('/', createNewPoll);
router.get('/', getPolls);
router.get('/:id', getPollDetailById);
router.put('/:id', updatePollById);
router.delete('/:id', deletePollById);

module.exports = router;
