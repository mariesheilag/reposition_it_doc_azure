import fastify from 'fastify';
import Next from 'next';
import { Server, IncomingMessage, ServerResponse } from 'http';

import Renderer from './renderer';
import * as Handler from './handlers/sample';
import * as repositionRequestHandler from './handlers/reposition-request';
import * as showOfferHandler from './handlers/slot-offer';
import { setAccessToken, getApiToken } from './handlers/auth';

const dev = process.env.NODE_ENV !== 'production';
const app = Next({ dev, dir: './ui' });

export const config: any = {
  prefix: '/',
  schema: {
    hide: true,
  },
};

export default async (
  instance: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _: any,
  next: any
) => {
  return app
    .prepare()
    .then(() => {
      instance.decorateReply('render', function(
        this: fastify.FastifyReply<ServerResponse>,
        req: fastify.FastifyRequest,
        path: string,
        query: any
      ) {
        return Renderer(app, req, this, path, query);
      });

      if (dev) {
        instance.get('/_next/*', config, (req: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) => {
          return app.handleRequest(req.req, reply.res).then(() => {
            reply.sent = true;
          });
        });
      }

      instance.get('/', async (req: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) =>
        reply.render(req, '/index')
      );

      instance.get(
        '/login/continue',
        async (req: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) =>
          reply.render(req, '/login-continue')
      );

      // TODO PROTECTED FRONT END ROUTE MIDDLEWARE: CHECK COOKIE: JWT EXPIRY || SESSION MIDDLEWARE?
      instance.get('/dashboard', async (req: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) =>
        reply.render(req, '/dashboard')
      );

      instance.get('/reposition-requests/new', repositionRequestHandler.newPage);

      instance.get('/reposition-requests/:id', repositionRequestHandler.showPage);

      instance.get('/slot-offers/new', showOfferHandler.newPage);

      instance.get('/slot-offers/:id', showOfferHandler.showPage);

      instance.get('/sample', Handler.SampleHandler);

      instance.setNotFoundHandler((request, reply) =>
        app.render404(request.req, reply.res).then(() => (reply.sent = true))
      );

      instance.setErrorHandler((_var, request, reply) =>
        app.render404(request.req, reply.res).then(() => (reply.sent = true))
      );

      instance.register(require('fastify-reply-from'));

      instance.register(require('fastify-cookie'));

      instance.register(require('k-fastify-gateway'), {
        routes: [
          {
            prefix: '/api',
            target: String(process.env.API_URL),
            hooks: {
              onRequest: async (req: any) => {
                if (req.cookies && req.cookies.accessToken) {
                  const apiToken = await getApiToken(req.cookies.accessToken, req.headers.fingerprint);
                  if (apiToken) {
                    req.headers.apitoken = apiToken;
                  }
                }
              },
              onResponse: async (req: any, reply: any, res: any) => {
                const { apitoken: apiToken, fingerprint, ...rest } = res.headers;
                res.headers = { fingerprint, ...rest };
                if (`${req.method}`.toUpperCase() === 'POST' && req.url === '/id/continue' && apiToken) {
                  const accessToken = await setAccessToken(apiToken, fingerprint);
                  if (accessToken) {
                    reply.setCookie('accessToken', accessToken, { domain: process.env.HOST, path: '/' });
                  }
                }
                reply.send(res);
              },
            },
          },
        ],
      });

      next();
    })
    .catch((err: Error) => next(err));
};
