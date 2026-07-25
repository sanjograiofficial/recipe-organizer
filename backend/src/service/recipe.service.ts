import prisma from "../db/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";
import type { Difficulty, Categories } from "../generated/prisma/client.js";

const getAllRecipesService = () => prisma.recipe.findMany();

const getRecipeByIdService = (id: number) => {
  return prisma.recipe.findUnique({
    where: {
      id,
    },
  });
};

type CreateRecipeDTO = {
  title: string;
  description?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: Difficulty;
  category?: Categories;
  image?: string;
  userId: number;
};

const createRecipeService = (data: CreateRecipeDTO) => {
  return prisma.recipe.create({
    data,
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
  });
};

const deleteRecipeService = async(id: number, userId: number) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
  });
  if (!recipe) throw new Error("Recipe not found");
  if (recipe.userId !== userId) throw new Error("Forbidden");
  return await prisma.recipe.delete({
    where: {
      id,
    },
  });
};
export {
  getAllRecipesService,
  getRecipeByIdService,
  createRecipeService,
  updateRecipeService,
  deleteRecipeService,
};
