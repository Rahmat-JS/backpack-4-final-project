module.exports = class Comment {

    #dbService;
    constructor(dbService) {
        this.#dbService = dbService;
    }

    async create(data) {
        const keysValueForDB = ['*'];
		const bodyValueForDB = data;
        return this.#dbService.create('comment', keysValueForDB, bodyValueForDB);
    }

    async readAll() {
        return this.#dbService.readAll('comment');
    }

    async readById(id) {
        return this.#dbService.readById('comment', id);
    }

    async published(id, publishedStatus) { // TODO: you shoud custom result of readById with decorator
        const keysValueForDB = ['*'];
		const oldBody = this.readById(id).data.body;
        const bodyValueForDB = oldBody.published = publishedStatus;
        return this.#dbService.update('comment', id, keysValueForDB, bodyValueForDB);
    }

    async delete(id) {
        return this.#dbService.delete('comment', id);
    }

};