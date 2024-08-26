const { idSchema } = require('./userSchema');

const booksInformationsSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            id: idSchema,
            count: {
                type: 'number',
                errorMessage: "Number must be a valid number."
            }
        },
        required: ["id", "count"],
        additionalProperties: false,
        errorMessage: "Each object must contain both 'id' and 'count'."
    },
    minItems: 1, // Ensure at least one object is present
    errorMessage: "booksInformations must be a non-empty array of objects with 'id' and 'number'."
};

module.exports = {
    booksInformationsSchema
};