const contentSchema = {
    type: 'string',
    minLength: 1,  // Minimum 1 characters
    maxLength: 2000, // Maximum 2000 characters to avoid excessive length
    errorMessage: "Summary must be a string between 1 to 2000 characters."
};

const trueFalseSchema = {
    type: 'string',
    enum: ['true', 'false'],
    errorMessage: "this input must be a string either 'true' or 'false'."
};

module.exports = {
    contentSchema,
    trueFalseSchema
};