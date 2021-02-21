const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  password: Joi.string(), //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  confirm_password: Joi.ref('password'),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
})
  .with('username', 'email')
  .with('password', 'confirm_password');

// schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// -> { value: {}, error: '"username" is required' }

module.exports = schema;
