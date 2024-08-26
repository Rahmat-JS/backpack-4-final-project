const { idSchema, paramsIdSchema } = require('../../schema/userSchema');
const { booksInformationsSchema } = require('../../schema/orderSchema');
const { trueFalseSchema } = require('../../schema/commentSchema');

exports.create = {
    body: {
        type: 'object',
        properties: {
            userId: idSchema,
            booksInformations: booksInformationsSchema
        },
        required: ["userId", "booksInformations"],
        additionalProperties: false
    }
};

exports.readAll = {}; // no validation needed

exports.readById = {
    params: paramsIdSchema
};

exports.approval = {
    body: {
        properties: {
            id: idSchema,
            confirm: trueFalseSchema
        },
        required: ["id", "confirm"],
        additionalProperties: false
    }
};

exports.delete = {
    params: paramsIdSchema
};