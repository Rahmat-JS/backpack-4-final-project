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

    #successMessage(dataValue) {
        return {
            data: dataValue,
            message: null,
            statusCode: 200
        }
    };

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
            const result = await this.#atlas.table(table).insert({
                keys: keysValue,
                body: bodyValue
            });
            return this.#successMessage(result);
        } catch (error) {
            return this.#serverError(error.message);
        }
    }

    async readAll(table, keysValue) {
        try {
            // const result = await this.#atlas.table(table).get();
            const result = await this.#atlas.table(table).select('id', 'keys', 'body').on('keys').where(keysValue).get();
            return this.#successMessage(result);
        } catch (error) {
            return this.#serverError(error.message);
        }
    }

    async readById(table, id) {
        try {
            const result = await this.#atlas.table(table).on('id').where(id).get();
            // if(result.length === 0) {
            //     return this.#ItemNotFoundMessage;
            // }
            return this.#successMessage(result);
        } catch (error) {
            return this.#serverError(error.message);
        }
    }

    // async readByKey(table, keysValue) {
    //     try {
    //         const result = await this.#atlas.table(table).on('keys').where(keysValue).get();
    //         return this.#successMessage(result);
    //     } catch (error) {
    //         return this.#serverError(error.message);
    //     }
    // }

    async delete(table, id) {
        try {
            const result = await this.#atlas.table(table).on('id').where(id).delete();
            return this.#successMessage(result);
        } catch (error) {
            return this.#serverError(error.message);
        }
    }

    async update(table, id, keysValue, bodyValue) {
        try {
            const result = await this.#atlas.table(table).on('id').where(id).update({
                keys: keysValue,
                body: bodyValue
            });
            // if(result.length === 0) {
            //     return this.#ItemNotFoundMessage;
            // }
            return this.#successMessage(result);
        } catch (error) {
            return this.#serverError(error.message);
        }
    }
}