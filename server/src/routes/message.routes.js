import express from "express"
import { getUsersForSidebar, getMessages, sendMessage, gettingRecieverUser } from "../controllers/message.controller.js";
import { verifyAccessToken } from "../Middleware/AccessTokenVerification.js";
 

const router = express.Router();

router.get("/users", verifyAccessToken, getUsersForSidebar )
router.get("/:id", verifyAccessToken, getMessages )
router.post("/send/:id", verifyAccessToken, sendMessage)
router.get("/receiver/:_id", verifyAccessToken, gettingRecieverUser)
export default router;