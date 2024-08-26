import { createClient } from "redis";

export const redisClient = async () => {
  const redis = createClient();
  redis.on("error", (error) => {
    console.error(error);
  });
  await redis.connect();
  return redis;
};
