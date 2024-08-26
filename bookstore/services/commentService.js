module.exports = class Comment {

    #dbService;
    constructor(dbService) {
        this.#dbService = dbService;
    }

    async create(data) {
        const keysValueForDB = ['*'];
		const bodyValueForDB = data;
        return await this.#dbService.create('comment', keysValueForDB, bodyValueForDB);
    }

    async readAll() {
        return await this.#dbService.readAll('comment');
    }

    async readById(id) {
        return await this.#dbService.readById('comment', id);
    }

    async published(id, publishedStatus) {
		const commentResponse = await this.readById(id);
        if(commentResponse.statusCode != 200)
            return commentResponse;

        const oldComment = commentResponse['data']['body'];
        oldComment.published = publishedStatus;
        return await this.#dbService.update('comment', id, commentResponse['data']['keys'], oldComment);
    }

    async delete(id) {
        return await this.#dbService.delete('comment', id);
    }

};