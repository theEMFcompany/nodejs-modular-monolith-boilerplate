export const env: {[key: string]: string} = {};
export const init = (processEnv, onError: (err: Error) => void) => {
  const requiredVars = [
    'PORT',
    'NODE_ENV',
    'JWT_SECRET',
    'HASH_SALT',
    'FRONT_END_URL',
    'DB_HOST',
    'DB_NAME',
    'DB_PASS',
    'DB_USER',
    'DB_PORT',
    'BROKER_HOST',
    'BROKER_USER',
    'BROKER_PASS',
    'CACHE_HOST',
    'CACHE_USER',
    'CACHE_PASS',
    'CACHE_PORT',
    'REALTIME_URL',
    'MAIL_HOST',
    'MAIL_USER',
    'MAIL_PASS',
    'MEDIA_HOST',
  ];
  const missing: string[] = [];
  requiredVars.forEach(val => {
    if(processEnv[val]) {
      env[val] = processEnv[val]
    } else {
      missing.push(val);
    }
  });
  if(missing.length > 0) {
    onError(Error(
      'The following ENV variables are missing' + missing.join('; ')
    ));
  }
};
