module.exports = class DBService {
    #serverError(error = '') {
        return {
            data: null,
            message: `There is a problem on the server side, please contact support.\n"${error}"`,
            statusCode: 500
        }
    }

    #ItemNotFoundMessage = {
        data: null,
        message: `Item not found`,
        statusCode: 404
    }

    #successMessage(dataValue, messageValue = null) {
        return {
            data: dataValue,
            message: messageValue,
            statusCode: 200
        }
    };
    
    async #getTablesNames() {
        try {
            const gettedData = await this.#atlas.getTables();
            const tablesList = gettedData['body']['data']['result'].map(item => item.key);
            return tablesList;
        }
        catch(error) {
            if(error.message == 'Request failed with status code 404') {
                return [];
            }
            throw new Error(error.message);
        }
    }

    async #initial() {        

        try {
            const currentTables = await this.#getTablesNames();
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
    }

    #atlas;
    constructor(atlasInterface) {
        this.#atlas = atlasInterface;
        this.#initial(); // for initializing database tables
    }

    async create(table, keysValue, bodyValue) {
        try {
            const result = await this.#atlas.table(table).insert({
                keys: keysValue,
                body: bodyValue
            });
            // TODO
            return this.#successMessage(result);
        } catch (error) {
            return this.#serverError(error.message);
        }
    }

    async readAll(table) {
        try {
            const result = await this.#atlas.table(table).select('id', 'keys', 'body').where('*').get();
            return this.#successMessage(result);
        } catch (error) {
            return this.#serverError(error.message);
        }
    }

    async readById(table, id) {
        try {
            const result = await this.#atlas.table(table).on('id').where(id).get();
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
            return this.#successMessage(result);
        } catch (error) {
            return this.#serverError(error.message);
        }
    }


    async getAllTables() {
        try {
            const result = await this.#getTablesNames();
            return this.#successMessage(result);
        } catch(error) {
            return this.#serverError(error.message);
        }
    }

    async dropAllTables() {
        try {
            const tableNames = await this.#getTablesNames();
            tableNames.forEach(async(table) => {
                this.#atlas.dropTable({
                    'name': table,
                    'type': 'data'
                })
            });
            return this.#successMessage(null, 'all tables deleted successfully');
        } catch(error) {
            return this.#serverError(error.message);
        }
    }
}