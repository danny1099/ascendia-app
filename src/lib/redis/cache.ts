import { redis } from "@/lib/redis";

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  },

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    const data = JSON.stringify(value);
    if (ttlSeconds) {
      await redis.set(key, data, "EX", ttlSeconds);
    } else {
      await redis.set(key, data);
    }
  },

  async del(key: string): Promise<void> {
    await redis.del(key);
  },

  async flush(): Promise<void> {
    await redis.flushall();
  },
};
