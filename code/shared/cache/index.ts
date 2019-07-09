import Redis from 'ioredis';

export default new Redis(process.env.REDIS_HOST || 'redis://127.0.0.1:6379', {
  lazyConnect: true,
  enableOfflineQueue: true,
  enableReadyCheck: true,
  retryStrategy: (times: number) => Math.min(times * 10, 1000),
});
