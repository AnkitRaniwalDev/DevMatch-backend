import express from "express";
import { sendMessage, getMessages ,getFriends} from "../controllers/chat.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/send",auth,  sendMessage);// massej bhejne ke liye,
router.get("/get/:receiverId", auth, getMessages); //purane messages lene ke liye, receiverId URL se aayega
router.get("/friends", auth, getFriends); // accepted friends ke list ke liye

export default router;