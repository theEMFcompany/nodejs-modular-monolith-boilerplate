const utils = require('./utils');
const c = require('./constants');
const repository = require('./repository');

exports.createUser = async _user => {
    const user = {id: _user.id, email: _user.email, password: _user.passwordHash};
    const outbox = {
        event: 'NEW_USER_CREATED',
        payload: user
    }
    await repository.createUser(user);
    await utils.broker.publish('', c.routingKeys.email, outbox);
};

exports.getUser = async userId => {
    const user = await repository.getUser(userId);
    delete user.password;
    return user;
};


exports.fetchUsers = async options => {
    const users = await repository.fetchUsers(options);
    return users;
};