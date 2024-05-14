import { Request, Response, NextFunction } from "express";
import { ResponseErrorMapping } from "../utils/response.util";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    console.error(err.stack);
    res
      .status(500)
      .send(ResponseErrorMapping({ status: 500, error: err.message }));
  }
  next();
};
