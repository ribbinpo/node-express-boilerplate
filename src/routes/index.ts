import { Router } from "express";

import exampleRouter from "./example.route";
import { errorHandler } from "../middlewares/error.middleware";
import mailRouter from "./mail.route";

const router = Router();

router.use("/example", exampleRouter);
router.use("/mail", mailRouter);

router.use(errorHandler);

export default router;
