const crypto = require('crypto');
const argon2 = require('argon2');

module.exports = class UtilsService {
    
    constructor() {}
    
    async getUUID() {
        const uuid = crypto.randomUUID();
        return uuid; // Output: e.g., 'c9841358-d044-4b01-9b54-06b84d92d2c0'
    }
    
    async hashPassword(password) {
      const hash = await argon2.hash(password);
      return hash; // output: e.g., '$argon2id$v=19$m=4096,t=3,p=1$Z3JlZ29y$3Q6
    }
    
    async comparePasswords(hashedPassword, password) {
      const isMatch = await argon2.verify(hashedPassword, password);
      return isMatch;
    }

};