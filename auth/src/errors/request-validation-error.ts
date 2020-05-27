import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  statusCode = 400;

  // Calling "private" is the equivalent of "this.errors".
  constructor(public errors: ValidationError[]) {
    super();

    // Required only bc we are extending a built-in class.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { messsage: err.msg, field: err.param };
    });
  }
}
