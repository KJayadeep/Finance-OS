import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import transactionRouter from "./routes/transactions.js";


dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/transactions", transactionRouter);

app.listen(process.env.PORT,() => {
    connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});