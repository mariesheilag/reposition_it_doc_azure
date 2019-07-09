import { ServerResponse } from 'http';
import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import logger from '../logger';
import swaggerSettings from './swagger.json';

const instance = fastify({
  logger: false, // we make sure we aren't logging anything accidentally
  disableRequestLogging: true,
  onProtoPoisoning: 'remove',
  trustProxy: process.env.TRUST_PROXY === 'true',
});

if (process.env.NODE_ENV === 'development') {
  instance.register(fastifySwagger, {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
      info: {
        title: require('../../package.json').name,
        version: require('../../package.json').version,
      },
      ...swaggerSettings,
    },
  });
}

export async function prepare() {
  const requests: { [key: string]: any } = require('./request');
  const replies: { [key: string]: any } = require('./reply');
  Object.keys(requests).map((key: string) => instance.decorateRequest(key, requests[key]));
  Object.keys(replies).map((key: string) => instance.decorateReply(key, replies[key]));

  instance.decorate('logger', logger);
  instance.decorateRequest('logger', logger);
  instance.decorateReply('logger', logger);

  instance.get('/.well-known/healthy', async (_: any, reply: fastify.FastifyReply<ServerResponse>) => {
    return reply.send('I am up and runing');
  });

  await instance.ready();

  if (process.env.NODE_ENV === 'development') {
    instance.swagger();
  }

  return instance;
}

export async function use(handler: any) {
  instance.register(handler.default, handler.config);
}

export async function listen(port: number, host: string) {
  await instance.listen(port, host);
  logger.info(`Service has started listening to ${host}:${port}`);
}
