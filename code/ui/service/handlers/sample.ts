import fastify from 'fastify';
import { ServerResponse } from 'http';

export async function SampleHandler(req: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) {
  // This is where we perform logic pre-rendering
  await reply.render(req, '/sample', {
    sampleData: 'hello world',
  });
  // and do post-processing not related to rendering
}
