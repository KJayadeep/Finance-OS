import Expense from "../models/expenseModel.js";
import redis from "../config/redis.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    console.log(req.body);
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        message: "Amount must be a positive number",
      });
    }

    await redis.del(`expenses:${req.user._id.toString()}`);

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      description,
      date,
    });

    res.status(200).json({ message: "Expense added successfully", expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const key = `expenses:${userId}`;
    const cachedExpenses = await redis.get(key);
    if (cachedExpenses) {
      return res.status(200).json(JSON.parse(cachedExpenses));
    }
    const expenses = await Expense.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    await redis.set(key, JSON.stringify(expenses), "EX", 300);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }
    await redis.del(`expenses:${req.user._id.toString()}`);
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
