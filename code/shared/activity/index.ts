import db from '@repositionit/shared/db';
import logger from '@repositionit/shared/logger';
import blacklist from './blacklist.json';

interface Identifiers {
  userId?: number;
  companyId?: number;
  fingerprint?: string;
  ip?: string;
}

interface Activity {
  context?: string;
  action?: string;
  message?: string;
  payload?: any;
  identifiers?: Identifiers;
}

export function sanitizeContextAction(ctxOrAction: string) {
  return ctxOrAction
    .substr(0, 24)
    .toLowerCase()
    .replace(/[^\w \s]/gi, '')
    .replace(/ /, '');
}

export function sanitizePayload(payload: any) {
  // recursive function to check and filter out values
  function checkForPropertyOccurence(data: any): any {
    for (const key of Object.keys(data)) {
      if (typeof data[key] === 'object') {
        data[key] = checkForPropertyOccurence(data[key]);
      } else if (Array.isArray(data[key]) === true) {
        for (const index in data[key]) {
          if (data[key][index]) {
            data[key][index] = checkForPropertyOccurence(data[key][index]);
          }
        }
      } else if (blacklist.includes(key)) {
        data[key] = '*'.repeat(data[key].length);
      }
    }
    return data;
  }
  return checkForPropertyOccurence(payload);
}

export function sanitizeEmail(text: string) {
  const matches = text.match(/\S+[a-z0-9]@[a-z0-9\.]+/gim);
  if (matches) {
    for (const match of matches) {
      const matchSplit: string[] = match.split('@');
      text = text.replace(match, `${'*'.repeat(matchSplit[0].length)}@${matchSplit[1]}`);
    }
  }
  return text;
}

export function sanitizeMessage(message: string) {
  message = sanitizeEmail(message);
  return message.substr(0, 255);
}

export async function sendEmail({ to, message }: any) {
  // TODO: Send Email
  logger.info(`Sending Email Message: ${message}`);
}

export function write(message: Activity | string, activity?: Activity): void {
  let identifiers: Identifiers = {};
  let context: string | null;
  let action: string | null;
  let msg: string | null;
  let payload: any;
  activity = typeof message === 'object' ? message : {};
  identifiers = activity.identifiers || {};
  context = activity.context ? sanitizeContextAction(activity.context) : null;
  action = activity.action ? sanitizeContextAction(activity.action) : null;
  msg = activity.message ? sanitizeMessage(activity.message) : null;
  payload = activity.payload ? sanitizePayload(activity.payload) : {};
  const { companyId, userId, fingerprint, ip } = identifiers;
  db('activities')
    .insert({
      context,
      action,
      message: msg,
      data: payload,
      user_id: userId,
      company_id: companyId,
      fingerprint,
      ip,
    })
    .then(() => null);
}
