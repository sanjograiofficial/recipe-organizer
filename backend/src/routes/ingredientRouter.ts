import { Router } from "express";
import { deleteIngredient, updateIngredient } from "../controllers/ingredientHandler.js";

const router = Router();

router.put('/:id', updateIngredient)
router.delete('/:id', deleteIngredient)

export default router