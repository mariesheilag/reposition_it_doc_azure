import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import * as AuthenticationHandler from './handlers/authentication';
import * as DeviceHandler from './handlers/device';
import * as error from '@repositionit/shared/http/error';
import AuthenticationSchema from './schema/auth.json';
import DeviceSchema from './schema/device.json';
import { checkSession } from '@repositionit/shared/authentication';

export const config = {
  prefix: '/id',
};

export default async (instance: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>) => {
  instance.post('/fingerprint', { schema: DeviceSchema.fingerprint }, DeviceHandler.fingerprint);
  instance.post('/login', { schema: AuthenticationSchema.login }, AuthenticationHandler.login);
  instance.post('/continue', { schema: AuthenticationSchema.continue }, AuthenticationHandler.proceed);
  instance.get('/leave', { schema: AuthenticationSchema.leave }, AuthenticationHandler.login);

  instance.get(
    '/protected',
    { schema: AuthenticationSchema.leave, preHandler: [checkSession] },
    AuthenticationHandler.sample
  );

  instance.setErrorHandler(error.errorHandler);
  instance.setNotFoundHandler(error.notFoundHandler);
};
