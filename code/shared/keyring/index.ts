import jwt from 'jsonwebtoken';

export function getKeyFromKeyRing(): [string, number] {
  const key = String(process.env.JWT_SYNC_SECRET).split(',');
  return [key[key.length - 1], key.length - 1];
}

export function getKeysFromKeyRing(): string[] {
  return String(process.env.JWT_SYNC_SECRET)
    .split(',')
    .reverse();
}

export async function signJwtFromKeyRing(data: any, opts?: any) {
  const key = getKeysFromKeyRing()[0];
  return jwt.sign(data, key, opts);
}

export async function verifyJwtFromKeyRing(hashed: any, opts?: any) {
  const keys = getKeysFromKeyRing();
  let verified;
  for (const key of keys) {
    try {
      verified = jwt.verify(hashed, key, opts);
    } catch (e) {
      continue;
    }
  }
  return verified;
}
