import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
// import dotenv from "dotenv"
// dotenv.config();

const verifyAccessToken = async (req, res, next) =>{
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!accessToken) {
        return res.status(401).json(new ApiResponse(401, null, "Access denied. No token provided."));
    }

    

    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    console.log(process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

    
    req.user = user
    next();
}

const handleTokenExpiration = (req, res, next) =>{
    verifyAccessToken(req, res, (err) =>{
        if(err && err.message === 'jwt expired'){
            const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

            if(!refreshToken){
                return res.status(403).json({ message: 'Refresh token missing.' });
            }

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err){
                    return res.status(403).json(new ApiResponse(403, null, "Invalid Refresh Token"))
                }

                const newAccessToken = req.user.generateAccessToken()

                return res.json({ accessToken: newAccessToken });
            })
        }
        else{
            next()
        }
    })
}

export {verifyAccessToken, handleTokenExpiration}