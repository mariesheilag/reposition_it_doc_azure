import { BaseRepository } from '@repositionit/shared/db';
import SlotOffer from '../model/offer';

export class OfferRepository extends BaseRepository<SlotOffer> {
  public getTableName(): string {
    return 'slot_offers';
  }

  public getFields(): string[] {
    return [
      'id',
      'supplier_id as supplierId',
      'terminal_from as terminalFrom',
      'terminal_to as terminalTo',
      'price_unit as priceUnit',
      'quantity_twenty_original as quantityTwentyOriginal',
      'quantity_twenty_current as quantityTwentyCurrent',
      'quantity_forty_original as quantityFortyOriginal',
      'quantity_forty_current as quantityFortyCurrent',
      'whitelisted_clients as whitelistedClients',
      'departure_date_start as departureDateStart',
      'departure_date_end as departureDateEnd',
      'arrival_date_start as arrivalDateStart',
      'arrival_date_end as arrivalDateEnd',
      'expiration_date as expirationDate',
      'deleted_on as deletedOn',
    ];
  }
}
