// Desc: Middleware for validating user data before creating

function validationUserCreate(postbody, next) {

    next();
}

module.exports = {
    function: validationUserCreate,
    needProtocolRef: false,
    params: [
        '_protocolRef.request.data',
    ]
}