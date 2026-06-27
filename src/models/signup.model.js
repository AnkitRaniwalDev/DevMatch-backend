import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ye same email ko do baar database mein save nahi hone dega ya ek email ke multiple accounts nahi banne dega
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    default: "developer",
  }
}, { timestamps: true }); // Ye apne aap createdAt aur updatedAt filed bana dega database mein 

export const UserSchema = mongoose.model("UserSchema", userSchema);
