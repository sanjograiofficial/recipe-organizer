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
import { idValidator } from "../validators/idValidator.js";
import { UpdateUserValidationSchema } from "../validators/userValidator.js";

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await getAllUsersService();
  if (users.length == 0)
    return res.status(404).json({
      message: "No users found",
    });
  res.status(200).json({
    message: "All users fetched",
    data: users,
  });
});

const getMe = asyncHandler(async (req: Request, res: Response) => {
  // check if user is logged in and has payload
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // get id from payload
  const id = req.user.id;

  // fetch current user
  const user = await getMeService(Number(id));
  res.status(200).json({
    message: "User fetched successfully",
    data: user,
  });
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  // zod validation
  const id = idValidator.parse(req.params.id);

  // check if user is logged in and has payload
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // get user by id
  const user = await getUserByIdService(Number(id));
  res.status(200).json({
    message: "User fetched successfully",
    data: user,
  });
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  // check if user is logged in and has payload
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  // get id from payload
  const id = req.user.id;

  // zod validation
  const { username, email, password } = UpdateUserValidationSchema.parse(
    req.body,
  );

  // create updateData object to store updated fields
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

  // throw error if no field updated
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: "No fields provided to update",
    });
  }

  // update user
  const user = await updateUserService(Number(id), updateData);

  return res.status(200).json({
    message: "User updated successfully",
    data: user,
  });
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  // check if user is logged in and has payload
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // get id from payload
  const id = req.user.id;

  // delete user
  const user = await deleteUserService(Number(id));
  res.status(200).json({
    message: "User deleted successfully",
    data: user,
  });
});

export { getAllUsers, getMe, getUserById, updateUser, deleteUser };
