// Desc: Middleware for validating of id

function iDvalidation(getparams, next) {

    next();
}

module.exports = {
    function: iDvalidation,
    needProtocolRef: false,
    params: [
        '_protocolRef.params'
    ]
}