function replaceSpaces(body, next) {
    if(body) {
        if (body.firstName)
            body.firstName = body.firstName.replace(/ /g, '_');
        if (body.lastName)
            body.lastName = body.lastName.replace(/ /g, '_');
        if(body.name)
            body.name = body.name.replace(/ /g, '_');      
    }

    next();
};

module.exports = {
    function: replaceSpaces,
    needProtocolRef: false,
    params: [
        '_protocolRef.request.data',
    ]
}