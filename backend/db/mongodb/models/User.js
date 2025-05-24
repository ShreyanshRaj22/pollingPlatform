const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    pollId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll',
        required: true,
    },
    votedAt: {
        type: Date,
        default: Date.now,
    },
    // articleId can be added here later
});

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        history: [HistorySchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', UserSchema);
