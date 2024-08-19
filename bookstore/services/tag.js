const DBService = require('../database/db');

module.exports = class TagService {

    #dbService;
    constructor() {
        this.#dbService = new DBService();
    }

    async create(data) {
        const keysValueForDB = [data.name];
		const bodyValueForDB = data;
        return this.#dbService.create('tag', keysValueForDB, bodyValueForDB);
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