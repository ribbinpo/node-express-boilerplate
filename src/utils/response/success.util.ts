import { Response } from "express";

class SuccessHandler<T> {
  message?: string;
  result?: T;
  status = "Success";

  constructor(
    public statusCode = 200,
    {
      message,
      result,
    }: {
      message?: string;
      result?: T;
    }
  ) {
    this.status = "Success";
    this.statusCode = statusCode;
    this.message = message;
    this.result = result;
  }
  handle = (res: Response) => {
    res.status(this.statusCode).json({
      status: this.status,
      statusCode: this.statusCode,
      message: this.message,
      result: this.result,
    });
  };
}

export { SuccessHandler };
