// Desc: Middleware for validating book data before creating

function validationBookCreate(postbody, postfiles, next) {

    next();
}

module.exports = {
    function: validationBookCreate,
    needProtocolRef: false,
    params: [
        '_protocolRef.request.data',
        '_protocolRef.request.files'
    ]
}