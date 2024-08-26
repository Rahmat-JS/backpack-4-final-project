const { idSchema, paramsIdSchema } = require('../../schema/userSchema');
const { contentSchema, publishedSchema } = require('../../schema/commentSchema');

exports.leaveComment = {
    body: {
        type: 'object',
        properties: {
            userId: idSchema,
            bookId: idSchema,
            content: contentSchema
        },
        required: ['userId', 'bookId', 'content'],
        additionalProperties: false
    }
};

exports.getAllComments = {}; // no validation needed

exports.getCommentById = {
    params: paramsIdSchema
};

exports.publishedComment = {
    body: {
        type: 'object',
        properties: {
            id: idSchema,
            published: publishedSchema 
        },
        required: ['id', 'published'],
        additionalProperties: false
    }
};

exports.delete = {
    params: paramsIdSchema
};