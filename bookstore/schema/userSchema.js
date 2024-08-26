const idSchema = {
    type: "string",
    pattern: '^[a-z0-9-]+$', // Lowercase letters, numbers, and hyphens
    minLength: 1, // Adjust as needed
    maxLength: 50, // Adjust as needed
    errorMessage: "ID is required contain a-z, 0-9, and -"
};

const nameSchema = {
    type: 'string',
    pattern: '^[a-zA-Z_]+$', // Only letters and _
    minLength: 3,
    maxLength: 20,
    errorMessage: "Name contain a-z, A-Z and between 3 to 20 characters."
};

const usernameSchema = {
    type: 'string',
    pattern: '^[a-zA-Z][a-zA-Z0-9_]{4,19}$', // Starts with a letter, 5-20 characters
    maxLength: 20,
    errorMessage: "Username contain a-z, A-Z, 0-9, _, and between 5 to 20 characters (start with a letter)."
};

const emailSchema = {
    type: 'string',
    format: 'email',
    minLength: 6, // Adjust to your needs
    maxLength: 40,  // Adjust to your needs
    errorMessage: "email must be a valid email address. between 6 to 40 characters"
};

const passwordSchema = {
    type: 'string',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,40}$', // 6-40 characters, at least one lowercase, one uppercase, and one special character
    minLength: 6,
    maxLength: 40,
    errorMessage: "Password must be contain a-z, A-Z, 0-9, !@#$%^&*, and between 6 to 40 characters."
};

const paramsIdSchema = {
    type: "object",
    properties: {
        id: idSchema
    },
    required: ["id"],
    additionalProperties: false
};

module.exports = {
    idSchema,
    nameSchema,
    usernameSchema,
    emailSchema,
    passwordSchema,
    paramsIdSchema
};