import C from './constants';
import * as services from './services';

const consumers = {
    [C.events.NEW_USER_SIGNED_UP_WITH_EMAIL]: async (channel, _message) => {
        const message = _message.content && _message.content.toString();
        await services.createUserEntry(JSON.parse(message));
        channel.ack(_message);
    }
};

export default consumers;