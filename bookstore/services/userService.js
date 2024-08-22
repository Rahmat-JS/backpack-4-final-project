module.exports = class UserService {

    #dbService;
    constructor(dbService) {
        this.#dbService = dbService;
    }

    async create(data) {
        const keysValueForDB = ['*', `username_${data.username}`, `email_${data.email}`];
		const bodyValueForDB = data;

        const duplicateUserByUsername = await this.#dbService.readByKey('user', `username_${data.username}`)
        const duplicateUserByEmail = await this.#dbService.readByKey('user', `email_${data.email}`)
        if(duplicateUserByUsername['data'].length + duplicateUserByEmail['data'].length != 0)
            return {
                data: null,
                message: `username or email was already exist!`,
                statusCode: 409 // status code of duplicate
            }

        return this.#dbService.create('user', keysValueForDB, bodyValueForDB);
    }

    async readAll() {
        return this.#dbService.readAll('user');
    }

    async readById(id) {
        return this.#dbService.readById('user', id);
    }

    async update(id, data) {
        const keysValueForDB = ['*', `username_${data.username}`, `email_${data.email}`];
		const bodyValueForDB = data;

        const duplicateUserByUsername = await this.#dbService.readByKey('user', `username_${data.username}`)
        const duplicateUserByEmail = await this.#dbService.readByKey('user', `email_${data.email}`)
        let isExist = false;
        if(duplicateUserByUsername['data'].length && duplicateUserByUsername['data'][0]['id'] != id)
            isExist = true;
        if(duplicateUserByEmail['data'].length && duplicateUserByEmail['data'][0]['id'] != id)
            isExist = true;
        if(isExist) return {
            data: null,
            message: `username or email was already exist!`,
            statusCode: 409 // status code of duplicate
        }

        return this.#dbService.update('user', id, keysValueForDB, bodyValueForDB); 
    }

    async delete(id) {
        return this.#dbService.delete('user', id);
    }

    async addOrder(userId, orderId) {
        const user = this.#dbService.readById('user', userId);

        // TODO: if user not found return 404

        user.orders.push(orderId);
        return this.#dbService.update('user', user)
    }

};