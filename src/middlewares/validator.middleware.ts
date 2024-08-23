import { Request, Response, NextFunction } from "express";
import { ValidationError, validationResult } from "express-validator";
import { BadRequestError } from "../utils/error.util";

export const validateSchemaMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw new BadRequestError(result.array());

  next();
};
