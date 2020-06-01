/* Middleware to reject the request if the user is not logged in.
 **
 ** Makes a big assumption that this middleware will not be used
 ** before the current-user middleware.
 **
 ** By the time require-auth middleware is run, we should have
 ** checked for a JWT, decoded it, and set it on req.currentUser.
 */

import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
