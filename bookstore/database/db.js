module.exports = class DBService {
    #serverError = {
        data: null,
        message: `There is a problem on the server side, please contact support.`,
        statusCode: 500
    }

    #ItemNotFoundMessage = {
        data: null,
        message: `Item not found`,
        statusCode: 404
    }

    #atlas;
    constructor(atlasInterfaceInDB) {
        this.#atlas = atlasInterfaceInDB;
    }

    async create(table, keysValue, bodyValue) {
        try {
            const result = await this.#atlas.table(table).insert({
                keys: keysValue,
                body: bodyValue
            });
            return {
                data: result,
                message: null,
                statusCode: 200
            }
        } catch (error) {
            return this.#serverError;
        }
    }

    async readAll(table) {
        try {
            // const result = await this.#atlas.table(table).readAll(); // you should edit this line
            // return { data: result, message: null, statusCode: 200 }; // you should edit this line
        } catch (error) {
            return this.#serverError;
        }
    }

    async readById(table, id) {
        try {
            // const item = await this.#atlas.table(table).readById(id); // you should edit this line
            // if (item === null) {
            //     return this.#ItemNotFoundMessage;
            // }
            // return { data: item, message: null, statusCode: 200 }; // you should edit this line
        } catch (error) {
            return this.#serverError;
        }
    }

    async delete(table, id) {
        try {
            // const result = await this.#atlas.table(table).delete(id); // you should edit this line
            // return { data: result, message: null, statusCode: 200 }; // you should edit this line
        } catch (error) {
            return this.#serverError;
        }
    }

}