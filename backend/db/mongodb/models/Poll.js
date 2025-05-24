const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
});

const PollSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        options: {
            type: [OptionSchema],
            validate: [arrayLimit, '{PATH} must have at least two options'],
        },
        settledAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

function arrayLimit(val) {
    return val.length >= 2;
}

module.exports = mongoose.model('Poll', PollSchema);
