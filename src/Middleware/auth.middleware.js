import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    // कुकीज़ से टोकन निकालना
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login required! No token found.",
      });
    }

    // टोकन को वेरीफाई (खोलना) करना
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // टोकन के अंदर से userId निकाल कर 'req' ऑब्जेक्ट में डालना
    // याद है तुमने sign करते वक्त 'userId' नाम रखा था? वही यहाँ मिलेगा।
    req.user = { id: decoded.userId };

    next(); // सब सही है, अब अगले फंक्शन (Controller) पर जाओ
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};