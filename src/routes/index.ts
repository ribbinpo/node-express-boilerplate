import { Router } from "express";

import exampleRouter from "./example.route";
import cacheRouter from "./cache.route";
import queueRouter from "./queue.route";
import { errorHandler } from "../middlewares/error.middleware";

const router = Router();

router.use("/example", exampleRouter);
router.use("/cache", cacheRouter);
router.use("/queue", queueRouter);

router.use(errorHandler);

export default router;
