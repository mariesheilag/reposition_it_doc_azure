import fastify from 'fastify';
import { ServerResponse } from 'http';

import * as Authentication from '../service/authentication';

export async function login(request: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) {
  await Authentication.start(request.body.email, request.headers.fingerprint, request.ip);
  reply.accepted();
}

export async function proceed(request: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) {
  const { accessToken } = await Authentication.proceed(request.body.token, request.headers.fingerprint, request.ip);
  reply.header('apitoken', accessToken);
  reply.header('fingerprint', request.headers.fingerprint);
  reply.data({ accessToken });
}

export async function sample(_request: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) {
  reply.data({ foo: 'foo' });
}
