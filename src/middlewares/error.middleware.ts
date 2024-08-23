import { Request, Response, NextFunction } from "express";

import { ErrorHandler } from "../utils/error.util";

export const errorHandler = (
  err: Error | ErrorHandler,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    return err.send(res);
  } else {
    return new ErrorHandler(500, err.toString()).send(res);
  }
};
