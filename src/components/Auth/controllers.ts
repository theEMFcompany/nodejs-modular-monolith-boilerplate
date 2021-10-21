import * as services from './services';
import * as dep from './dependencies';
import c from './constants';
import {Request, Response} from 'express';

export const invite = async (req: Request, res: Response) => {
  const email = req.body.email;
  await services.invite(email);
  dep.utils.sendResponse(res, 1, c.responses.POST_SUCCESS, { email });
};

export const verifyEmailToken = async (req, res) => {
  const payload = await services.verifyEmailToken(req.body.accessToken);
  dep.utils.sendResponse(res, 1, c.responses.POST_SUCCESS, payload);
}

export const signUpUser = async (req, res) => {
  const {email, password} = req.body;
  await services.signUpUser({email, password});
  dep.utils.sendResponse(res, 1, c.responses.POST_SUCCESS, {email})
}

export const loginUser = async (req, res) => {
  const {email, password} = req.body;
  const user = await services.loginUser({email, password});
  dep.utils.sendResponse(res, 1, c.responses.LOGIN_SUCCESS, user);
}

export const logoutUser = async (req, res) => {
  const {email, password} = req.body;
  const user = await services.loginUser({email, password});
  dep.utils.sendResponse(res, 1, c.responses.LOGIN_SUCCESS, user);
}

export const checkAuthState = async (req, res) => {
  const {authToken} = req.body;
  const user = await services.checkAuthState(authToken);
  dep.utils.sendResponse(res, 1, c.responses.AUTH_CHECK_SUCCESS, user)
}

export const sendPasswordResetEmail = async (req, res) => {
  const email = req.body.email || req.body;
  await services.sendPasswordResetEmail(email);
  dep.utils.sendResponse(res, 1, c.responses.OUTBOUND_EMAIL_SUCCESS, { email });
};

export const resetPassword = async (req, res) => {
  const payload = await services.resetPassword({password: req.body.password, authToken: req.body.authToken});
  dep.utils.sendResponse(res, 1, c.responses.POST_SUCCESS, payload);
}

