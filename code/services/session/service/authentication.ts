import bcrypt from 'bcrypt';
import db from '@repositionit/shared/db';
import jwt from 'jsonwebtoken';
import * as date from 'date-fns';
import * as activity from '@repositionit/shared/activity';

const BCRYPT_ROUNDS = 4;
const OTP_TTL = 90;
const JWT_TTL = 86400;

interface User {
  id: number;
}

interface Otp {
  id: number;
  userId: number;
}

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

export async function createOtp(userId: number, fingerprint: string, ip: string) {
  const otp = bcrypt.hashSync(JSON.stringify({ userId: Number(userId), fingerprint, ip }), BCRYPT_ROUNDS);
  db('otp')
    .insert({
      user_id: userId,
      otp,
      expires_on: date.addSeconds(new Date(), OTP_TTL),
    })
    .then(() => null);
  return String(otp);
}

export async function createUserByEmail(email: string) {
  const existing: User = await db('users')
    .where('email', email.toLowerCase())
    .whereNull('archived_on')
    .first('id');
  if (existing) {
    throw new Error('User exists');
  }
  const user: User[] = await db('users')
    .insert({ email: email.toLowerCase() })
    .returning('id');
  return Number(user[0]);
}

export async function getUserIdByEmail(email: string) {
  const user: User = await db('users')
    .where('email', email.toLowerCase())
    .whereNull('archived_on')
    .select(['id'])
    .first();
  if (!user) {
    throw new Error('No user');
  }
  return Number(user.id);
}

export async function checkOtpAsValid(token: string) {
  const otp: Otp = await db('otp')
    .where('otp', token)
    .where('expires_on', '>=', db.fn.now())
    .whereNull('verified_on')
    .select(['user_id', 'id'])
    .first();
  if (!otp) {
    throw new Error('OTP is invalid');
  }
  // @FIXME invalidate older tokens
  return {
    id: Number(otp.id),
    user_id: Number(otp.userId),
  };
}

export async function markOtpAsUsed(id: number) {
  await db('otp')
    .where('id', id)
    .update({
      verified_on: db.fn.now(),
    });
}

export async function generateAccess(fingerprint: string, userId: number, additionData?: any) {
  const jwtid = await db('sessions')
    .where('fingerprint', fingerprint)
    .where('user_id', userId)
    // revoke every session before this
    .update('revoked_on', db.fn.now())
    .then(() =>
      db('sessions')
        .insert({
          user_id: userId,
          fingerprint,
          expires_on: date.addSeconds(new Date(), JWT_TTL),
        })
        .returning('id')
    );
  return signJwtFromKeyRing(
    {
      uid: userId,
      // add permission matrix here
    },
    {
      jwtid: String(jwtid),
      issuer: `reposition.it@${process.env.NODE_ENV}`,
      audience: `reposition.it@${process.env.NODE_ENV}:ui`,
      expiresIn: JWT_TTL,
    }
  );
}

export async function start(email: string, fingerprint: string, ip: string) {
  const userId = await getUserIdByEmail(email);
  const token = await createOtp(userId, fingerprint, ip); // @TODO how do we expose this
  activity.sendEmail({
    to: email,
    message: `Click the link to login: ${process.env.PROXY_URL}/login/continue?token=${token}`,
  });
  activity.write('login attempt', {
    context: 'session',
    action: 'login',
    identifiers: { userId, fingerprint, ip },
  });
  return token;
}

export async function proceed(token: string, fingerprint: string, ip: string) {
  const otp = await checkOtpAsValid(token);
  if (bcrypt.compareSync(JSON.stringify({ userId: Number(otp.user_id), fingerprint, ip }), token)) {
    await markOtpAsUsed(otp.id);
    const accessToken = await generateAccess(fingerprint, otp.user_id);
    activity.write('login successful', {
      context: 'session',
      action: 'login',
      identifiers: { userId: otp.user_id, fingerprint, ip },
    });
    return { accessToken };
  }
  activity.write('login failed. token mismatch', {
    context: 'session',
    action: 'login',
    identifiers: {
      userId: otp.user_id,
      fingerprint,
      ip,
    },
  });
  throw new Error('OTP is invalid');
}
