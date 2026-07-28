import z from "zod";

const name = z
  .string()
  .min(3, "Name should be at least 3 characters long")
  .max(64, "Name shouldn't exceed 64 characters");
const quantity = z.string();

export const addIngredientValidationSchema = z.object({
  name,
  quantity,
});

export const updateIngredientValidationSchema = z.object({
  name: name.optional(),
  quantity: quantity.optional(),
});
