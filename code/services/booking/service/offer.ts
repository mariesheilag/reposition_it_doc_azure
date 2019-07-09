import SlotOffer from '../model/offer';
import { OfferRepository } from '../repository/offer';

export const create = async (item: any): Promise<SlotOffer> => {
  // TODO: Validation

  const slotOffer: SlotOffer = await new OfferRepository().create(item);

  // TODO: Audit

  return slotOffer;
};
