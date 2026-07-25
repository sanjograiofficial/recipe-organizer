import prisma from "../db/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

type CreateStepDTO = {
  order: number;
  content: string;
  recipeId: number;
  userId: number;
};

const addStepToRecipeService = (data: CreateStepDTO) => {
  return prisma.step.create({
    data,
  });
};

const updateStepService = async (
  id: number,
  userId: number,
  data: Prisma.StepUpdateInput,
) => {
  const step = await prisma.step.findUnique({
    where: { id },
    include: {
      recipe: {
        select: { userId: true },
      },
    },
  });
  if (!step) throw new Error("Step not found");
  if (step.recipe.userId !== userId) throw new Error("Forbidden");

  return await prisma.step.update({
    where: {
      id,
    },
    data,
  });
};

const deleteStepService = async (id: number, userId:number) => {
  const step = await prisma.step.findUnique({
    where: { id },
    include: {
      recipe: {
        select: { userId: true },
      },
    },
  });
  if (!step) throw new Error("Step not found");
  if (step.recipe.userId !== userId) throw new Error("Forbidden");
  return await prisma.step.delete({
    where: {
      id,
    },
  });
};
export {
  addStepToRecipeService,
  updateStepService,
  deleteStepService,
};
