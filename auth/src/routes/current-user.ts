import express from "express";

import { currentUser } from "@tombolo/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null }); // don't send back "undefined"
});

export { router as currentUserRouter };
