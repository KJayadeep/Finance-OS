import { Router } from "express";
import { signup,login,checkAuth,logout} from "../controllers/auth.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.get("/check-auth",protect,checkAuth)


export default authRouter;