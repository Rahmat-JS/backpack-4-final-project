// Desc: Middleware for validating user data before updating

function validationUserUpdate(putbody, next) {

    next();
}

module.exports = {
    function: validationUserUpdate,
    needProtocolRef: false,
    params: [
        '_protocolRef.request.data',
    ]
}