const amqp = require('amqplib');

module.exports = function init(config) {
  return async () => {
    const app = this;

    async function consume(message, queue) {
      const { method = 'create', service = 'base/events', body: { type, data } = {} } = queue.action;
      const content = JSON.parse(message.content.toString());
      const payload = { type: type || queue.name, data: data || content };
      // eslint-disable-next-line no-console
      console.log(`[x] message: ${JSON.stringify(content)} in ${queue.name}`);
      app.service(service)[method](payload);
    }

    const connection = await amqp.connect(config.url);
    const channel = await connection.createChannel();

    config.streams.map(async (stream) => {
      channel.assertExchange(
        stream.exchange.name,
        stream.exchange.type,
        { durable: stream.exchange.durable },
      );
      const queue = await channel.assertQueue(stream.queue.name, { exclusive: false });

      // eslint-disable-next-line no-console
      console.log('[*] Waiting for messages in %s. To exit press CTRL+C', stream.queue.name);
      channel.bindQueue(queue.queue, stream.exchange.name);
      channel.consume(queue.queue, (message) => consume(message, stream.queue), { noAck: true });
    });
  };
};
