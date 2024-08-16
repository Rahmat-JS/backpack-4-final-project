// Desc: Middleware for validating comment data before creating

function validationCommentCreate(postbody, next) {

    next();
}

module.exports = {
    function: validationCommentCreate,
    needProtocolRef: false,
    params: [
        '_protocolRef.request.data',
    ]
}