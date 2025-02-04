const jwt = require("jsonwebtoken");
const User=require("../Models/UserModel")
  
exports.VerifyJwt = async (req, res, next) => {
    try {
      
        const token = req.cookies.token 

        if (!token) {
            return res.status(401).json({ message: "Access Denied! No token provided." });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }

            req.user = decoded;
            next();
        });

    } catch (error) {
        console.error("Error in token verification:", error);
        return res.status(500).json({ message: "Error in verifying token" });
    }
};
