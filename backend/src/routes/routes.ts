import { Router } from "express";
import authRouter from "./authRouter.js";
import recipeRouter from "./recipeRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/recipe", recipeRouter);
router.use("/users", userRouter);

export default router;
