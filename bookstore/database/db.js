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
        async function getTablesNames() {
            const gettedData = await this.#atlas.getTables();
            const tablesList = gettedData['body']['data']['result'].map(item => item.key);
            return tablesList;
        }

        try {
            currentTables = await getTablesNames();
            const usageTables = ['tag', 'comment', 'user', 'book', 'order'];
            usageTables.forEach(async (table) => {
                if(!currentTables.includes(table)) {
                    this.#atlas.createTable({
                        "name": table,
                        "type": "data"
                      })
                }
                else {
                    console.log(`${table} table already exists!`);
                }
            });
        } catch (err) {
            console.log(err.message);
        }

        // const message = await atlas.createTable({
        // const currentTables = [];
        // gettedData.data.body.data.result.forEach(element => currentTables.push(element));
        // usageTables.forEach(async (table) => {
                    // table,
        //             data
        //         });
        //         console.log(message);
        //     }
        //     else {
                // console.log(`${table} has created before!`);
            // }
        // });
    }

    #atlas;
    constructor(atlasInterface) {
        this.#atlas = atlasInterface;
        this.#initial(); // for initializing database tables
    }

    async create(table, keysValue, bodyValue) {
        try {
            const gettedData = await this.#atlas.getTables();
            const result = {
                '1': gettedData['body'],
                '2': second
            }
            // const result = await this.#atlas.table(table).insert({
            //     keys: keysValue,
            //     body: bodyValue
            // });
            // const result = 'Hey, We done it';
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