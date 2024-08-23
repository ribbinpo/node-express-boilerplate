import { Response } from "express";

class SuccessHandler<T> {
  statusCode: number;
  memsage?: string;
  result?: T;
  status = "success";

  constructor({
    statusCode = 200,
    message,
    result,
  }: {
    statusCode?: number;
    message?: string;
    result?: T;
  }) {
    this.statusCode = statusCode;
    this.memsage = message;
    this.result = result;
  }

  send = (res: Response) => {
    return res.status(this.statusCode).json({
      status: this.status,
      message: this.memsage,
      result: this.result,
    });
  };
}

export { SuccessHandler };
