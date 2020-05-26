import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  // Calling "private" is the equivalent of "this.errors".
  constructor(private errors: ValidationError[]) {
    super();

    // Required only bc we are extending a built-in class.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
