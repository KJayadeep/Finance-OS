
import { Router } from "express";
import { addIncome, getIncomes, deleteIncome} from "../controllers/addIncome.js";

const transactionRouter = Router();

transactionRouter.post("/add-income",addIncome);
transactionRouter.get("/get-incomes", getIncomes);
transactionRouter.delete("/delete-income/:id", deleteIncome);

export default transactionRouter;