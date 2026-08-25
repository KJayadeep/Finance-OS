import Expense from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
  try{
    const { title, amount, category, description, date} = req.body;
    if(!title || !amount || !category || !description || !date){
      return res.status(400).json({message: "All fields are required"});
    }
    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      description,
      date,
    });

    if(amount <= 0 || typeof amount === 'number'){
      return res.status(400).json({message: "Amount must be a positive number"});
    }
    res.status(200).json({message: "Expense added successfully", expense});
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({user: req.user._id,}).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findOneAndDelete({_id:id,user: req.user._id}).then((expense) => {
            if (!expense) {
                return res.status(404).json({ message: "Expense not found" });
            }
            res.status(200).json({ message: "Expense deleted successfully" });
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}