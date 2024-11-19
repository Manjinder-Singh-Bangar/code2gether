import { Router } from "express";
import { registerUser, verifyingUser, loginUser, gettingAllUser, logoutUser} from "../controllers/user.controller.js";
import upload from "../Middleware/Multer.js";
import { verifyAccessToken } from "../Middleware/AccessTokenVerification.js";
import { handleRefreshToken } from "../controllers/refresh.controller.js";

const router = Router();

router.route("/signup").post(upload.fields([
    {
        name: "profilePicture",
        maxCount: 1
    }
]),
    registerUser
)

router.route("/login").post(
    loginUser
)

router.route("/logout").post(verifyAccessToken, logoutUser)

router.route("/refresh").get(handleRefreshToken)
router.route("/people").get(verifyAccessToken, gettingAllUser)


router.route("/verify/:token").get(verifyingUser)

export default router;