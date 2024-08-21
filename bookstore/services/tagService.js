module.exports = class TagService {

    #dbService;
    constructor(dbService) {
        this.#dbService = dbService;
    }

    async create(data) {
        const keysValueForDB = ['*', `name_${data.name}`];
		const bodyValueForDB = data;
        return this.#dbService.create('tag', keysValueForDB, bodyValueForDB);
    }

    async readAll() {
        return this.#dbService.readAll('tag');
    }

    async readById(id) {
        return this.#dbService.readById('tag', id);
    }

    async update(id, data) {
        const keysValueForDB = ['*', `name_${data.name}`];
		const bodyValueForDB = data;
        return this.#dbService.update('tag', id, keysValueForDB, bodyValueForDB);
    }

    async delete(id) {
        return this.#dbService.delete('tag', id);
    }

    async getId(tagName) { // return id by tag name
        const receivedData = this.#dbService.readAll('tag', [tagName]);
        // TODO
        const id = receivedData;
        return id;
    }

};