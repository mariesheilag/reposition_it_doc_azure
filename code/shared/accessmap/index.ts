import LRU from 'lru-cache';

import { AccessReferenceMap, MaskableEntity } from './accessreferencemap';

// TODO: Setup a proper cache considering the different scenarios
const lruCache = new LRU({
  max: 500,
  maxAge: 1000 * 60 * 60,
});

// TODO: Pass actual user ids
export async function getIndirectReference(id: number, idType: string, userId = 1): Promise<string> {
  const indirectAccessMap = await getUserAccessMap(userId, idType);
  let rid = indirectAccessMap.getIndirectReference(id);
  if (rid === undefined) {
    rid = indirectAccessMap.addDirectReference(id);
    await updateUserAccessMap(userId, idType, indirectAccessMap);
  }
  return rid;
}

export async function getDirectReference(rid: string, idType: string, userId = 1): Promise<number> {
  const indirectAccessMap = await getUserAccessMap(userId, idType);
  const id = indirectAccessMap.getDirectReference(rid);
  return id;
}

export async function mapIndirectAccessID(entity: MaskableEntity, idType: string, userId = 1): Promise<void> {
  const rid = await getIndirectReference(entity.id, idType, userId);
  entity.rid = rid;
}

export async function mapIndirectAccessIDs(entityList: MaskableEntity[], idType: string, userId = 1): Promise<void> {
  for (const e of entityList) {
    await mapIndirectAccessID(e, idType, userId);
  }
}

async function getUserAccessMap(userId: number, idType: string): Promise<AccessReferenceMap> {
  const key = `iam:${userId}:${idType}`;
  let indirectAccessMap: AccessReferenceMap = (await lruCache.get(key)) as AccessReferenceMap;
  if (indirectAccessMap === undefined) {
    indirectAccessMap = new AccessReferenceMap();
  }
  return indirectAccessMap;
}

async function updateUserAccessMap(
  userId: number,
  idType: string,
  indirectAccessMap: AccessReferenceMap
): Promise<void> {
  const key = `iam:${userId}:${idType}`;
  await lruCache.set(key, indirectAccessMap);
}
