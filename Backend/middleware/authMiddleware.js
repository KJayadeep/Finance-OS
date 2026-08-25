import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const protect = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "invlaid user" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(401).json({ message: "user no longer exists" });
    req.user = user
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired, please log in again" });
    }
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
