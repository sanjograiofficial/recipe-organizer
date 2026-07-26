import { api } from "./client";

export const getRecipes = () => {
  return api("/recipes");
};

export const getRecipeById = (id: number) => {
  return api(`/recipes/${id}`);
};

export const createRecipe = (data: unknown) => {
  return api("/recipes", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateRecipe = (id: number, data: unknown) => {
  return api(`/recipes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteRecipe = (id: number) => {
  return api(`/recipes/${id}`, {
    method: "DELETE",
  });
};
