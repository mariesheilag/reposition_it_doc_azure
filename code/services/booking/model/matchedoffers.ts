import RepositioningRequest from './request';
import SlotOffer from './offer';

export default class MatchedOffers {
  public request!: RepositioningRequest;
  public offers!: SlotOffer[];
}
