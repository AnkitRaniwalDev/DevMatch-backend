import { chatRequest } from "../models/notification.model.js";

//notification frontend se backend me bhejne ke liye data base me save karne ke liye
export const sendChatRequest = async (req, res) => {
    try {
        const { receiverId } = req.params; // फ्रंटएंड से ${receiverId} आया
        const userId = req.user.id; // Middleware (auth) से तुम्हारी ID मिली

        // खुद को रिक्वेस्ट नहीं भेज सकते
        if (userId.toString() === receiverId) {
            return res.status(400).json({ success: false, message: "Apne aap ko request nahi bhej sakte!" });
        }

        const existingRequest = await chatRequest.findOne({ sender: userId, receiver: receiverId });
        if (existingRequest) {
            return res.status(400).json({ success: false, message: "Request pehle hi bheji ja chuki hai" });
        }
        const newRequest = new chatRequest({ sender: userId, receiver: receiverId });
        await newRequest.save();

        res.status(200).json({ success: true, message: "Request bhej di gayi hai!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// notifications backend se frontend me bhejne ke liye, taki usr ko frontend me notifications dikhe
export const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;

        const requests = await chatRequest.find({
            receiver: userId ,
           status: "pending"
        }).populate("sender", "name email image");

        res.status(200).json({
            success: true,
            requests: requests || []
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// frontend se accept ya ignore ke liye 

export const reviewRequest = async (req, res) => {
    try {
        const { requestId, status } = req.body; // फ्रंटएंड से 'accepted' या 'rejected' आएगा

        // रिक्वेस्ट ढूंढें और उसका स्टेटस अपडेट करें
        const request = await chatRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ success: false, message: "Request nahi mili!" });
        }

        request.status = status;
        await request.save();

        res.status(200).json({
            success: true,
            message: `Request ${status} ho gayi hai!`
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};