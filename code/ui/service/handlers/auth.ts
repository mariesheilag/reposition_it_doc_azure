// import LRU from 'lru-cache';
import uuidv1 from 'uuid/v1';
import get from 'lodash/get';

import db from '@repositionit/shared/db';
import * as keyring from '@repositionit/shared/keyring';

// const lruCache = new LRU({
//   maxAge: 1000 * 60 * 60 * 24,
// });

export async function getApiToken(uuid: string, fingerprint: string) {
  try {
    const decoded = await keyring.verifyJwtFromKeyRing(uuid);
    // const accessToken = await lruCache.get(`${get(decoded, ['id'])}:${fingerprint}`);
    const tokenMap = await db('tokens')
      .where('id', get(decoded, ['id']))
      .where('fingerprint', fingerprint)
      .first()
      .returning(['token']);
    return get(tokenMap, ['token']);
  } catch (err) {
    return undefined;
  }
}

export async function setAccessToken(token: string, fingerprint: string) {
  try {
    const id = uuidv1();
    // await lruCache.set(`${id}:${fingerprint}`, token);
    await db('tokens')
      .insert({ id, fingerprint, token })
      .returning(['id']);
    const accessToken = keyring.signJwtFromKeyRing({ id });
    return accessToken;
  } catch (err) {
    return undefined;
  }
}
