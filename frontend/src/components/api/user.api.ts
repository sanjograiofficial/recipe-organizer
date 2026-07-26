import { api } from "./client";

export const getCurrentUser = () => api("/users/me");

export const updateCurrentUser = (data: unknown) =>
  api("/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteCurrentUser = () =>
  api("/users/me", {
    method: "DELETE",
  });
