const {
    idSchema,
    nameSchema,
    paramsIdSchema
} = require('../../schema/userSchema');

exports.create = {
    body: {
        type: 'object',
        properties: {
            name: nameSchema
        },
        required: ['name'],
        additionalProperties: false
    }
};

exports.readAll = {}; // no validation needed

exports.readById = {
    params: paramsIdSchema
};

exports.update = {
    body: {
        type: 'object',
        properties: {
            id: idSchema,
            name: nameSchema
        },
        required: ['id', 'name'],
        additionalProperties: false
    }
};

exports.delete = {
    params: paramsIdSchema
};