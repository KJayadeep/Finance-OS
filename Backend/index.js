import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import transactionRouter from "./routes/transactions.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

//routes
app.use("/api/transactions", transactionRouter);
app.use("/api/auth/",authRouter)

app.listen(process.env.PORT,() => {
    connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});