// Desc: Middleware for validating tag data before updating

function validationTagUpdate(putbody, next) {

    next();
}

module.exports = {
    function: validationTagUpdate,
    needProtocolRef: false,
    params: [
        '_protocolRef.request.data',
    ]
}