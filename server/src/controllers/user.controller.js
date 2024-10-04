import {User} from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { sendVerificationEmail } from "../utils/emailSender.js"


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
        
        const {fullName, username, email, password, phoneNumber,emailVerified , verificationToken} = req.body
    
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

        const user = await User.create({
            fullName,
            username,
            phoneNumber,
            email,
            verificationToken,
            emailVerified,
            password
            
        })

        const verificationTokenVal = user.generateVerificationToken(user.email)

        sendVerificationEmail(email, fullName, `http://localhost:5000/${verificationToken}`)
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

const verifyingUser = async (err, req, res, next) =>{

    const {token} = req.params;

    
    const decoded = await jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET);
      
    if(!decoded){
        return res.status(401).json(new ApiResponse(401, null, "Invaild token"))
    }

    const user = await User.findOne({email: decoded.email})

    user.emailVerified = true
    user.verificationToken = ""

    user.save({validateBeforeSave: false})

    return res.status(201).json(new ApiResponse(201, null, "User has been verified"))
}

export {registerUser, verifyingUser};