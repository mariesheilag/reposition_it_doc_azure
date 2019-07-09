import fastify from 'fastify';
import { ServerResponse } from 'http';
import * as Device from '../service/device';

export async function fingerprint(request: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) {
  try {
    const hash = await Device.fingerprint(request.headers['user-agent'], request.ip);
    reply.header('fingerprint', hash);
    reply.data({ fingerprint: hash });
  } catch (err) {
    reply.error(err);
  }
}
