const DBService = require('../database/db');

module.exports = class TagService {

    #dbService;
    constructor() {
        this.#dbService = new DBService();
    }

    async create(data) {
        return this.#dbService.create('tag', data);
    }

    async readAll() {
        return this.#dbService.readAll('tag');
    }

    async readById(id) {
        return this.#dbService.readById('tag', id);
    }

    async delete(id) {
        return this.#dbService.delete('tag', id);
    }

};