import Income from "../models/incomeModel.js";
import { User } from "../models/userModel.js";

export const addIncome = async (req, res) => {
  try{
    const { title, amount, category, description, date} = req.body;
    if(!title || !amount || !category || !description || !date){
      return res.status(400).json({message: "All fields are required"});
    }
    const income = await Income.create({
      user: req.user._id,
      title,
      amount,
      category,
      description,
      date,
    });
    
    if(amount <= 0 || typeof amount !== 'number'){
      return res.status(400).json({message: "Amount must be a positive number"});
    }
    
    res.status(200).json({message: "Income added successfully", income});
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({user: req.user._id}).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const income = await Income.findOneAndDelete({_id:id,user: req.user._id,}).then((income) => {
            if (!income) {
                return res.status(404).json({ message: "Income not found" });
            }
            res.status(200).json({ message: "Income deleted successfully" });
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}