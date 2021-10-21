const express = require('express');
const router = express.Router();
const ctrl = require('./controllers');
const dependencies = require('./dependencies');
const validations = require('./validations');

router.post(
  '/',
  [dependencies.middleware.formatBodyKeys('user'), validations.createUser],
  dependencies.middleware.asyncRoute(ctrl.createUser)
);


router.get(
  '/:id',
  [validations.getUser],
  dependencies.middleware.asyncRoute(ctrl.getUser)
);

router.get(
  '/',
  dependencies.middleware.asyncRoute(ctrl.fetchUsers)
);
module.exports = router;
