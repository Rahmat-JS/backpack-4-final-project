const { paramsIdSchema } = require('../../schema/userSchema');

exports.readById = {
    params: paramsIdSchema
};

exports.delete = {
    params: paramsIdSchema
};

exports.getComments = {
    params: paramsIdSchema
};