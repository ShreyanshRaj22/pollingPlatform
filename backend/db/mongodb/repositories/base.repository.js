// src/db/mongodb/repositories/base.repository.js

class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return this.model.create(data);
    }

    async findById(id) {
        return this.model.findById(id);
    }

    async findOne(filter) {
        return this.model.findOne(filter);
    }

    async findAll(filter = {}) {
        return this.model.find(filter);
    }

    async updateById(id, update, options = { new: true }) {
        return this.model.findByIdAndUpdate(id, update, options);
    }

    async deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }
}

module.exports = BaseRepository;
