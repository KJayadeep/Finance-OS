
import { Router } from "express";
import { addIncome, getIncomes, deleteIncome} from "../controllers/addIncome.js";
import { addExpense, getExpenses, deleteExpense} from "../controllers/expense.js";

const transactionRouter = Router();

transactionRouter.post("/add-income",addIncome);
transactionRouter.get("/get-incomes", getIncomes);
transactionRouter.delete("/delete-income/:id", deleteIncome);
transactionRouter.post("/add-expense", addExpense);
transactionRouter.get("/get-expenses", getExpenses);
transactionRouter.delete("/delete-expense/:id", deleteExpense);

export default transactionRouter;