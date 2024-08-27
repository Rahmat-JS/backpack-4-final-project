const {
  nameSchema,
  usernameSchema,
  emailSchema,
  passwordSchema
} = require('../../schema/userSchema');

exports.signUp = {
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


exports.login = {
  body: {
      type: 'object',
      properties: {
          username: usernameSchema,
          password: passwordSchema
      },
      required: ["username", "password"], // all of the other fields are optional
      additionalProperties: false
  }
};
