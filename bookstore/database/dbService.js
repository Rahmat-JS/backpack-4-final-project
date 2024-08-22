module.exports = class DBService {

    #customizeListOfOutput(result) {
        return {
            'list': result['body']['data']['result'],
            'count': result['body']['data']['count']
        }
    }

    #customizeOneOutput(result) {
        if(result['body']['data']['result'].length)
            return {
                'item': result['body']['data']['result'][0],
                'status': true
            };
        return {'item': null, 'status': false};
    }

    #customizeOneMessageOutput(result) {
        return result['body']['data']['result']['success'][0];
    }

    #serverError(error = '') {
        return {
            data: null,
            message: `There is a problem on the server side, please contact support.`,
            serverMessage: error, // you should remove it before launching
            statusCode: 500
        }
    }

    #itemNotFoundMessage(item) {
        return {
            data: null,
            message: `${item} not found`,
            statusCode: 404
        }
    }

    #successMessage(dataValue, messageValue = null, statusCodeValue = 200) {
        return {
            data: dataValue,
            message: messageValue,
            statusCode: statusCodeValue
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

    #atlas;
    constructor(atlasInterface) {
        this.#atlas = atlasInterface;
        /* NOTE:
        We could not put the initialize function to create the tables in the
        constructor because it was not possible to call this function as await.
        For this reason, we made a function with a separate route.
        */
    }
    
    async create(table, keysValue, bodyValue) {
        try {
            const result = await this.#atlas.table(table).insert({
                keys: keysValue,
                body: bodyValue
            });
            return this.#successMessage(
                this.#customizeOneMessageOutput(result),
                `${table} created Successfully`,
                201 // status code of create
            );
        } catch (error) {
            return this.#serverError(error.message);
        }
    }
    
    async readAll(table) {
        try {
            const result = await this.#atlas.table(table).select('id', 'keys', 'body').where('*').get();
            const {list, count} = this.#customizeListOfOutput(result);
            return this.#successMessage(list, `${count} item founded`);
        } catch (error) {
            return this.#serverError(error.message);
        }
    }
    
    async readById(table, id) {
        try {
            const result = await this.#atlas.table(table).on('id').where(id).get();
            const {item, status} = this.#customizeOneOutput(result);
            if(!status) {
                return this.#itemNotFoundMessage(table);
            }
            return this.#successMessage(item, `${table} founded successfully`);
        } catch (error) {
            return this.#serverError(error.message);
        }
    }
    
    async readByKey(table, keysValue) {
        try {
            const result = await this.#atlas.table(table).on('keys').where(keysValue).get();
            const {list, count} = this.#customizeListOfOutput(result);
            
            return this.#successMessage(list, `${count} item founded`);
        } catch (error) {
            return this.#serverError(error.message);
        }
    }
    
    async delete(table, id) {
        try {
            const result = await this.#atlas.table(table).on('id').where(id).delete();
            return this.#successMessage(null, `${table} deleted successfully`);
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
            if(result['body']['data']['result']['success'].length == 0) {
                return this.#itemNotFoundMessage(table);
            }
            return this.#successMessage(null, `${table} updated successfully`);
        } catch (error) {
            return this.#serverError(error.message);
        }
    }
    
    async createAllTables() {        
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
            return this.#successMessage(null, 'all tables created successfully');
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