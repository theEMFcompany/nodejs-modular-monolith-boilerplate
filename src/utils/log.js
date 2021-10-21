const bunyan = require('bunyan');

const logger = bunyan.createLogger({name: 'nibkit-API'});
module.exports = logger;