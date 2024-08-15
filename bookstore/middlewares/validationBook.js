// Desc: Middleware for validating book data

function validationBook(postbody, next) {

    next();
}

module.exports = {
    function: validationBook,
    needProtocolRef: false,
    params: [
        '_protocolRef.request.data'
    ]
}