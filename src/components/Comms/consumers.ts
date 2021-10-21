import C from './constants';
import * as services from './services';

const consumers = {
    [C.events.INVITE_EMAIL_REQUESTED]: async (channel, _message) => {
        const message = _message.content && _message.content.toString()
        await services.sendVerificationEmail(JSON.parse(message));
        channel.ack(_message);
    }
};

export default consumers;