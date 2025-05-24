// src/db/mongodb/repositories/poll.repository.js

const BaseRepository = require('./base.repository');
const Poll = require('../models/Poll');

class PollRepository extends BaseRepository {
    constructor() {
        super(Poll);
    }

    // Add poll-specific queries if needed
}

module.exports = new PollRepository();
