import prisma from "../db/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";
import type { Difficulty, Categories } from "../generated/prisma/client.js";

type CreateIngredientDTO = {
  name: string;
  quantity: string;
  recipeId: number;
  userId: number;
};

const addIngredientToRecipeService = (data: CreateIngredientDTO) => {
  return prisma.ingredient.create({
    data,
  });
};

const updateIngredientService = async (
  id: number,
  userId: number,
  data: Prisma.IngredientUpdateInput,
) => {
  const ingredient = await prisma.ingredient.findUnique({
    where: { id },
    include: {
      recipe: {
        select: { userId: true },
      },
    },
  });
  if (!ingredient) throw new Error("Ingredient not found");
  if (ingredient.recipe.userId !== userId) throw new Error("Forbidden");

  return await prisma.ingredient.update({
    where: {
      id,
    },
    data,
  });
};

const deleteIngredientService = async (id: number, userId:number) => {
  const ingredient = await prisma.ingredient.findUnique({
    where: { id },
    include: {
      recipe: {
        select: { userId: true },
      },
    },
  });
  if (!ingredient) throw new Error("Ingredient not found");
  if (ingredient.recipe.userId !== userId) throw new Error("Forbidden");
  return await prisma.ingredient.delete({
    where: {
      id,
    },
  });
};
export {
  addIngredientToRecipeService,
  updateIngredientService,
  deleteIngredientService,
};
