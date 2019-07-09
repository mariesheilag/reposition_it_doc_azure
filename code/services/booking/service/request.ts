import RepositionRequest from '../model/request';
import { RequestRepository } from '../repository/request';

export async function create(item: any): Promise<RepositionRequest> {
  // TODO: Validation

  const repositionRequest: RepositionRequest = await new RequestRepository().create(item);

  // TODO: Audit

  return repositionRequest;
}
