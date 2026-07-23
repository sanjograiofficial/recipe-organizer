import { Router } from "express";
import authRouter from "./authRouter.js";
import recipeRouter from "./recipeRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/recipe", recipeRouter);

export default router;
