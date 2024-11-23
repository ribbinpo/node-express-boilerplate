import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

import { ErrorHandler } from "../utils/response/error.util";

export const errorHandler: ErrorRequestHandler = (
  err: Error | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    res.status(err.statusCode).json({
      status: "Error",
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    res
      .status(500)
      .json({ status: "Error", statusCode: 500, message: err.message });
  }
};
