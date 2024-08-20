module.exports = class TagService {

    #dbService;
    constructor(dbService) {
        this.#dbService = dbService;
        const db = dbService;
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

    async getId(tagName) {
        const receivedData = this.#dbService.readAll('tag', [tagName]);

        const id = receivedData;
        return id;
    }

};