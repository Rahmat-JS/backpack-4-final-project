module.exports = class OrderService {

    #dbService;
    constructor(dbService) {
        this.#dbService = dbService;
    }

    async create(data) {
        const keysValueForDB = ['*'];
		const bodyValueForDB = data;
        return this.#dbService.create('order', keysValueForDB, bodyValueForDB);
    }

    async readAll() {
        return this.#dbService.readAll('order');
    }

    async readById(id) {
        return this.#dbService.readById('order', id);
    }

    async update(id, data) {
        const keysValueForDB = ['*'];
		const bodyValueForDB = data;
        return this.#dbService.update('order', id, keysValueForDB, bodyValueForDB);
    }

    async delete(id) {
        return this.#dbService.delete('order', id);
    }
};