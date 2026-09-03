import jwt from "jsonwebtoken";
import transporter from "./nodeMailer.js";

export const generateToken = (userId) =>{
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN || "7d",})
    return token;
}   

export const generateOTP = () => {
    let otp = "";
    for(let i = 0;i<6;i++){
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}

export const sendEmail = async (to,subject,message) => {

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: `<p>${message}</p>`,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }   
}

