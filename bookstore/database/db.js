module.exports = class DBService {
    #serverError(error = '') {
        return {
            data: null,
            message: `There is a problem on the server side, please contact support. ${error}`,
            statusCode: 500
        }
    }

    #ItemNotFoundMessage = {
        data: null,
        message: `Item not found`,
        statusCode: 404
    }

    async #initial() {
        const usageTables = ['tag', 'comment', 'user', 'book', 'order'];
        const gettedData = this.#atlas.project('Musa_ku_taghi').getTables();
        // const currentTables = [];
        // gettedData.data.body.data.result.forEach(element => currentTables.push(element));
        // usageTables.forEach(async (table) => {
        //     if(!currentTables.includes(table)) {
        //         const message = await atlas.createTable({
        //             table,
        //             data
        //         });
        //         console.log(message);
        //     }
        //     else {
        //         console.log(`${table} has created before!`);
        //     }
        // });
    }

    #atlas;
    constructor(atlasInterfaceInDB) {
        this.#atlas = atlasInterfaceInDB;
        // this.#initial(); // for initializing database tables
    }

    async create(table, keysValue, bodyValue) {
        try {
            const temp = this.#atlas;
            console.log(temp);
            const result = await this.#atlas.table(table).insert({
                keys: keysValue,
                body: bodyValue
            });
            return {
                data: result,
                message: null,
                statusCode: 200
            }

            // return await this.#atlas.project('Musa_ku_taghi').getTables();
            // return {'message': 'I am here!'}
        } catch (error) {
            return {
                'default': this.#serverError(error.message),
                'second': error.message
            };
        }
    }

    async readAll(table) {
        try {
            // const result = await this.#atlas.table(table).readAll(); // you should edit this line
            // return { data: result, message: null, statusCode: 200 }; // you should edit this line
        } catch (error) {
            return this.#serverError(error.message);
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
            return this.#serverError(error.message);
        }
    }

    async delete(table, id) {
        try {
            // const result = await this.#atlas.table(table).delete(id); // you should edit this line
            // return { data: result, message: null, statusCode: 200 }; // you should edit this line
        } catch (error) {
            return this.#serverError(error.message);
        }
    }

}