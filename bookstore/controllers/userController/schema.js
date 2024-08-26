const {
    idSchema,
    nameSchema,
    usernameSchema,
    emailSchema,
    passwordSchema,
    paramsIdSchema
} = require('../../schema/userSchema');

exports.create = {
    body: {
        type: 'object',
        properties: {
            firstName: nameSchema,
            lastName: nameSchema,
            username: usernameSchema,
            email: emailSchema,
            password: passwordSchema
        },
        required: ["username", "email", "password"], // firstName and lastName are optional
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
            firstName: nameSchema,
            lastName: nameSchema,
            username: usernameSchema,
            email: emailSchema,
            password: passwordSchema
        },
        required: ["id"], // all of the other fields are optional
        additionalProperties: false
    }
};

exports.delete = {
    params: paramsIdSchema
};

exports.ordersByUserId = {
    params: paramsIdSchema
};