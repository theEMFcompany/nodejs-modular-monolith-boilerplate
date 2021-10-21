const log = require('./log');
let broker;
export const init = (handle) => {
  broker = handle;
}
export const publish = async (exchange, routingKey, content) => {
  if(typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  const data = Buffer.from(content);
  try {
    await broker.pubChannel.assertQueue(routingKey, { durable: true });
    await broker.pubChannel.publish(exchange, routingKey, data, {
      persistent: true
    });
  } catch(error) {
    log.error(error, 'publication');
  }
};

export const subscribe = async (queue, listener) => {
  try {
    broker.subChannel.prefetch(10);
    await broker.subChannel.assertQueue(queue, { durable: true });
    listener && broker.subChannel.consume(queue, listener.bind(null, broker.subChannel), {
      noAck: false
    });
  } catch(error) {
    log.error(error, 'subscription');
  }
};

export const getComponentConsumers = _components => {
  // Extract all consumers as a list
  const consumerList: {queue: string; listener(channel: any, message: Buffer): void}[] = [];
  for(let component in _components) {
    if(
      _components.hasOwnProperty(component) &&
      _components[component].consumers
    ) {
      const consumerMap = _components[component].consumers;
      for(let consumer in consumerMap) {
        if(consumerMap.hasOwnProperty(consumer)) {
          consumerList.push({
            queue: consumer,
            listener: consumerMap[consumer]
          });
        }
      }
    }
  }
  return consumerList;
};

export const setUpQueues = async (consumers) => {
  await Promise.all(
    consumers.map(async consumer => {
      const queue = consumer.queue || consumer;
      const listener = consumer.listener;
      await subscribe(queue, listener);
      return queue;
    }));
}
