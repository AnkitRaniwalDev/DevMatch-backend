import express from "express";
import { sendChatRequest ,getNotifications,reviewRequest} from "../controllers/notification.controller.js";
import{ auth }from "../middleware/auth.middleware.js";


const router = express.Router();


router.post("/request/:receiverId", auth, sendChatRequest); // frondend se receiverId aayega URL ke through
router.get("/notifications", auth, getNotifications); // apni notifications lene ke liye
router.post("/review", auth, reviewRequest); // accept ya reject karne ke liye

export default router;

