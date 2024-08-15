module.exports = class Comment {
    #serverError = {
        data: null,
        message: `There is a problem on the server side, please contact support.`,
        statusCode: 500
    }

    #userNotFoundMessage = {
        data: null,
        message: `Item not found`,
        statusCode: 404
    }

    constructor() {}

    async create(data) {

    }


};