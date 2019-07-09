import { BaseRepository } from '@repositionit/shared/db';
import RepositioningRequest from '../model/request';

export class RequestRepository extends BaseRepository<RepositioningRequest> {
  public getTableName(): string {
    return 'reposition_requests';
  }

  public getFields(): string[] {
    return [
      'id',
      'demand_id as demandId',
      'from_type as fromType',
      'from_id as fromId',
      'to_type as toType',
      'to_id as toId',
      'equipment_type as equipmentType',
      'whitelisted_providers as whitelistedProviders',
      'departure_date_start as departureDateStart',
      'departure_date_end as departureDateEnd',
      'expiration_date as expirationDate',
      'depot_location as depotLocation',
      'deleted_on as deletedOn',
    ];
  }
}
