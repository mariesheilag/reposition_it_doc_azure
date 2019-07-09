import RepositioningRequest from './request';
import SlotOffer from './offer';

export default class MatchedRequests {
  public requests!: RepositioningRequest[];
  public offer!: SlotOffer;
}
