import { ServerResponse, IncomingMessage } from 'http';
import fastify from 'fastify';

import { getDirectReference, mapIndirectAccessID, mapIndirectAccessIDs } from '@repositionit/shared/accessmap';

import { getMatchesForRepositioningRequest, getMatchesForSlotOffer } from '../service/match';
import MatchedRequests from '../model/matchedrequests';
import MatchedOffers from '../model/matchedoffers';
import Constants from '../model/constants';

export const getMatchesForRequest = async (
  request: fastify.FastifyRequest<IncomingMessage>,
  reply: fastify.FastifyReply<ServerResponse>
) => {
  const { rid } = request.params;
  const id = await getDirectReference(rid, Constants.REQUEST_ID);
  // TODO: Throw error if id comes as undefined
  const matchedOffers: MatchedOffers = await getMatchesForRepositioningRequest(id);

  // Map ids to rid
  await mapIndirectAccessID(matchedOffers.request, Constants.REQUEST_ID);
  await mapIndirectAccessIDs(matchedOffers.offers, Constants.OFFER_ID);

  // TODO: Handle Errors
  reply.data(matchedOffers);
};

export const getMatchesForOffer = async (
  request: fastify.FastifyRequest<IncomingMessage>,
  reply: fastify.FastifyReply<ServerResponse>
) => {
  const { rid } = request.params;
  const id = await getDirectReference(rid, Constants.OFFER_ID);
  // TODO: Throw error if id comes as undefined
  const matchedRequests: MatchedRequests = await getMatchesForSlotOffer(id);

  // Map ids to rid
  await mapIndirectAccessID(matchedRequests.offer, Constants.OFFER_ID);
  await mapIndirectAccessIDs(matchedRequests.requests, Constants.REQUEST_ID);

  // TODO: Handle Errors

  reply.data(matchedRequests);
};
