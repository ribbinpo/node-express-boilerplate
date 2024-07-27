import { Request, Response, NextFunction } from "express";

import { ErrorHandler } from "../utils/error.util";

export const errorHandler = (
  err: Error | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      status: "Failed",
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "Failed",
      statusCode: 500,
      message: err,
    });
  }
};
