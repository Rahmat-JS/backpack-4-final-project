module.exports = class BookService {

    #dbService;
    constructor(dbService) {
        this.#dbService = dbService;
    }

    #getTagsForKeys(tags) {
        const tagsForKeys = [];
        tags.forEach((tag) => {
            tagsForKeys.push(`tag_${tag}`);
        });
        return tagsForKeys;
    }

    async create(data, tags) {
        const tagsForKeys = this.#getTagsForKeys(tags);
        const keysValueForDB = ['*', `name_${data.name}`, `author_${data.author}`, ...tagsForKeys];
		const bodyValueForDB = data;
        return await this.#dbService.create('book', keysValueForDB, bodyValueForDB);
    }

    async readAll() {
        return await this.#dbService.readAll('book');
    }

    async readById(id) {
        return await this.#dbService.readById('book', id);
    }

    async update(id, data, tags) {
        const tagsForKeys = this.#getTagsForKeys(tags);
        const keysValueForDB = ['*', `name_${data.name}`, `author_${data.author}`, ...tagsForKeys];
        const bodyValueForDB = data;
        return await this.#dbService.update('book', id, keysValueForDB, bodyValueForDB); 
    }

    async delete(id) {
        return await this.#dbService.delete('book', id);
    }

    async search(searchItems) {
        const keys = [];
        if(searchItems.name) keys.push(`name_${searchItems.name}`);
        if(searchItems.author) keys.push(`author_${searchItems.author}`);
        if(searchItems.tags) {
            searchItems.tags.forEach((tag) => {
                keys.push(`tag_${tag}`);
            });
        }
        return await this.#dbService.readByKey('book', keys);
    }

    async addComment(bookId, commentId) {
        const bookResponse = await this.readById(bookId);
        const book = bookResponse['data']['body'];
        book.comments.push(commentId);
        return await this.#dbService.update('book', bookId, bookResponse['data']['keys'], book);
    }
};