import logger from '@repositionit/shared/logger';
import next from 'next';
import fastify from 'fastify';
import { ServerResponse } from 'http';
import LRU from 'lru-cache';

const lruCache = new LRU({
  max: 500,
  maxAge: 1000 * 60 * 60,
});

export default async function(
  app: next.Server,
  request: fastify.FastifyRequest,
  reply: fastify.FastifyReply<ServerResponse>,
  pagePath: string,
  query?: any
) {
  reply.type('text/html; charset=utf-8');
  const key = `ssr:${request.req.url}`;

  // disable cached rendering
  if (process.env.NODE_ENV !== 'production') {
    await app.render(request.req, reply.res, pagePath, { ...request.query, ...query });
    reply.sent = true;
    return;
  }

  const cachedRender = await lruCache.get(key);
  if (cachedRender) {
    reply.header('X-Cache', 'HIT');
    reply.send(cachedRender);
    reply.sent = true;
    return;
  }

  try {
    reply.header('X-Cache', 'MISS');
    const html = await app.renderToHTML(request.req, reply.res, pagePath, { ...request.query, ...query });
    reply.send(html);
    reply.sent = true;
    lruCache.set(key, html);
  } catch (err) {
    logger.error('RENDERER', err);
  }
  reply.sent = true;
}
