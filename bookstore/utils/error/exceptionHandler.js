module.exports = function userExceptionHandler(exception, loader, command) {
    
    // you can log error here ...

    const error = {
        data: {
            message: exception.message
        },    
        statusCode: exception.statusCode
    };

    if(exception.isOperational)
        error.meta = {
            code: "ManualException",
            sourceType: "class",
            sourceName: "utils/error/Exception",
            version: "1.0.0",
        };

    if(exception.extraMessage)
        error.data.serverError = exception.extraMessage;

    return error;
}

