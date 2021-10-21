import * as C from '../constants/';
import amqp from 'amqplib';
import * as utils from '../utils/';

export const init = (consumers, mediator) => {
  let conn, pubChannel, subChannel;
  mediator.once(C.events.BROKER_START, () => {
    utils.log.info(consumers);
    amqp
      .connect({
        hostname: process.env.BROKER_HOST,
        password: process.env.BROKER_PASS,
        username: process.env.BROKER_USER,
        heartbeat: 60
      })
      .then(_conn => {
        conn = _conn;
        return conn.createConfirmChannel();
      })
      .then(_pub => {
        pubChannel = _pub;
        return conn.createChannel();
      })
      .then(_sub => {
        subChannel = _sub;
        subChannel.prefetch(10);
        return Promise.all(
          consumers.map(async consumer => {
            (typeof consumer === 'string' || consumer.queue) && await subChannel.assertQueue(
              consumer.queue || consumer,
              consumer.options && consumer.options.queue
                ? consumer.options.queue
                : { durable: true }
            );
            consumer.listener && subChannel.consume(
              consumer.queue,
              consumer.listener.bind(null, subChannel),
              consumer.options && consumer.options.consume
                ? consumer.options.consume
                : { noAck: false }
            );
            return consumer.queue || consumer;
          }));
      })
      .then((results) => {
        utils.log.info(`[AMQP-ASSERTED-QUEUES] `, results);
        return mediator.emit(C.events.BROKER_READY, { conn, pubChannel, subChannel });
      })
      .catch(error => {
        utils.log.error(`[AMQP] error`, error);
        mediator.emit(C.events.BROKER_ERROR, error);
      });
  });
};