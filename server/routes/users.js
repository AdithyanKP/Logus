import express from "express";

import { signin, signup, forgotPassword } from "../controllers/users.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
export default router;
