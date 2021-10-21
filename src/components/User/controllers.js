const services = require('./services');
const dep = require('./dependencies');
const c = require('./constants');

exports.createUser = async (req, res) => {
  const body = req.body.user || req.body;
  const id = await services.createUser(body);
  dep.utils.sendResponse(res, 1, c.responses.POST_SUCCESS, { id });
};

exports.getUser = async (req, res) => {
  const userId = req.params.id;
  const user = await services.getUser(userId);
  dep.utils.sendResponse(res, 1, c.responses.POST_SUCCESS, { user });
};

exports.fetchUsers = async (req, res) => {
  const options = req.query;
  const user = await services.fetchUsers(options);
  dep.utils.sendResponse(res, 1, c.responses.POST_SUCCESS, { user });
};
