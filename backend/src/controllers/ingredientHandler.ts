import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import type { Prisma } from "../generated/prisma/client.js";
import {
  addIngredientToRecipeService,
  deleteIngredientService,
  updateIngredientService,
} from "../service/ingredient.service.js";

const addIngredientToRecipe = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, quantity } = req.body;
    const { recipeId } = req.params;

    if (!req.user)
      return res.status(401).json({
        message: "Unauthorized",
      });
    const createdIngredient = await addIngredientToRecipeService({
      name,
      quantity,
      recipeId: Number(recipeId),
      userId: req.user.id,
    });
    res.status(201).json({
      message: "Created ingredient successfully",
      data: createdIngredient,
    });
  },
);

const updateIngredient = asyncHandler(async (req: Request, res: Response) => {
  const { name, quantity } = req.body;
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const { id, recipeId } = req.params;

  const updateData: Prisma.IngredientUpdateInput = {};

  if (name !== undefined) updateData.name = name;
  if (quantity !== undefined) updateData.quantity = quantity;

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: "No fields provided to update",
    });
  }
  const updatedIngredient = await updateIngredientService(
    Number(id),
    req.user.id,
    updateData,
  );
  res.status(200).json({
    message: "Updated ingredient successfully",
    data: updatedIngredient,
  });
});

const deleteIngredient = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const deletedIngredient = await deleteIngredientService(Number(id), req.user.id);
  res.status(200).json({
    message: "Deleted ingredient successfully",
    data: deletedIngredient,
  });
});

export { addIngredientToRecipe, updateIngredient, deleteIngredient };
