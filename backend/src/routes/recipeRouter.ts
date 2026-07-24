import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from "../controllers/recipeHandler.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", authMiddleware, createRecipe);
router.put("/:id", authMiddleware, updateRecipe);
router.delete("/:id", authMiddleware, deleteRecipe);

export default router;
