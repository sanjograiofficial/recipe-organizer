import type { Request, Response } from "express";
import prisma from "../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import type { Prisma } from "../generated/prisma/client.js";

const getAllRecipes = asyncHandler(async (req: Request, res: Response) => {
  const recipes = await prisma.recipe.findMany();
  if (recipes.length == 0)
    return res.status(404).json({
      message: "No recipes found",
    });
  res.status(200).json({
    message: "Fetched all recipes",
    data: recipes,
  });
});

const getRecipeById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const recipe = await prisma.recipe.findUnique({
    where: { id: Number(id) },
  });
  if (!recipe)
    return res.status(404).json({
      message: "No recipe with that id found",
    });
  res.status(200).json({
    message: "Fetched recipe successfully",
    data: recipe,
  });
});

const createRecipe = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    description,
    prepTime,
    cookTime,
    servings,
    difficulty,
    category,
    image,
  } = req.body;
  if (!req.user)
    return res.status(401).json({
      message: "Unauthorized",
    });
  const recipe = await prisma.recipe.create({
    data: {
      title,
      description,
      prepTime,
      cookTime,
      servings,
      difficulty,
      category,
      image,
      userId: req.user.id,
    },
  });
  res.status(201).json({
    message: "Created recipe successfully",
    data: recipe,
  });
});

const updateRecipe = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    description,
    prepTime,
    cookTime,
    servings,
    difficulty,
    category,
    image,
  } = req.body;
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const { id } = req.params;

  const updateData: Prisma.RecipeUpdateInput = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (prepTime !== undefined) updateData.prepTime = prepTime;
  if (cookTime !== undefined) updateData.cookTime = cookTime;
  if (servings !== undefined) updateData.servings = servings;
  if (difficulty !== undefined) updateData.difficulty = difficulty;
  if (category !== undefined) updateData.category = category;
  if (image !== undefined) updateData.image = image;
  
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: "No fields provided to update",
    });
  }
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!recipe)
    return res.status(404).json({
      message: "Recipe not found",
    });

  if (recipe.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
  const updatedRecipe = await prisma.recipe.update({
    where: { id: Number(id) },
    data: updateData,
  });
  res.status(200).json({
    message: "Updated recipe successfully",
    data: updatedRecipe,
  });
});

const deleteRecipe = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!recipe)
    return res.status(404).json({
      message: "Recipe not found",
    });

  if (recipe.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
  const deletedRecipe = await prisma.recipe.delete({
    where: { id: Number(id) },
  });
  res.status(200).json({
    message: "Deleted recipe successfully",
    data: deletedRecipe,
  });
});

export {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
