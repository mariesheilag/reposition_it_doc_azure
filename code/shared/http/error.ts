import fastify = require('fastify');
import { ServerResponse } from 'http';

export interface HttpError extends Error {
  code: string;
  httpStatus: number;
  validation: object;
}

export function notFoundHandler(_: any, reply: fastify.FastifyReply<ServerResponse>) {
  reply.error(new Error('Not found'), 404);
}

export function errorHandler(error: fastify.FastifyError, _: any, reply: fastify.FastifyReply<ServerResponse>) {
  reply.error(error);
}
