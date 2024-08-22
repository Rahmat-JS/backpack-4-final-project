module.exports = class TagService {

    #dbService;
    constructor(dbService) {
        this.#dbService = dbService;
    }

    async create(data) {
        const keysValueForDB = ['*', `name_${data.name}`];
		const bodyValueForDB = data;

        const oldTags = await this.#dbService.readByKey('tag', keysValueForDB);
        const isExist = oldTags['data'].length == 0 ? false : true;
        if(isExist) return {
            data: null,
            message: `<${data.name}> was already exist!`,
            statusCode: 409 // status code of duplicate
        }

        return await this.#dbService.create('tag', keysValueForDB, bodyValueForDB);
    }

    async readAll() {
        return await this.#dbService.readAll('tag');
    }

    async readById(id) {
        return await this.#dbService.readById('tag', id);
    }

    async update(id, data) {
        const keysValueForDB = ['*', `name_${data.name}`];
		const bodyValueForDB = data;
        return await this.#dbService.update('tag', id, keysValueForDB, bodyValueForDB);
    }

    async delete(id) {
        return await this.#dbService.delete('tag', id);
    }

    async getId(tagName) {
        const receivedData = await this.#dbService.readByKey('tag', [`name_${tagName}`]);
        if(receivedData['data'].length == 0) {
            const createdDetail =  await this.create({'name': tagName});
            return createdDetail['data']; // return ID of new tag
        }
        return receivedData['data'][0]['id'];
    }

};