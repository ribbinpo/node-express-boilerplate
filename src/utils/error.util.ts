class ErrorHandler extends Error {
  constructor(public statusCode: number, public message: string | any) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
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

export { ErrorHandler, BadRequestError, UnauthorizedError };
