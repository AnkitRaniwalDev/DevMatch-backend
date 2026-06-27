import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema', required: true },
    status: { type: String, 
             enum: ['pending', 'accepted', 'rejected'], 
             default: 'pending' 
    }
}, { timestamps: true });

export const chatRequest = mongoose.model("chatRequest", RequestSchema);