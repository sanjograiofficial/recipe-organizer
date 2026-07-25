import { Router } from "express";
import authRouter from "./authRouter.js";
import recipeRouter from "./recipeRouter.js";
import userRouter from "./userRouter.js";
import ingredientRouter from './ingredientRouter.js'
import stepRouter from './stepRouter.js'

const router = Router();

router.use("/auth", authRouter);
router.use("/recipes", recipeRouter);
router.use("/users", userRouter);
router.use("/ingredients", ingredientRouter);
router.use("/steps", stepRouter);

export default router;
