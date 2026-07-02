import { UserSchema } from "../models/signup.model.js";
import jwt from "jsonwebtoken";
export const signupController = async (req, res) => {
  try {
    const { name, email, image } = req.body;

    let user = await UserSchema.findOne({ email }); // check  user kro  same email already exists to nhi h database m phele se hi ager nhi h to new user create kro database m

    if (!user) {
      user = await UserSchema.create({
        name,
        email,
        image,

      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true, data: user, });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, });
  }
};