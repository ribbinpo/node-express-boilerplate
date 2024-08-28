import { Router } from "express";

import exampleRouter from "./example.route";
import { errorHandler } from "../middlewares/error.middleware";

const router = Router();

router.use('/error', (req, res, next) => {
  next(new Error('This is an error for testing purposes'));
});

router.use("/example", exampleRouter);

router.use(errorHandler);

export default router;
