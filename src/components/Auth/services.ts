import utils from './utils';
import c from './constants';
import * as repository from './repository';
import * as T from './types';

export const invite = async (email: string) => {
  const existingUser = await repository.checkUserExists(email);
  if(!existingUser) {
    const id = utils.generateId();
    const entry = {
      event_type: c.events.INVITE_EMAIL_REQUESTED,
      event_data: {
        email,
        token: utils.webToken.create({email}, 6000 * 6000)
      },
      entity_type: T.ENTITIES.USER,
      entity_id: id
    }
    await repository.addJournalEntry(entry);
  }
};

export const verifyEmailToken = async token => {
  return await utils.webToken.validate(token);
}

export const signUpUser = async (user) => {
  const email = user.email.trim();
  const password = user.password.trim();
  const existingUser = await repository.checkUserExists(email);
  if(!existingUser) {
    const passwordHash = utils.hasher.create(password);
    const id = utils.generateId();
    
    const entry = {
      event_type: c.events.NEW_USER_SIGNED_UP_WITH_EMAIL,
      event_data: {
        email,
        id,
        passwordHash,
        status: 0
      },
      entity_type: T.ENTITIES.USER,
      entity_id: id
    }

    await repository.addJournalEntry(entry);
    return;
  }
  throw utils.exception(c.responses.INVALID_LOGIN, 401);
}

export const createUserEntry = async (userData: T.CreateUserEventData) => {
  const existingUser = await repository.checkUserExists(userData.email);
  if(!existingUser) {
    await repository.setUser(userData);
  }
}

export const loginUser = async (loginDetails: {email: string, password: string}) => {
  const existingUser = await repository.checkUserExists(loginDetails.email.trim());
  if(existingUser) {
    const user: T.User | null = await repository.getUserByEmail(loginDetails.email.trim());
    if(user !== null && utils.hasher.verifyHash(loginDetails.password.trim(), user.passwordHash.trim())) {
      const response: T.UserWithAccessToken = {
        email: user.email,
        id: user.id,
        avartar: user.avartar,
        accessToken: utils.webToken.create(user, 6000 * 6000)
      }
      return response;
    }
  }
  throw utils.exception(c.responses.INVALID_LOGIN, 401);
}

export const checkAuthState = async accessToken => {
  const user = await utils.webToken.validate(accessToken);
  if(user === null) throw utils.exception(c.responses.INVALID_LOGIN, 401);
  delete user.passwordHash;
  user.accessToken =  accessToken;
  return user; 
}

export const sendPasswordResetEmail = async email => {
  const existingUser = await repository.checkUserExists(email);
  if(existingUser) {
    const outbox = {
      event: 'PASSWORD_RESET_REQUESTED',
      payload: {
        email,
        token: utils.webToken.create({email, type: 'password_reset'}, 6000 * 6000)
      }
    }
    await utils.broker.publish('', c.routingKeys.email, outbox);
  }
};

export const resetPassword = async ({authToken, password}) => {
  const user = await utils.webToken.validate(authToken);
  if(user === null) throw utils.exception(c.responses.INVALID_LOGIN, 401);
  const passwordHash = utils.hasher.create(password);
  await repository.setUserPass(user.email, passwordHash);
}