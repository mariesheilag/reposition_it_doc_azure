import fastify from 'fastify';
import rl from 'fastify-rate-limit';

export default async function registerRateLimit(
  instance: fastify.FastifyInstance,
  opts: rl.FastifyRateLimitOptions = {}
) {
  instance.register(rl, {
    global: false,
    max: opts.max,
    timeWindow: opts.timeWindow,
  });
}
