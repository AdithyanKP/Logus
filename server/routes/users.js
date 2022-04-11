import express from "express";

import {
  signin,
  signup,
  forgotPassword,
  resetPassword,
} from "../controllers/users.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
export default router;
