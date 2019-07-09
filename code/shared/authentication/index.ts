import fastify from 'fastify';
import { ServerResponse } from 'http';

import db from '@repositionit/shared/db';
import { verifyJwtFromKeyRing } from '@repositionit/shared/keyring';

interface Session {
  id: number;
}

export async function isSessionValid(jti: string, userId: string, fingerprint: string) {
  try {
    const session: Session = await db('sessions')
      .where('id', jti)
      .where('user_id', userId)
      .where('fingerprint', fingerprint)
      .where('expires_on', '>=', db.fn.now())
      .whereNull('revoked_on')
      .select(['id'])
      .first();
    return !!session;
  } catch (_err) {
    return false;
  }
}

export async function checkSession(
  request: fastify.FastifyRequest,
  reply: fastify.FastifyReply<ServerResponse>,
  next: () => void
) {
  const decoded: any = await verifyJwtFromKeyRing(request.headers.apitoken);
  const sessionValid = decoded ? await isSessionValid(decoded.jti, decoded.uid, request.headers.fingerprint) : false;
  if (!sessionValid) {
    reply.error({ code: '401', message: 'Please log in.' }, 401);
  } else {
    // request.params = { userId: decoded.uid };
    next();
  }
}
