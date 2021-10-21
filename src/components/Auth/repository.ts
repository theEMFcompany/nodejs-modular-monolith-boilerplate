import { RawQueryBuilder } from 'knex';
import {RedisClient} from 'redis';

import C from './constants';
import * as T from './types';

export let db: RawQueryBuilder;
export let cache: RedisClient;
export const initDB = (handle) => {
    db = handle;
};

export const initCache = (handle: RedisClient) => {
  cache = handle;
};


const componentName = 'auth';

export const addJournalEntry = (entry: T.JournalEntry): Promise<void> => {
  return db(C.tables.AUTH_JOURNAL).insert(entry);
}

export const setUser = (user: T.CreateUserEventData): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    return cache.SET(getUserIdKey(user.id), user.email, (err1, _) => {
      if(err1 !== null) return reject(err1.message);
      return cache.HMSET(
        getUserEmailKey(user.email), 
        'email', user.email, 
        'id', user.id,
        'passwordHash', user.passwordHash,
        'status', user.status,
        (err2, _) => {

          if(err2 !== null) return reject(err2.message);
          return resolve(true);
        }
      );
    });
  });
};

export const getUserByEmail = (email: string): Promise<T.User | null> => {
  return new Promise((resolve, reject) => {
    cache.HGETALL(getUserEmailKey(email), (err, user) => {
      if(err !== null) {
        return reject(err);
      }
      return resolve({
        email: user.email,
        id: user.id,
        passwordHash: user.passwordHash,
        avartar: user.avartar
      });
    });
  })
}

export const getUserById = (id: string): Promise<T.User | null> => {
  return new Promise((resolve, reject) => {
    cache.GET(getUserIdKey(id), (err, email) => {
      if(err !== null) return reject(err.message);
      if(email === null) return reject('Email does not exist');
      getUserByEmail(email).then( (user) => {
        resolve(user);
      }).catch((err) => {
        return reject(err.message);
      })
    });
  })
}

export const setUserPass = async (email, password): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    return cache.HMSET(getUserEmailKey(email), 'passwordHash', password, (err, result) => {
      if(err !== null) return reject(err.message);
      return resolve(result ? true : false);
    })
  })
}

export function checkUserExists(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    return cache.EXISTS(getUserEmailKey(email), (err, result) => {
      if(err !== null) return reject(err);
      return resolve(result && result !== null ? true : false);
    });
  })
}

function getUserEmailKey(email: string): string {
  return `${componentName}:${T.ENTITIES.USER}:email:${email}`;
}
function getUserIdKey(id: string): string {
  return `${componentName}:${T.ENTITIES.USER}:id:${id}`;
}