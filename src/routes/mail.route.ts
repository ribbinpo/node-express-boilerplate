import { Router } from "express";

import mailSchema from "../schemas/mail.schema";
import mailController from "../controllers/mail.controller";
import { validateSchemaMiddleware } from "../middlewares/validator.middleware";

const router = Router();

router.post(
  "/send",
  mailSchema.send(),
  validateSchemaMiddleware,
  mailController.sendHello,
);

export default router;
