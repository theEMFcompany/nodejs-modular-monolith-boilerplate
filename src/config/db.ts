import * as utils from '../utils/';
import knex from 'knex';
import redis, {ClientOpts} from 'redis';
import * as C from '../constants/';

let dbHandle;
let cacheHandle;

export const initPostgresDB = async function init(config, mediator) {
  mediator.once(C.events.DB_START, () => {
    dbHandle = knex({
      client: 'pg',
      connection: {
        host: config.host,
        user: config.user,
        password: config.pass,
        database: config.db,
        port: config.port
      },
      postProcessResponse: (result)=> {
        if(Array.isArray(result)) {
          return result.map(r => utils.formatString.snakeTocamel(r))
        }
        return utils.formatString.snakeTocamel(result);
      }
    });
    mediator.emit(C.events.DB_READY, dbHandle);
  }) 
}
export const initRedisCache = async function initRedisCache(config, mediator) {
  mediator.once(C.events.CACHE_START, () => {
    const options: ClientOpts = {
      port: config.port,
      host: config.host,
      password: config.pass
    }
    if(process.env.NODE_ENV !== 'development') {
      options.tls = {
        port: config.port,
        host: config.host
      }
    }
    cacheHandle = redis.createClient(options);
    cacheHandle.on('connect', () => {
      utils.log.info('CACHE CONNECTED')
    });
    cacheHandle.on('ready', () => {
      utils.log.info('CACHE READY')
    });
    cacheHandle.on('error', () => {
      utils.log.info('CACHE ERROR')
    });
    mediator.emit(C.events.CACHE_READY, cacheHandle)
  })
}