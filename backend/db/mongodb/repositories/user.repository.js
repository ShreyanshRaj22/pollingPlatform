// src/db/mongodb/repositories/user.repository.js

const BaseRepository = require('./base.repository');
const User = require('../models/User');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return this.model.findOne({ email });
    }

    // Add more user-specific methods if needed
}

module.exports = new UserRepository();
