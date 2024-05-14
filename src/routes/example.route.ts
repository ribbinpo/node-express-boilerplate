import { Router } from "express";

import exampleController from "../controllers/example.controller";
import exampleSchema from "../schemas/example.schema";
import { validateSchemaMiddleware } from "../middlewares/validator.middleware";
import { param } from "express-validator";

const router = Router();

router.get("/", exampleController.getAll);

router.post(
  "/",
  exampleSchema.create(),
  validateSchemaMiddleware,
  exampleController.createOne
);

router.put(
  "/:id",
  exampleSchema.update(),
  validateSchemaMiddleware,
  exampleController.updateOne
);

router.delete(
  "/:id",
  [param("id").isString().notEmpty()],
  validateSchemaMiddleware,
  exampleController.deleteOne
);

export default router;
