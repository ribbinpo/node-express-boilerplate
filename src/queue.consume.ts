// REF: https://medium.com/@techsuneel99/message-queue-in-node-js-with-bullmq-and-redis-7fe5b8a21475
// REF: https://docs.bullmq.io/guide/workers/auto-removal-of-jobs
import { Queue, Worker } from "bullmq";
import { ioRedisClient } from "./configs/redis.config";

const queue = () => {
  const redis = ioRedisClient();
  const queue = new Queue("my_queue", { connection: redis });

  const worker = new Worker(
    "my_queue",
    async (job) => {
      // Process the job
      console.log("Processing job:", job.id, job.data);
      // Simulate a task
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log("Job completed:", job.id);
    },
    {
      connection: redis,
      concurrency: 3,
      limiter: { max: 5, duration: 1000 },
      removeOnComplete: { count: 1000, age: 3600 }, // age - keep jobs for 1 hour, count - keep 1000 jobs
    }
  );

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed!`);
  });

  worker.on("failed", (job, err) => {
    if (job) console.log(`Job ${job.id} failed:`, err);
  });

  return { worker, queue };
};

// queue event: completed, active, waiting, paused, failed, resumed, cleaned - common
// job bullmq lifecycle: waiting, delayed, active, completed, failed, delayedRetry, paused

export default queue;
