import { Message } from "../models/chat.model.js";
import { chatRequest } from "../models/notification.model.js"; 



// massage bhejne ka function data base mein save karne ke liye
export const sendMessage = async (req, res) => {
    try {
        const { receiverId, message } = req.body;
        const senderId = req.user.id;

        // data base me 'senderId' or 'receiverId'
        const newMessage = new Message({
            senderId, 
            receiverId,
            message
        });

        await newMessage.save();
        res.status(201).json({ success: true, newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//  backend se frontend massage ko sand kerna aur purane messages ko lana jab koi chat select kare 
export const getMessages = async (req, res) => {
    try {
        const { receiverId } = req.params;
        const senderId = req.user.id;

        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// backend se friend list ko sand kerna frontend per
export const getFriends = async (req, res) => {
    try {
        const userId = req.user.id;
        const friends = await chatRequest.find({
            status: "accepted",
            $or: [{ sender: userId }, { receiver: userId }]
        }).populate("sender", "name email image").populate("receiver", "name email image");

        const cleanFriends = friends.map(friend => {
            const otherUser = friend.sender._id.toString() === userId.toString() ? friend.receiver : friend.sender;
            return { _id: friend._id, otherUser, myId: userId };
        });

        res.status(200).json({ success: true, friends: cleanFriends });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};