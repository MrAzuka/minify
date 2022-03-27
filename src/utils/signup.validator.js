import Joi from 'joi';

const schema = Joi.object().keys({
  full_name: Joi.string().required(),
  // password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

// joi schema
const validateSignup = (full_name,email, password) => Joi.validate(
    { full_name,email, password}, schema, {abortEarly: false}
  );

const validateSignin = (email, password) => Joi.validate(
    { email, password}, schema, {abortEarly: false}
  );
export {validateSignin, validateSignup};