module.exports = class ManualException extends Error {
    constructor(code, message, extraMessage = null) {
        super();
        this.statusCode = code;
        this.message = message;
        this.extraMessage = extraMessage;
        this.isOperational = true;
    }
};