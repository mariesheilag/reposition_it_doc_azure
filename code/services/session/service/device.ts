import useragent from 'useragent';
import bcrypt from 'bcrypt';
import db from '@repositionit/shared/db';
import logger from '@repositionit/shared/logger';

export async function fingerprint(ua: string, ip: string) {
  const parsed = useragent.parse(ua);
  const hashed = bcrypt
    .hashSync(JSON.stringify({ ua, ip }), 4)
    .replace(/[^\w\s]/gi, '')
    .substr(0, 40);
  db('devices')
    .insert({
      fingerprint: hashed,
      useragent: ua,
      os: parsed.os.family,
      ip,
    })
    .catch(err => logger.error('Cannot create a fingerprinted device'));
  return hashed;
}
