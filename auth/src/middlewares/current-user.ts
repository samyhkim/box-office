/* Middleware to extract the JWT payload and set it on 'req.currentUser".
 **
 ** Any time a user comes into a route with this current-user
 ** middleware applied to it, this middleware will attempt to
 ** find whether or not the user is logged in.
 **
 ** If they are not logged in, we will continue on, in which
 ** case the current user will be undefined.
 **
 ** But if they have a JWT, we will try to extract the payload
 ** and set it on currentUser so it can be used by other
 ** middlewares or the actual request handler.
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// modifies existing modules
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Must check "!req.session" first to ensure that this
  // route went through cookie session middleware and
  // created a req.session property.
  // "!req.session?.jwt" === "!req.session || !req.session.jwt"
  if (!req.session?.jwt) {
    return next(); // calls next middleware
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  // Whether we successfully decode the token successfully
  // or not, we want to call the next middleware.
  next();
};
