import { Queue, ConnectionOptions } from "bullmq";

export const connection: ConnectionOptions = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
};

export const evaluationQueue = new Queue("evaluation", { connection });
export const aiQueue = new Queue("ai", { connection });

export const queues = {
  evaluation: evaluationQueue,
  ai: aiQueue,
};
