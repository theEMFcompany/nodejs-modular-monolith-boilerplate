const dep = require("./dependencies");

exports.createUser = (req, res, next) => {
  const result = dep.utils.validator.run(validate =>
    validate.object().keys({
      email: validate.string().required(),
      password: validate.string()
    })
  )(req.body.user || req.body);
  return next(result);
};

exports.getUser = (req, res, next) => {
  const result = dep.utils.validator.run(validate =>
    validate.string().required()
  )(req.params.id);
  return next(result);
};
