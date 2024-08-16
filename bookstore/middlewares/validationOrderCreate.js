// Desc: Middleware for validating order data before creating

function validationOrderCreate(postbody, next) {

    next();
}

module.exports = {
    function: validationOrderCreate,
    needProtocolRef: false,
    params: [
        '_protocolRef.request.data',
    ]
}