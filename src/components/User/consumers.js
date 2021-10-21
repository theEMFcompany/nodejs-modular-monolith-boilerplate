const c = require('./constants');
const services = require('./services');
module.exports = {
    [c.routingKeys.newUserSignUp]: async (channel, _message) => {
        const message = _message.content && _message.content.toString()
        await services.createUser(JSON.parse(message).payload);
        channel.ack(_message);
    }
}