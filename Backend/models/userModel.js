import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        minlength: 2,
        },
        email: {
        type: String,
        required: true,
        unique: true,
        },
        password: {
        type: String,
        required: true,
        },
        emailVerified: {
        type: Boolean,
        default: false,
        },
    },
    {timestamps: true}
)

export const User = mongoose.model("User", userSchema)

