import { BioSchema } from "../models/bio.model.js";
export const bioController = async (req, res) => {
  try {
    const {  bio, skills, learning, portfolio, github, linkedin } = req.body;
    const user = req.user.id; // ye req .userId middleware se aaya hai, jisme hum user ke bio ko uske account se link kar rahe hai, taki hum user ke bio ko uske account se link kar sake
    const userBio = await BioSchema.findOne({ user: user }); // isme jo lift wala user h vo model schema ka fild se aaya h or :user right wala vo middelware ke liye use huaa hai, jisme hum user ke bio ko uske account se link kar rahe hai, taki hum user ke bio ko uske account se link kar sake

    if (!userBio) {
        await BioSchema.create({
        user:user,
        bio,
        skills,
        learning,
        portfolio,
        github,
        linkedin,
      });

    }
    return res.status(200).json({ success: true, message: "Bio saved successfully" });
    } catch (error) {
    return res.status(500).json({ success: false, message: error.message })}
};



export const getAllBios = async (req, res) => {
  try {
    
    const { search } = req.query; 

    let query = {}; 

    if (search) {
      query = {
        $or: [
          { bio: { $regex: search, $options: "i" } },
          // arry ke liye $in operator use karenge, taki agar search term skills ke kisi bhi element me match karta hai to us bio ko return kar de
          { skills: { $in: [new RegExp(search, "i")] } } 
        ]
      };
    }

    const allBios = await BioSchema.find(query).populate("user", "name email image");
    res.status(200).json({ success: true, allBios });

  } catch (error) {
  
    res.status(500).json({ success: false, message: error.message });
  }
};