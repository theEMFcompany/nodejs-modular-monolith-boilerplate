import * as dep from './dependencies';

export const invite = (req, res, next) => {
  const result = dep.utils.validator.run(validate =>
    validate.object().keys({
      email: validate.string().email().required()
    })
  )(req.body);
  return next(result);
};

export const verifyEmailToken = (req, res, next) => {
  const result = dep.utils.validator.run(validate =>
    validate.object().keys({
      accessToken: validate.string().required()
    })
  )(req.body);
  return next(result);
};

export const signUpUser = (req, res, next) => {
  const result = dep.utils.validator.run(validate =>
    validate.object().keys({
      email: validate.string().email().required(),
      password: validate.string().min(6).required()
    })
  )(req.body);
  return next(result);
};

export const loginUser = (req, res, next) => {
  const result = dep.utils.validator.run(validate =>
    validate.object().keys({
      email: validate.string().email().required(),
      password: validate.string().min(6).required()
    })
  )(req.body);
  return next(result);
};

export const logoutUser = (req, res, next) => {
  const result = dep.utils.validator.run(validate =>
    validate.object().keys({
      authToken: validate.string().required()
    })
  )(req.body);
  return next(result);
};

export const checkAuthState = (req, res, next) => {
  const result = dep.utils.validator.run(validate =>
    validate.object().keys({
      authToken: validate.string().required()
    })
  )(req.body);
  return next(result);
};

export const sendPasswordResetEmail = (req, res, next) => {
  const result = dep.utils.validator.run(validate =>
    validate.object().keys({
      email: validate.string().email().required()
    })
  )(req.body);
  return next(result);
};

export const resetPassword = (req, res, next) => {
  const result = dep.utils.validator.run(validate =>
    validate.object().keys({
      password: validate.string().min(6).required(),
      authToken: validate.string().required()
    })
  )(req.body);
  return next(result);
};


export const updateUser = (req, res, next) => {
  const result = dep.utils.validator.run(validate =>
    validate.object().keys({
      password: validate.string().min(6).required(),
      authToken: validate.string().required(),
      data: validate.object()
    })
  )(req.body);
  return next(result);
};

export const getUser = (req, res, next) => {
  const result = dep.utils.validator.run(validate =>
    validate.string().required()
  )(req.params.ref);
  return next(result);
};