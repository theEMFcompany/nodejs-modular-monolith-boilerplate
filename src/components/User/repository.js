const c = require('./constants');
const utils = require('./utils');

let db;
exports.init = (handle) => {
    db = exports.db = handle;
};
exports.createUser = async (user) => {
    // return db(c.tables.USER).insert(user);
    return;
};
exports.getUser = async (userId) => {
    return db(c.tables.USER).where({id: userId});
};

exports.fetchUsers = async (options) => {
    return db(c.tables.USER).where(options);
};