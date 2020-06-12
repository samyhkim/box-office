import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@tombolo/common";

const app = express();
app.set("trust proxy", true); // resolves ingress-nginx proxy issues
app.use(json());
app.use(
  cookieSession({
    signed: false, // JWT is already encrypted
    secure: false, // user's connection must be HTTPS
  })
);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
