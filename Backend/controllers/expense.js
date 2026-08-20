import Income from "../models/incomeModel.js";

export const addExpense = async (req, res) => {
  try{
    const { title, amount, category, description, date} = req.body;
    const income = await Income.create({
      title,
      amount,
      category,
      description,
      date,
    });
    if(!title || !amount || !category || !description || !date){
      return res.status(400).json({message: "All fields are required"});
    }
    if(amount <= 0 || amount === 'number'){
      return res.status(400).json({message: "Amount must be a positive number"});
    }
    await income.save();
    res.status(200).json({message: "Income added successfully", income});
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenses = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const income = await Income.findByIdAndDelete(id).then((income) => {
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