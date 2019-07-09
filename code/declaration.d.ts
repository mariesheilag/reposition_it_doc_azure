import fastify from 'fastify';
import winston from 'winston';
import next from 'next';

declare module 'fastify' {
  interface FastifyReply<HttpResponse> {
    logger: winston.Logger;
    error(error: HttpError, statusCode?: number): FastifyReply<HttpResponse>;
    created(payload: {}): FastifyReply<HttpResponse>;
    accepted(): FastifyReply<HttpResponse>;
    accepted(): FastifyReply<HttpResponse>;
    data(payload: {}, status?: number): FastifyReply<HttpResponse>;
    render(request: fastify.FastifyRequest, path: string, query?: any): FastifyReply<HttpResponse>;
  }

  // interface FastifyRequest<HttpResponse> {}
}
