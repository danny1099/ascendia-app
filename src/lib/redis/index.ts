import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis: Redis };

const redisOptions = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy(times: number) {
    return Math.min(times * 50, 2000);
  },
};

export const redis = globalForRedis.redis || new Redis(redisOptions);

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;
