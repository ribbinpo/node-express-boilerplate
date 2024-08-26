import { Router, Response, Request, NextFunction } from "express";
import { body, matchedData, param } from "express-validator";

import { redisClient } from "../configs/redis.config";
import { SuccessHandler } from "../utils/response.util";
import { validateSchemaMiddleware } from "../middlewares/validator.middleware";
import { Repository } from "redis-om";
import { ItemCacheSchema } from "../models/cache.model";

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

// for assume fetch item from database slowly
const fetchItemSlowly = async (
  id: string
): Promise<{ id: string; name: string; price: number; quantity: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: "item", price: 1000, quantity: 10 });
    }, 3000);
  });
};

router.get(
  "/item/:id",
  [param("id").isString()],
  validateSchemaMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const { id } = matchedData(req) as { id: string };

    const redis = await redisClient();
    const itemCacheRepository = new Repository(ItemCacheSchema, redis);
    try {
      // exists in cache - 1 is true, 0 is false
      if (await redis.exists("item:" + id)) {
        const item = await itemCacheRepository.fetch(id);
        console.log("hit cache!!");
        console.log("elapsed time: ", Date.now() - start);
        return new SuccessHandler({ statusCode: 200, result: item }).send(res);
      } else {
        console.log("miss cache!!");
        const item = await fetchItemSlowly(id);
        console.log("elapsed time: ", Date.now() - start);
        await itemCacheRepository.save(id, item);
        await itemCacheRepository.expire(id, 60); // expired in 60 seconds
        return new SuccessHandler({ statusCode: 200, result: item }).send(res);
      }
    } catch (error) {
      next(error);
    } finally {
      redis.quit();
    }
  }
);

router.get(
  "/item/on-cache/:id",
  [param("id").isString()],
  validateSchemaMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const { id } = matchedData(req) as { id: string };

    try {
      const result = await fetchItemSlowly(id);
      console.log("elapsed time: ", Date.now() - start);
      return new SuccessHandler({ statusCode: 200, result }).send(res);
    } catch (error) {
      next(error);
    }
  }
);

// update item on cache
router.put(
  "/item/:id",
  [
    param("id").isString(),
    body("name").isString(),
    body("price").isNumeric(),
    body("quantity").isNumeric(),
  ],
  validateSchemaMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, ...body } = matchedData(req) as {
      id: string;
      name: string;
      price: number;
      quantity: number;
    };
    const redis = await redisClient();
    try {
      const itemCacheRepository = new Repository(ItemCacheSchema, redis);
      await fetchItemSlowly(id);
      // if operation is update, we need to update cache too
      if (await redis.exists("item:" + id)) {
        await itemCacheRepository.save(id, body);
        await itemCacheRepository.expire(id, 60); // expired in 60 seconds
      }
      return new SuccessHandler({
        statusCode: 200,
        message: "item is updated",
      }).send(res);
    } catch (error) {
      next(error);
    } finally {
      redis.quit();
    }
  }
);

export default router;
