import Joi from '@hapi/joi';

const validationObj = (messages) => Joi.string().trim().required().messages(messages);
const joiMessageFunction = (error, req, res, next) => {
  if (error) {
    const { details } = error;
    const message = {};
    details.forEach((d) => {
      message[d.context.key] = d.message;
    });
    return res.status(400).json({ status: 400, error: message });
  }
  return next();
};
const signUp = (req, res, next) => {
  const schema = Joi.object({
    name: validationObj({ 'string.required': 'name is required', 'string.base': 'Invalid type, your name must be a string', 'string.empty': 'Please enter your name' }),
    email: validationObj({ 'string.base': 'Invalid type, your email must be a string', 'string.empty': 'Please enter your email', 'string.email': 'Your email is invalid, please enter a valid email' }).email(),
    profileImg: validationObj({ 'string.required': 'Image is required', 'string.base': 'Invalid type, your image must be a string', 'string.empty': 'Please enter your Image Url' }),
    password: validationObj({ 'string.base': 'Invalid type, your password must be a string', 'string.min': 'password must be at least 8 characters long', 'string.empty': 'Please enter your password' }).min(8).alphanum().max(50),
    googleId: Joi.string().trim(),
    facebookID: Joi.string().trim(),
    role: Joi.string().trim()
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false
  });
  return joiMessageFunction(error, req, res, next);
};
const signIn = (req, res, next) => {
  const schema = Joi.object({
    email: validationObj({ 'string.required': 'email is required', 'string.base': 'Invalid type, your email must be a string', 'string.empty': 'Please enter your email' }),
    password: validationObj({ 'string.required': 'Password is required', 'string.empty': 'Please enter your password' })
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false
  });
  return joiMessageFunction(error, req, res, next);
};

const socialSignIn = (req, res, next) => {
  const schema = Joi.object({
    name: validationObj({ 'string.required': 'name is required', 'string.base': 'Invalid type, your name must be a string', 'string.empty': 'Please enter your name' }),
    email: validationObj({ 'string.base': 'Invalid type, your email must be a string', 'string.empty': 'Please enter your email', 'string.email': 'Your email is invalid, please enter a valid email' }).email(),
    profileImg: validationObj({ 'string.required': 'Image is required', 'string.base': 'Invalid type, your image must be a string', 'string.empty': 'Please enter your Image Url' }),
    googleId: Joi.string().trim(),
    facebookID: Joi.string().trim()
  });
  const { error } = schema.validate(req.body, {
    abortEarly: false
  });
  return joiMessageFunction(error, req, res, next);
};
export {
  signUp,
  signIn,
  socialSignIn
};
