import express from "express"
import { verifyAccessToken } from "../Middleware/AccessTokenVerification";
import { getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", verifyAccessToken, getUsersForSidebar )
router.get("/:id", verifyAccessToken, getMessages )
router.post("/send/:id", verifyAccessToken, sendMessage)
export default router;