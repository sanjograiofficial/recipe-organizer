import express from 'express'
import path from 'node:path';

import { Router } from "express";
import authRouter from "./authRouter.js";
import recipeRouter from "./recipeRouter.js";
import userRouter from "./userRouter.js";
import ingredientRouter from "./ingredientRouter.js";
import stepRouter from "./stepRouter.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/recipes", recipeRouter);
router.use("/users", userRouter);
router.use("/ingredients", authMiddleware, ingredientRouter);
router.use("/steps", authMiddleware, stepRouter);

router.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src", "uploads"))
);

export default router;
