import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from "../controllers/recipeHandler.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { addIngredientToRecipe } from "../controllers/ingredientHandler.js";

const router = Router();

// /recipe for routes
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", authMiddleware, createRecipe);
router.put("/:id", authMiddleware, updateRecipe);
router.delete("/:id", authMiddleware, deleteRecipe);

// for ingredient
router.post("/:recipeId/ingredients", addIngredientToRecipe);

export default router;
