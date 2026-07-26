import { api } from "./client";

export const addStep = (recipeId: number, data: unknown) =>
  api(`/recipes/${recipeId}/steps`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateStep = (id: number, data: unknown) =>
  api(`/steps/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteStep = (id: number) =>
  api(`/steps/${id}`, {
    method: "DELETE",
  });
