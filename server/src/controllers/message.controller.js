import { Message } from "../models/message.model.js";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

export const getUsersForSidebar = async(req, res)=>{
    const loggedInUser = req.user._id;
    console.log(loggedInUser)
    try {
        const users = await User.find({_id: {$ne : loggedInUser}}).select("-password -refreshToken")
        if (!users) {
            return res.status(500).json(new ApiError(500, "User not found"))
        }
        
        return res.status(200).json(new ApiResponse(200, users, "All users has been fetched"))

    } catch (error) {
        return res.status(500).json(new ApiError(500, "Error while fetching profiles"))
    }
}

export const getMessages = async(req, res) =>{
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                {myId:myId, receiverId: userToChatId},
                {myId:userToChatId, receiverId:myId}
            ]
        })
    } catch (error) {
        
    }
}

export const sendMessage = async(req, res) =>{
    try{
        const {text, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const response = await uploadOnCloudinary();
            if(!response){
                return res.status(401).json(new ApiResponse(401, null, "Failed Uploading Picture to the Cloudinary"))
            }
            imageUrl = response.secure_url;

        }

        const newMessage = new Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        // todo : socket.io code is going to be here

        return res.status(201).json(new ApiResponse(201, newMessage, "Message Sent"))
        
    }catch(error){
        return res.status(500).json(new ApiError(500, error.message || "Something happened wrong while sending message"))
    }
}