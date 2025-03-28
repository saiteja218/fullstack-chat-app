import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";
import { getReceiverSocketId,io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json({ users: filteredUsers })
    } catch (error) {
        console.log("Error in getUsersForSidebar", error.message)
        res.status(500).json({ message: "Server Error" })

    }
}

export const getMessages = async (req, res) => {
    try {
        // const { id: userToChatId } = req.params;
        const userToChatId = new mongoose.Types.ObjectId(req.params.id);
        // console.log(userToChatId)
        const myId = req.user._id;
        // console.log(myId)

        const query = {
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        };
        // console.log("Query:", query);
        const messages = await Message.find(query);
        // console.log("Retrieved Messages:", messages);
        res.status(200).json(messages)
        // console.log(messages)
    } catch (error) {
        console.log("Error in getMessages", error.message)
        res.status(500).json({ message: "Server Error" })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const senderId = req.user._id;
        const receiverId = req.params.id;


        let imageUrl;
        if (image) {
            const uplaodResponse = await cloudinary.uploader.upload(image)
            imageUrl = uplaodResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save();

        //todo- add socket.io functionality
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage", error.message)
        res.status(500).json({ message: "Server Error" })

    }
}

