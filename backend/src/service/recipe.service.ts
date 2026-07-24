import prisma from "../db/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

const getAllRecipesService = async () => {
  return await prisma.recipe.findMany();
};

const getRecipeByIdService = async (id: number) => {
  return await prisma.recipe.findUnique({
    where: {
      id,
    },
  });
};

const createRecipeService = async (data: Prisma.RecipeCreateInput) => {
  return await prisma.recipe.create({
    data,
  });
};

const updateRecipeService = async (
  id: number,
  data: Prisma.RecipeUpdateInput,
) => {
  return await prisma.recipe.update({
    where: {
      id,
    },
    data,
  });
};

const deleteRecipeService = async (id: number) => {
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
