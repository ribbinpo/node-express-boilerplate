import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateSchemaMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  res.status(400).send({ errors: result.array() });
};
