import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import type { Prisma } from "../generated/prisma/client.js";
import {
  addStepToRecipeService,
  deleteStepService,
  updateStepService,
} from "../service/step.service.js";
import {
  addStepValidationSchema,
  updateSteptValidationSchema,
} from "../validators/stepValidator.js";
import { idValidator } from "../validators/idValidator.js";

const addStepToRecipe = asyncHandler(async (req: Request, res: Response) => {
  // zod validation
  const { order, content } = addStepValidationSchema.parse(req.body);
  const recipeId = idValidator.parse(req.params.recipeId);

  // check if user is logged in and has payload
  if (!req.user)
    return res.status(401).json({
      message: "Unauthorized",
    });

  // create step
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
  // zod validation
  const { order, content } = updateSteptValidationSchema.parse(req.body);
  const id = idValidator.parse(req.params.id);

  // check if user is logged in and has payload
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // create updateData object to store updated fields
  const updateData: Prisma.StepUpdateInput = {};

  if (order !== undefined) updateData.order = order;
  if (content !== undefined) updateData.content = content;

  // throw error if no fields is updated
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: "No fields provided to update",
    });
  }

  // update step
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
  // zod validator
  const id = idValidator.parse(req.params.id);

  // check if user is logged in and has payload
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // delete step
  const deletedStep = await deleteStepService(Number(id), req.user.id);
  res.status(200).json({
    message: "Deleted step successfully",
    data: deletedStep,
  });
});

export { addStepToRecipe, updateStep, deleteStep };
