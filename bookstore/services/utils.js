const crypto = require('crypto');


module.exports = class UtilsService {
    
    constructor() {}
    
    async getUUID() {
        const uuid = crypto.randomUUID();
        return uuid; // Output: e.g., 'c9841358-d044-4b01-9b54-06b84d92d2c0'
    }

};