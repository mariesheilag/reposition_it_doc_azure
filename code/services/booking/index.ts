import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

import * as error from '@repositionit/shared/http/error';
import * as repositionRequestHandler from './handlers/request';
import * as slotOfferHandler from './handlers/offer';
import * as matchHandler from './handlers/match';
import RepositionRequestSchema from './schema/request.json';
import SlotOfferSchema from './schema/offer.json';
import RepositionRequestMatchSchema from './schema/matchedoffers.json';
import SlotOfferMatchSchema from './schema/matchedrequests.json';
import registerRateLimit from '@repositionit/shared/middlewares/ratelimit';

export const config = {
  prefix: '/booking',
};

export default async (instance: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>) => {
  const rateLimit = {
    max: 1000,
    timeWindow: 60000,
    keyGenerator: (req: fastify.FastifyRequest) => {
      return req.ip; // or any of the sessions
    },
  };
  registerRateLimit(instance, rateLimit);

  instance.post(
    '/reposition-requests',
    { schema: RepositionRequestSchema, config: { rateLimit } },
    repositionRequestHandler.create
  );

  instance.post('/slot-offers', { schema: SlotOfferSchema }, slotOfferHandler.create);

  instance.get(
    '/match/reposition-request/:rid',
    { schema: RepositionRequestMatchSchema },
    matchHandler.getMatchesForRequest
  );

  instance.get('/match/slot-offer/:rid', { schema: SlotOfferMatchSchema }, matchHandler.getMatchesForOffer);

  instance.setErrorHandler(error.errorHandler);

  instance.setNotFoundHandler(error.notFoundHandler);
};
