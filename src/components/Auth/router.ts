import express from 'express';
import * as ctrl from './controllers';
import * as dependencies from './dependencies';
import * as validations from './validations';
const router = express.Router();

router.post(
  '/invite',
  [validations.invite],
  dependencies.middleware.asyncRoute(ctrl.invite)
);

router.post(
  '/verify',
  [validations.verifyEmailToken],
  dependencies.middleware.asyncRoute(ctrl.verifyEmailToken)
); 

router.post(
  '/signup',
  [validations.signUpUser],
  dependencies.middleware.asyncRoute(ctrl.signUpUser)
); 

router.post(
  '/login',
  [validations.loginUser],
  dependencies.middleware.asyncRoute(ctrl.loginUser)
); 


router.post(
  '/logout',
  [validations.logoutUser],
  dependencies.middleware.asyncRoute(ctrl.logoutUser)
); 

router.post(
  '/refresh',
  [validations.checkAuthState],
  dependencies.middleware.asyncRoute(ctrl.checkAuthState)
); 

router.post(
  '/recover',
  [validations.sendPasswordResetEmail],
  dependencies.middleware.asyncRoute(ctrl.sendPasswordResetEmail)
);

router.post(
  '/reset',
  [validations.resetPassword],
  dependencies.middleware.asyncRoute(ctrl.resetPassword)
);
export default router;
