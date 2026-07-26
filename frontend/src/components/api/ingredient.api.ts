import { api } from "./client";

export const addIngredient = (recipeId: number, data: unknown) =>
  api(`/recipes/${recipeId}/ingredients`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateIngredient = (id: number, data: unknown) =>
  api(`/ingredients/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteIngredient = (id: number) =>
  api(`/ingredients/${id}`, {
    method: "DELETE",
  });
