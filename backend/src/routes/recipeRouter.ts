import { Router } from "express";
import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  updateRecipeImage,
} from "../controllers/recipeHandler.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { addIngredientToRecipe } from "../controllers/ingredientHandler.js";
import { addStepToRecipe } from "../controllers/stepHandler.js";

import path from "path";
import { fileURLToPath } from "url";
import { upload } from "../middleware/upload.middleware.js";

const fileNamePath = fileURLToPath(import.meta.url);
const dirpath = path.dirname(fileNamePath);

const router = Router();

// /recipes for routes
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", authMiddleware, createRecipe);
router.put("/:id", authMiddleware, updateRecipe);
router.delete("/:id", authMiddleware, deleteRecipe);

// for ingredient
router.post("/:recipeId/ingredients", authMiddleware, addIngredientToRecipe);

// for step
router.post("/:recipeId/steps", authMiddleware, addStepToRecipe);

// image upload
router.put("/:id/image", upload.single("image"), updateRecipeImage);
router.use("/", express.static(path.join(dirpath, "..", "/uploads/recipe")));

export default router;
