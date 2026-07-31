import type { Request } from "express";
import prisma from "../db/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";
import type { Difficulty, Categories } from "../generated/prisma/client.js";

const getAllRecipesService = () =>
  prisma.recipe.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      ingredients: true,
      steps: true,
    },
  });

const getRecipeByIdService = (id: number) => {
  return prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      ingredients: true,
      steps: true,
    },
  });
};

type CreateRecipeDTO = {
  title: string;
  description?: string | undefined;
  prepTime?: number | undefined;
  cookTime?: number | undefined;
  servings?: number | undefined;
  difficulty?: Difficulty | undefined;
  category?: Categories | undefined;
  image?: string | undefined;
  userId: number;
};

const createRecipeService = (data: CreateRecipeDTO) => {
  const { userId, ...recipeData } = data;
  return prisma.recipe.create({
    data: {
      ...recipeData,
      description: recipeData.description ?? null,
      prepTime: recipeData.prepTime ?? null,
      cookTime: recipeData.cookTime ?? null,
      servings: recipeData.servings ?? null,
      difficulty: recipeData.difficulty ?? null,
      category: recipeData.category ?? null,
      image: recipeData.image ?? null,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

const updateRecipeService = async (
  id: number,
  userId: number,
  data: Prisma.RecipeUpdateInput,
) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
  });
  if (!recipe) throw new Error("Recipe not found");
  if (recipe.userId !== userId) throw new Error("Forbidden");

  return await prisma.recipe.update({
    where: {
      id,
    },
    data,
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      ingredients: true,
      steps: true,
    },
  });
};

const updateRecipeImageService = async (
  id: number,
  userId: number,
  imageUrl: string,
) => {
  const existingRecipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
  });
  if (!existingRecipe) throw new Error("No recipe found with that id");

  return await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      image: imageUrl,
    },
  });
};

const deleteRecipeService = async (id: number, userId: number) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
  });
  if (!recipe) throw new Error("Recipe not found");
  if (recipe.userId !== userId) throw new Error("Forbidden");
  return await prisma.recipe.delete({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      ingredients: true,
      steps: true,
    },
  });
};
export {
  getAllRecipesService,
  getRecipeByIdService,
  createRecipeService,
  updateRecipeService,
  updateRecipeImageService,
  deleteRecipeService,
};
