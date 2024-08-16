const DBService = require('../database/db');

module.exports = class UserService {

    #dbService;
    constructor() {
        this.#dbService = new DBService();
    }

    async create(data) {
        return this.#dbService.create('user', data);
    }

    async readAll(type) {
        return this.#dbService.readAll('user');
    }

    async readById(id) {
        return this.#dbService.readById('user', id);
    }

    async update(data) {
        const deleteResult = this.#dbService.delete('user', data.id);
        if(deleteResult.statusCode === 500) {
            return deleteResult;
        }
        return this.#dbService.create('user', data);
    }

    async delete(id) {
        return this.#dbService.delete('user', id);
    }

};