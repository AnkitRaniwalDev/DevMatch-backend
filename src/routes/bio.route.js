import express from "express";
import { bioController,getAllBios ,} from "../controllers/bio.controller.js";
import { auth} from "../Middleware/auth.middleware.js";

const router = express.Router();

router.post("/bio",auth, bioController);
router.get("/all", getAllBios);



export default router;