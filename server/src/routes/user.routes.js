import { Router } from "express";
import { registerUser, verifyingUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post(
    registerUser
)

router.route("/verify/:token").get(verifyingUser)

export default router;