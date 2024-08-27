const axios = require('axios');
const config = require('../configs/auth.config');

module.exports = class AuthService {
    constructor() {
        this.host = config.global.host;
        this.protocol = config.global.protocol;

        this.user = config.instance.auth.user;
        this.pass = config.instance.auth.pass;
    }

    getConfigInfo() {
        return {
            'host': this.host,
            'protocol': this.protocol,
            'user': this.user,
            'pass': this.pass
        }
    }

    

};