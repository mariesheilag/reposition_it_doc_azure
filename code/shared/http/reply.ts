import fastify = require('fastify');
import { ServerResponse } from 'http';
import { HttpError } from './error';

export function data(this: fastify.FastifyReply<ServerResponse>, payload: {}, status: number = 200) {
  this.header('Content-Type', 'application/json; charset=utf-8');
  this.code(status);
  this.send(payload);
}

export function error(this: fastify.FastifyReply<ServerResponse>, err: HttpError, httpStatus?: number) {
  this.logger.error(err.message);
  if (err.validation) {
    //  error = error.validation;
  }
  this.header('Content-Type', 'application/json; charset=utf-8');
  this.code(httpStatus || err.httpStatus || 400);
  this.send({
    error: {
      message: err.message,
      code: err.code || undefined,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
}

export function created(this: fastify.FastifyReply<ServerResponse>, payload: {}) {
  this.data(payload, 201);
}

export function accepted(this: fastify.FastifyReply<ServerResponse>) {
  this.code(202);
  this.send('');
}

// @TODO add buffer support to prevent HEADERS_ALREADY_SENT
