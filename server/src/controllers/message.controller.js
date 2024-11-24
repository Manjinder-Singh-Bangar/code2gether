import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { getReceiverSocketId, io } from "../utils/Socket.js";

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
                {senderId:myId, receiverId: userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        if(!messages) return res.status(401).json(new ApiResponse(401, null, "No messages found"))

        return res.status(200).json(new ApiResponse(200, messages, "Messages Fetched"))
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


        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        const newMessageData = {
            _id: newMessage._id,
            senderId: newMessage.senderId.toString(),
            receiverId: newMessage.receiverId.toString(),
            text: newMessage.text,
            image: newMessage.image,
        }

        const receiverSocketId = getReceiverSocketId(receiverId);
        console.log("receiverSocketId ", receiverSocketId)
        console.log("receiverId ", receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessageData)
            console.log("Message sent to the receiver ", newMessageData)
        }

        return res.status(201).json(new ApiResponse(201, newMessage, "Message Sent"))
        
    }catch(error){
        return res.status(500).json(new ApiError(500, error.message || "Something happened wrong while sending message"))
    }
}

export const gettingRecieverUser = async (req,res) =>{
    try {
        const {_id} = req.params
        console.log(_id)
        if(!_id) return res.status(401).json(new ApiResponse(401, null, "No user selected"))
        
        const receiverUser = await User.findById(_id).select("-password -refreshToken")
    
        if(!receiverUser) return res.status(401).json(new ApiResponse(401, null, "User does not exists"))
        
        return res.status(200).json(new ApiResponse(200, receiverUser, "Receiver Fetched"))
        
    } catch (error) {
        return res.status(401).json(new ApiError(401, error.message || "Cannot find reciever"))
    }
    
}