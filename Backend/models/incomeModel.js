import mongoose from "mongoose";

const incomeSchema = mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    amount: {
      type: Number,
      required: true,
      maxlength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: "Income",
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true, 
      maxlength: 100,
    },  
  },
  {
    timestamps: true,
  }
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;