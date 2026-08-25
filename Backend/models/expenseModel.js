import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
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
      default: "Expense",
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

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;