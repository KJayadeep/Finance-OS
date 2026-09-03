import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils.js";
import { generateOTP } from "../config/utils.js";
import { sendEmail } from "../config/utils.js";
import transporter from "../config/nodeMailer.js";
import redis from "../config/redis.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (user) {
      if (user.emailVerified) {
        return res
          .status(409)
          .json({ message: "An account with this email already exists" });
      }
      const otp = generateOTP();
      const otpKey = `email-otp:${email}`;

      await redis.set(otpKey, otp, "EX", 300);

      await sendEmail(
        email,
        "Email Verification",
        `Your OTP for email verification is: ${otp}. It will expire in 5 minutes.`,
      );

      return res.status(201).json({
        message: "Account created. OTP sent to your email.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hasedPassword,
      emailVerified: false,
    });

    const otp = generateOTP();
    const otpKey = `email-otp:${email}`;

    await redis.set(otpKey, otp, "EX", 300);

    await sendEmail(
      email,
      "Email Verification",
      `Your OTP for email verification is: ${otp}. It will expire in 5 minutes.`,
    );

    return res.status(201).json({
      message: "Account created. OTP sent to your email.",
    });

    // const token = generateToken(newUser._id);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    // res.status(201).json({
    //   message: "User created successfully",
    //   user: {
    //     id: newUser._id,
    //     name: newUser.name,
    //     email: newUser.email,
    //   },
    // });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error creating user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "user does not exist" });

    const validate = await bcrypt.compare(password, user.password);
    if (!validate)
      return res.status(401).json({ message: "Invalid credentials" });

    if (!user.emailVerified) {
      return res.status(403).json({
        message: "Please verify your email first",
      });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error logging in user",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const checkAuth = async (req, res) => {
  res.status(200).json({ user: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { name, password, confirmpassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) {
      user.name = name;
    }
    if (password) {
      if (password !== confirmpassword) {
        return res.status(400).json({ message: "Password do not Match" });
      }
      const salt = await bcrypt.genSalt(10);
      const hasedPassword = await bcrypt.hash(password, salt);
      user.password = hasedPassword;
    }
    await user.save();
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const storedOtp = await redis.get(`email-otp:${email}`);
    if (!storedOtp) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    if (storedOtp !== otp) {
      return res.status(400).json({ message: "OTP is invalid" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.emailVerified = true;
    await user.save();
    await redis.del(`email-otp:${email}`);

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
