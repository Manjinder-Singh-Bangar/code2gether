import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { configDotenv } from "dotenv";
configDotenv();

const handleRefreshToken = async (req, res) =>{
    const cookies = req.cookies
    console.log(cookies)
    if(!cookies?.refreshToken) return res.status(401).json(new ApiError(401, "No cookies were found"))
    
    const refreshToken = cookies.refreshToken;

    const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )
    if(!decoded) return res.status(401).json(new ApiError(403, "Unauthorized"))

    const user = await User.findById(decoded._id)
    
    const accessToken = user.generateAccessToken()

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(201,accessToken, "Access Token Generated"))
}

export {handleRefreshToken}
