import {User} from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import { sendVerificationEmail } from "../utils/emailSender.js"
import jwt from "jsonwebtoken"
import upload from "../Middleware/Multer.js"


const generateAccessTokenAndRefreshToken = async (user_id) =>{
    try {
        const user = await User.findOne(user_id)
    
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();
    
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
    
        return {refreshToken, accessToken}
        
    } catch (error) {
        throw new ApiError(500, "Some went wrong while generating Access and Refresh Tokens")
    }

}

const generateVerificationToken = async (email) =>{
    try{
        const user = await User.findOne({email})
        const verification = user.generateVerificationToken();

        user.verificationToken = verification

        await user.save({validateBeforeSave:false})
    }catch(error){
        console.log("Error occured while generating the verification token ", error)
    }
}

const registerUser = async (req, res) =>{

    // get the data from frontend
    // check if the fields are filled with information it supposed to store
    // does anyone else have the account with the same email or phonenumber
    // hash the password
    // send the verification email to user
    // set the verified true to user if the user has verified it's email\

    try {
        
        const {fullName, username, email, password, phoneNumber,emailVerified, verificationToken} = req.body
    
        if([fullName, username, email, password, phoneNumber].some((field) => field?.trim() === "")){
            return res.status(409).json(new ApiResponse(409, null, "All fields are required"));
        }
    
        const userExists = await User.findOne({
            $or: [
              { email: email }, 
              { phoneNumber: phoneNumber },
              {username : username}
            ]
          }).then((user) => user ? true : false)
          
        if(userExists){
            return res.status(409).json(new ApiResponse(409, null, "This email, phone number, or username is already registered with us"));
        }

        const localProfilePicturePath = req.files?.profilePicture?.[0]?.path;
        
        if(!localProfilePicturePath){
            return res.status(400).json(new ApiResponse(400,{}, "please upload the file"))
        }

        const response = await uploadOnCloudinary(localProfilePicturePath)

        
        const user = await User.create({
            fullName,
            username,
            phoneNumber,
            email,
            verificationToken,
            emailVerified,
            password
            
        })

        user.profilePicture = response.url;
        await user.save;
        const verificationTokenVal = user.generateVerificationToken(user.email)
        user.verificationToken = verificationTokenVal;
        user.save({validateBeforeSave:false})
        sendVerificationEmail(email, fullName, `http://localhost:5173/verify/${verificationTokenVal}`)
        const createdUser = await User.findById(user._id).select("-password -refreshToken")
            // verificationToken = User.generateVerificationToken();
    
        return res
        .status(200)
        .json(new ApiResponse(200, createdUser,"The account has been created"
        ))
    } catch (err) {
       throw new ApiError(501, err.message || "Error occured while creating user")
    }
}

const verifyingUser = async (req, res) =>{

    const {token} = req.params;
    let decoded
    try {
        decoded = await jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET);
        if(!decoded){
            throw new ApiError(401, "Invalid Token")
        }
    } catch (error) {
        return res.json(new ApiResponse(401, null, error.message))
    }
      
    

    const user = await User.findOne({email: decoded.email})

    user.emailVerified = true
    user.verificationToken = ""

    user.save({validateBeforeSave: false})

    return res.status(201).json(new ApiResponse(201, null, "User has been verified"))
}

const loginUser = async (req, res) =>{
    const {email, password} = req.body;

    
    try{
        const user = await User.findOne({email})
        if(!user) throw new ApiError(404, "User not found")
        
        const isUserValid = await user.isPasswordCorrect(password)

        if(!isUserValid) throw new ApiError(401, "Incorrect password")

        if(!user.emailVerified){
            console.log(user.emailVerified)
            return res.json(new ApiResponse(400,null, "Please Verify your email"))
        }

        const {refreshToken, accessToken} = await generateAccessTokenAndRefreshToken(user._id);

        const loggedIn = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }
        
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(201, {user: loggedIn, accessToken, refreshToken}, "User has Logged In"))
        

    }catch(error){
        return res.json(new ApiResponse(error.statusCode,null, error.message))
    }

    
}

const logoutUser = async (req, res) =>{
    try{
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        )

        console.log(user)

        const options = {
            httpOnly: true,
            secure: true
        }

        user.save({validateBeforeSave:false})

    return res.clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "User has logout"))

    }
    catch(error){
        res.status(501, {}, "Error ")
    }
} 

const gettingAllUser = async (req, res) =>{
    try {
        const users = await User.findOne({}).select("-password -refreshToken")
        console.log(users)
        res.status(200).json(new ApiResponse(200, users, "All users has been fetched"))
        
    } catch (error) {
        res.status(500).json(new ApiError(500, "Error while fetching profiles"))
    }

}



export {registerUser, verifyingUser, loginUser, gettingAllUser, logoutUser};