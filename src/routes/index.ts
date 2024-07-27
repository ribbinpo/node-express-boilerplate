import { Router } from "express";

import exampleRouter from "./example.route";
import { errorHandler } from "../middlewares/error.middleware";

const router = Router();

router.use("/example", exampleRouter);

router.use(errorHandler);

export default router;
