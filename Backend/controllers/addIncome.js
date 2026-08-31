import Income from "../models/incomeModel.js";
import { User } from "../models/userModel.js";
import redis from "../config/redis.js";

export const addIncome = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        message: "Amount must be a positive number",
      });
    }

    await redis.del(`incomes:${req.user._id.toString()}`);

    const income = await Income.create({
      user: req.user._id,
      title,
      amount,
      category,
      description,
      date,
    });

    res.status(200).json({ message: "Income added successfully", income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIncomes = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const key = `incomes:${userId}`;

    const cachedIncomes = await redis.get(key);

    if (cachedIncomes) {
      return res.status(200).json(JSON.parse(cachedIncomes));
    }

    const incomes = await Income.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    await redis.set(key, JSON.stringify(incomes), "EX", 300);

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }
    await redis.del(`incomes:${req.user._id.toString()}`);
    return res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
