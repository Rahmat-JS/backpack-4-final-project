// Desc: Middleware for validating order data before approval

function validationOrderApproval(putbody, next) {

    next();
}

module.exports = {
    function: validationOrderApproval,
    needProtocolRef: false,
    params: [
        '_protocolRef.request.data',
    ]
}