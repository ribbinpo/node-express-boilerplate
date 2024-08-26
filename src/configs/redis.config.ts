import { createClient } from "redis";
import IORedis from "ioredis";

export const redisClient = async () => {
  const redis = createClient();
  redis.on("error", (error) => {
    console.error(error);
  });
  await redis.connect();
  return redis;
};

export const ioRedisClient = () => {
  return new IORedis({
    maxRetriesPerRequest: null,
  });
};
