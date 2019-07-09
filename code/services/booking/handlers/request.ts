import { ServerResponse, IncomingMessage } from 'http';
import fastify from 'fastify';

import RepositionRequest from '../model/request';
import * as service from '../service/request';

import { mapIndirectAccessID } from '@repositionit/shared/accessmap';
import Constants from '../model/constants';

export const create = async (
  request: fastify.FastifyRequest<IncomingMessage>,
  reply: fastify.FastifyReply<ServerResponse>
) => {
  const {
    fromType = 'terminals',
    fromId,
    toType = 'terminals',
    toId,
    equipmentType = 'twenty',
    whitelistedProviders = [1, 2, 3, 4, 5],
    departureDateStart,
    departureDateEnd,
  } = request.body;

  const repositionRequest: RepositionRequest = await service.create({
    demandId: 6,
    fromType,
    fromId,
    toType,
    toId,
    equipmentType,
    whitelistedProviders,
    departureDateStart,
    departureDateEnd,
    expirationDate: departureDateEnd,
  });

  await mapIndirectAccessID(repositionRequest, Constants.REQUEST_ID);
  reply.created(repositionRequest);

  // TODO: Handle Errors
};
