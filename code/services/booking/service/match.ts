import knex from '@repositionit/shared/db';
import RepositioningRequest from '../model/request';
import SlotOffer from '../model/offer';
import { RequestRepository } from '../repository/request';
import MatchedOffers from '../model/matchedoffers';
import MatchedRequests from '../model/matchedrequests';
import { OfferRepository } from '../repository/offer';

export async function getMatchesForRepositioningRequest(requestId: number): Promise<MatchedOffers> {
  const repRequest: RepositioningRequest = await new RequestRepository().findOne({ id: requestId });

  const { fromId, toId, departureDateStart, departureDateEnd } = repRequest;

  const matchingOffers = await knex
    .from('slot_offers')
    .select('*')
    .whereRaw('terminal_from = ? AND terminal_to = ? AND (? >= departure_date_start) AND (departure_date_end >= ?)', [
      fromId,
      toId,
      departureDateEnd,
      departureDateStart,
    ]);

  return {
    request: repRequest,
    offers: matchingOffers,
  };
}

export async function getMatchesForSlotOffer(offerId: number): Promise<MatchedRequests> {
  const slotOffer: SlotOffer = await new OfferRepository().findOne({ id: offerId });

  const { terminalFrom, terminalTo, departureDateStart, departureDateEnd } = slotOffer;

  const matchingRequests = await knex
    .from('reposition_requests')
    .select('*')
    .whereRaw(
      'from_id = ? AND to_id = ? AND (? >= departure_date_start) AND (departure_date_end >= ?) AND from_type = ? AND to_type = ?',
      [terminalFrom, terminalTo, departureDateEnd, departureDateStart, 'terminals', 'terminals']
    );

  return {
    requests: matchingRequests,
    offer: slotOffer,
  };
}
