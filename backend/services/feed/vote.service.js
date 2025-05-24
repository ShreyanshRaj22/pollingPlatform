const Poll = require('../../db/mongodb/models/Poll');
const User = require('../../db/mongodb/models/User');
const mongoose = require('mongoose');

// Not used data providers for thread safety

const handleVote = async (pollId, optionId, userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const poll = await Poll.findById(pollId).session(session);
        if (!poll) throw new Error('Poll not found');

        const user = await User.findById(userId).session(session);
        if (!user) throw new Error('User not found');

        const historyEntry = user.history.find(h => h.pollId.toString() === pollId);
        const hasVotedBefore = !!historyEntry;

        // Revert previous vote if already voted
        if (hasVotedBefore) {
            const previousOptionIndex = poll.options.findIndex((opt, idx) => {
                const votedOpt = poll.options[idx];
                return votedOpt._id.equals(historyEntry.optionId);
            });

            if (previousOptionIndex !== -1) {
                poll.options[previousOptionIndex].votes -= 1;
            }

            // Update user's vote history
            historyEntry.optionId = optionId;
            historyEntry.votedAt = new Date();
        } else {
            // New vote entry in user history
            user.history.push({
                pollId,
                optionId,
                votedAt: new Date(),
            });
        }

        // Add vote to the new option
        const newOption = poll.options.id(optionId);
        if (!newOption) throw new Error('Option not found');
        newOption.votes += 1;

        await poll.save({ session });
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        return poll;
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
};

module.exports = {
    handleVote,
};
