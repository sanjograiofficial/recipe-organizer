import z from "zod";

const content = z
  .string()
  .min(3, "Content should be at least 3 characters long")
  .max(64, "Content shouldn't exceed 64 characters");
const order = z.coerce.number().int().nonnegative();

export const addStepValidationSchema = z.object({
  order,
  content,
});

export const updateSteptValidationSchema = z.object({
  order: order.optional(),
  content: content.optional(),
});
