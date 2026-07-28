import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import type { Prisma } from "../generated/prisma/client.js";
import {
  addIngredientToRecipeService,
  deleteIngredientService,
  updateIngredientService,
} from "../service/ingredient.service.js";
import { log } from "node:console";
import {
  addIngredientValidationSchema,
  updateIngredientValidationSchema,
} from "../validators/ingredientValidator.js";
import { idValidator } from "../validators/idValidator.js";

const addIngredientToRecipe = asyncHandler(
  async (req: Request, res: Response) => {
    // zod validation
    const { name, quantity } = addIngredientValidationSchema.parse(req.body);
    const recipeId = idValidator.parse(req.params.recipeId);

    // check if user is logged in and has payload
    if (!req.user)
      return res.status(401).json({
        message: "Unauthorized",
      });

    // create ingredient
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
  // zod validation
  const { name, quantity } = updateIngredientValidationSchema.parse(req.body);
  const id = idValidator.parse(req.params.id);

  // check if the user is logged in and has payload
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // create an object to store only the updated fields
  const updateData: Prisma.IngredientUpdateInput = {};

  if (name !== undefined) updateData.name = name;
  if (quantity !== undefined) updateData.quantity = quantity;

  // error if no field updated
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: "No fields provided to update",
    });
  }

  // update ingredient
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
  // zod validation
  const id = idValidator.parse(req.params.id);

  // check if user is logged in and has payload
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // delete ingredient
  const deletedIngredient = await deleteIngredientService(
    Number(id),
    req.user.id,
  );
  res.status(200).json({
    message: "Deleted ingredient successfully",
    data: deletedIngredient,
  });
});

export { addIngredientToRecipe, updateIngredient, deleteIngredient };
