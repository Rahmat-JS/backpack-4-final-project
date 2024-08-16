// Desc: Middleware for validating book data before updating

function validationBookUpdate(putbody, putfiles, next) {

    next();
}

module.exports = {
    function: validationBookUpdate,
    needProtocolRef: false,
    params: [
        '_protocolRef.request.data',
        '_protocolRef.request.files'
    ]
}