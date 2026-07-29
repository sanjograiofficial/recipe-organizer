import z from "zod";

const title = z
  .string()
  .min(3, "Title should be at least 3 characters long")
  .max(64, "Title shouldn't exceed 64 characters");
const description = z
  .string()
  .min(3, "Desciption should be at least 3 characters long")
  .max(64, "Desciption shouldn't exceed 64 characters")
  .optional();
const prepTime = z.coerce.number().int().nonnegative().optional();
const cookTime = z.coerce.number().int().nonnegative().optional();
const servings = z.coerce.number().int().nonnegative().optional();
const difficulty = z.enum(["EASY", "MEDIUM", "HARD"]).optional();
const category = z
  .enum(["BREAKFAST", "LUNCH", "DINNER", "DESSERT", "SNACKS", "DRINKS"])
  .optional();

export const createRecipeValidationSchema = z.object({
  title,
  description,
  prepTime,
  cookTime,
  servings,
  difficulty,
  category,
});

export const updateRecipeValidationSchema = z.object({
  title: title.optional(),
  description,
  prepTime,
  cookTime,
  servings,
  difficulty,
  category,
});
