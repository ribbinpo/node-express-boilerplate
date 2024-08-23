import { Response } from "express";

class ErrorHandler extends Error {
  status: string;

  constructor(public statusCode: number, public message: string | any) {
    super();
    this.status = "error";
    this.statusCode = statusCode;
    this.message = message;
  }

  send = (res: Response) => {
    return res.status(this.statusCode).json({
      status: "error",
      statusCode: this.statusCode,
      message: this.message,
    });
  };
}

class BadRequestError extends ErrorHandler {
  constructor(message: string | any = "Bad Request") {
    super(400, message);
  }
}

class UnauthorizedError extends ErrorHandler {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

class ForbiddenError extends ErrorHandler {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

class NotFoundError extends ErrorHandler {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

export {
  ErrorHandler,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
