import mongoose from "mongoose";

const bioSchema = new mongoose.Schema({
  user: { // ye user field hai jo user ke bio ko uske account se link karega
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema", // ye userSchema  ke model se aaya hai, taki hum user ke bio ko uske account se link kar sake
    required: true,
  },
  bio: { type: String, required: true },
  skills: { type: [String], required: true }, // [String] iska matlab hai is arry ke ander kafi sare string aa sakte hai, aur required: true iska matlab hai ye field fill karna zaruri hai
  learning: { type: [String], required: true },
  portfolio: { type: String },
  github: { type: String },
  linkedin: { type: String },
}, { timestamps: true });

export const BioSchema = mongoose.model("BioSchema", bioSchema);