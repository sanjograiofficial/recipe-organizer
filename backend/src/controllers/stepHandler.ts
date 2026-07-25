import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import type { Prisma } from "../generated/prisma/client.js";
import { addStepToRecipeService, deleteStepService, updateStepService } from "../service/step.service.js";

const addStepToRecipe = asyncHandler(async (req: Request, res: Response) => {
  const { order, content } = req.body;
  const { recipeId } = req.params;

  if (!req.user)
    return res.status(401).json({
      message: "Unauthorized",
    });
  const createdStep = await addStepToRecipeService({
    order,
    content,
    recipeId: Number(recipeId),
    userId: req.user.id,
  });
  res.status(201).json({
    message: "Created step successfully",
    data: createdStep,
  });
});

const updateStep = asyncHandler(async (req: Request, res: Response) => {
  const { order, content } = req.body;
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const { id } = req.params;

  const updateData: Prisma.StepUpdateInput = {};

  if (order !== undefined) updateData.order = order;
  if (content !== undefined) updateData.content = content;

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: "No fields provided to update",
    });
  }
  const updatedStep = await updateStepService(
    Number(id),
    req.user.id,
    updateData,
  );
  res.status(200).json({
    message: "Updated step successfully",
    data: updatedStep,
  });
});

const deleteStep = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const deletedStep = await deleteStepService(Number(id), req.user.id);
  res.status(200).json({
    message: "Deleted step successfully",
    data: deletedStep,
  });
});

export { addStepToRecipe, updateStep, deleteStep };
