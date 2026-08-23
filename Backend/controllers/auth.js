import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, hasedPassword });

    const token = generateToken(newUser._id);

    res.status(201).json({ token, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error creating user" });
  }
};

export const login = async (req,res) => {
    try {

        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({email});
        if(!user) return res.status(401).json({message:"user does not exist"})
        
        const validate = await bcrypt.compare(password,user.password)
        if(!validate) return res.json({message:"Invalid credentials"})

        const token = generateToken(user._id);
        res..json({ token, message: "User logged in successfully" });


    } catch (error) {
        
    }
}
