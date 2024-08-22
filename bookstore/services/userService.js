module.exports = class UserService {

    #dbService;
    constructor(dbService) {
        this.#dbService = dbService;
    }

    async create(data) {
        const keysValueForDB = ['*', `username_${data.username}`, `email_${data.email}`];
		const bodyValueForDB = data;
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