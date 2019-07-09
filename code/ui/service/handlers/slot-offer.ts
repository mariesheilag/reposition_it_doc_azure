import fastify from 'fastify';
import { ServerResponse } from 'http';

export const newPage = async (req: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) => {
  return reply.render(req, '/slot-offers-new');
};

export const showPage = async (req: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) => {
  return reply.render(req, '/slot-offer', { ...req.query, id: req.params.id });
};
