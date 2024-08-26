// REF: https://medium.com/@techsuneel99/message-queue-in-node-js-with-bullmq-and-redis-7fe5b8a21475
import { Router, Response, Request, NextFunction } from "express";
import { Queue } from "bullmq";
import { body, matchedData } from "express-validator";

import { validateSchemaMiddleware } from "../middlewares/validator.middleware";
import { ioRedisClient } from "../configs/redis.config";

const router = Router();

// Job options
// delay: Delay job by x ms before processing
// attempts: Number of times to retry a failed job
// backoff: Backoff strategy on job failure
// lifo: Use LIFO order instead of FIFO
// priority: Numeric priority value. Higher is processed sooner
// repeat: Repeat job on a cron schedule

// Example: Backoff strategy - exponential or fixed

// await queue.add('email', jobData, {
//   backoff: {
//     type: 'exponential',
//     delay: 1000 // Initial 1 sec backoff
//   }
// })

// produce a job to the queue
router.post(
  "/add",
  [body("to").isString(), body("message").isString()],
  validateSchemaMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const { to, message } = matchedData(req) as { to: string; message: string };
    const redis = ioRedisClient();
    const queue = new Queue("my_queue", { connection: redis });
    try {
      const job = await queue.add(
        "mail",
        { to, message },
        {
          delay: 9000, // optional delay job for 9 seconds
        }
      );
      return res.status(201).json({ message: "added to queue", result: job });
    } catch (error) {
      console.error(error);
      next(error);
    } finally {
      await queue.close();
      await redis.quit();
    }
  }
);

export default router;
