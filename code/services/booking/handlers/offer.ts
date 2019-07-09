import { ServerResponse, IncomingMessage } from 'http';
import fastify from 'fastify';

import SlotOffer from '../model/offer';
import * as service from '../service/offer';
import Constants from '../model/constants';
import { mapIndirectAccessID } from '@repositionit/shared/accessmap';

export const create = async (
  request: fastify.FastifyRequest<IncomingMessage>,
  reply: fastify.FastifyReply<ServerResponse>
) => {
  const {
    terminalFrom,
    terminalTo,
    priceUnit = 100,
    quantityTwentyOriginal,
    quantityFortyOriginal = 0,
    whitelistedClients = [6, 7],
    departureDateStart,
    departureDateEnd,
    arrivalDateStart,
    arrivalDateEnd,
  } = request.body;

  const slotOffer: SlotOffer = await service.create({
    supplierId: 1,
    terminalFrom,
    terminalTo,
    priceUnit,
    quantityTwentyOriginal,
    quantityTwentyCurrent: quantityTwentyOriginal,
    quantityFortyOriginal,
    quantityFortyCurrent: quantityFortyOriginal,
    whitelistedClients,
    departureDateStart,
    departureDateEnd,
    arrivalDateStart,
    arrivalDateEnd,
    expirationDate: arrivalDateEnd,
  });

  await mapIndirectAccessID(slotOffer, Constants.OFFER_ID);
  reply.created(slotOffer);

  // TODO: Handle Errors
};
