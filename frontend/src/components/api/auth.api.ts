import { api } from "./client";

export const register = (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const login = (data: { email: string; password: string }) => {
  return api("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
