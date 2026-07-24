import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import asyncHandler from "../middleware/asyncHandler.js";
import type { Prisma } from "../generated/prisma/client.js";
import {
  deleteUserService,
  getAllUsersService,
  getMeService,
  getUserByIdService,
  updateUserService,
} from "../service/user.service.js";

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await getAllUsersService();
  res.status(200).json({
    message: "All users fetched",
    data: users,
  });
});

const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const id = req.user.id;
  const user = await getMeService(Number(id));
  res.status(200).json({
    message: "User fetched successfully",
    data: user,
  });
});
const getUserById = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const { id } = req.params;
  const user = await getUserByIdService(Number(id));
  res.status(200).json({
    message: "User fetched successfully",
    data: user,
  });
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const id = req.user.id;
  const { username, email, password } = req.body;
  const updateData: Prisma.UserUpdateInput = {};

  if (username !== undefined) {
    updateData.username = username;
  }

  if (email !== undefined) {
    updateData.email = email;
  }

  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: "No fields provided to update",
    });
  }

  const user = await updateUserService(Number(id), updateData);

  return res.status(200).json({
    message: "User updated successfully",
    data: user,
  });
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const id = req.user.id;
  const user = await deleteUserService(Number(id));
  res.status(200).json({
    message: "User deleted successfully",
    data: user,
  });
});

export { getAllUsers, getMe, getUserById, updateUser, deleteUser };
