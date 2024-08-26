import { Router } from "express";
import { redisClient } from "../configs/redis.config";
import { SuccessHandler } from "../utils/response.util";

const router = Router();

router.get("/ping", async (_, res) => {
  const redis = await redisClient();
  try {
    const result = await redis.ping();
    return new SuccessHandler({ statusCode: 200, message: result }).send(res);
  } catch (error) {
  } finally {
    redis.quit();
  }
});

export default router;
