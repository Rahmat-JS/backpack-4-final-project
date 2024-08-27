const axios = require('axios');
const config = require('../configs/auth.config');
const ManualException = require('../utils/error/Exception')

module.exports = class AuthService {
    constructor() {
        this.host = config.global.host;
        this.protocol = config.global.protocol;

        this.user = config.instance.auth.user;
        this.pass = config.instance.auth.pass;
    }

    #getUrl(baseUrl, path) {
        return `${this.protocol}://${baseUrl}/${path}`
    }

    getConfigInfo() {
        return {
            'host': this.host,
            'protocol': this.protocol,
            'user': this.user,
            'pass': this.pass
        }
    }

    async addAuthEntity(user, pass) {
        const headers = {
            'Content-Type': 'application/json',
            'user': this.user,
            'pass': this.pass,
        };
        
        const body = {
            "system": this.user,
            "fields": {
                "username": user,
                "password": pass
            },
            "status": "active"
        };

        try {
            const response = await axios.put(
                this.#getUrl(this.host.authentication, 'service/authentication@7/authEntry'),
                body,
                {headers}
            );
            return response.data?.data;
        } catch(error) {
            if(error.response)
                throw new ManualException(error.response.status,  'There is a problem on the server side, please contact support.', {
                    'message': error.message, 'headers': error.response.headers, 'response data': error.response.data
                });
            else
                throw new ManualException(500, 'There is a problem on the server side, please contact support.', error.message);
        }
    }

    async addToSamad() {

    }

    async assignUserToRole() {

    }

    async login() {

    }

};