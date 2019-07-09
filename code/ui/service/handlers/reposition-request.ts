import fastify from 'fastify';
import { ServerResponse } from 'http';

export const newPage = async (req: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) => {
  return reply.render(req, '/reposition-requests-new');
};

export const showPage = async (req: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) => {
  return reply.render(req, '/reposition-request', { ...req.query, id: req.params.id });
};
