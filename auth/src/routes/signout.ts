import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  // Dumps user's browser cookie, which destorys user's
  // web token to prevent future follow up requests.
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
