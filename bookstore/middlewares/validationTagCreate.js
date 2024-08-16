// Desc: Middleware for validating tag data before creating

function validationTagCreate(postbody, next) {

    next();
}

module.exports = {
    function: validationTagCreate,
    needProtocolRef: false,
    params: [
        '_protocolRef.request.data',
    ]
}