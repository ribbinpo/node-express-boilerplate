import { Request, Response, NextFunction } from "express";

import { ErrorHandler } from "../utils/error.util";
import Logger from "../configs/winston.config";

export const errorHandler = (
  err: Error | ErrorHandler,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    Logger.error(err.message);
    return err.send(res);
  } else {
    Logger.error(err.toString());
    return new ErrorHandler(500, err.toString()).send(res);
  }
};
