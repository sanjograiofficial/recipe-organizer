import type { Request, Response } from "express";
import prisma from "../db/prisma.js";

const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await prisma.recipe.findMany();
    if (recipes.length == 0)
      return res.status(404).json({
        message: "No recipes found",
      });
    res.status(201).json({
      message: "Fetched all recipes",
      data: recipes,
    });
  } catch (e) {
    res.status(400).json({
      message: "Failed to fetch recipes",
      e,
    });
  }
};
const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await prisma.recipe.findUnique({
      where: { id: Number(id) },
    });
    if (!recipe)
      return res.status(404).json({
        message: "No recipe with that id found",
      });
    res.status(201).json({
      message: "Fetched recipe successfully",
      data: recipe,
    });
  } catch (e) {
    res.status(400).json({
      message: "Failed to fetch recipe",
      e,
    });
  }
};
const createRecipe = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      prepTime,
      cookTime,
      servings,
      difficulty,
      category,
      image,
      userId,
    } = req.body;
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
        userId,
      },
    });
    res.status(201).json({
      message: "Created recipe successfully",
      data: recipe,
    });
  } catch (e) {
    res.status(400).json({
      message: "Failed to create recipe",
      e,
    });
  }
};

const updateRecipe = async (req: Request, res: Response) => {
  const {
    title,
    description,
    prepTime,
    cookTime,
    servings,
    difficulty,
    category,
    image,
    userId,
  } = req.body;
  const { id } = req.params;
  try {
    const recipe = await prisma.recipe.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        prepTime,
        cookTime,
        servings,
        difficulty,
        category,
        image,
        userId,
      },
    });
    if (!recipe)
      return res.status(404).json({
        message: "No recipe with that id found",
      });
    res.status(201).json({
      message: "Updated recipe successfully",
      data: recipe,
    });
  } catch (e) {
    res.status(400).json({
      message: "Failed to update recipe",
      e,
    });
  }
};

const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const recipe = await prisma.recipe.delete({
      where: { id: Number(id) },
    });
    if (!recipe)
      return res.status(404).json({
        message: "No recipe with that id found",
      });
    res.status(201).json({
      message: "Deleted recipe successfully",
      data: recipe,
    });
  } catch (e) {
    res.status(400).json({
      message: "Failed to delete recipe",
      e,
    });
  }
};

export {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
