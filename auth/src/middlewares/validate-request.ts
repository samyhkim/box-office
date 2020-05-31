import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // append errors to req object
  const errors = validationResult(req);

  // return error back to client if errors exist
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
