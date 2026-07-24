import type { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import { hasSubscribers } from "node:diagnostics_channel";
import asyncHandler from "../middleware/asyncHandler.js";
import type { Prisma } from "../generated/prisma/client.js";

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      role: true,
    },
  });
  res.status(200).json({
    message: "All users fetched",
    data: users,
  });
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const id = req.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
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

  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: updateData,
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

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
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
    select: {
      username: true,
      email: true,
      role: true,
    },
  });
  res.status(200).json({
    message: "User deleted successfully",
    data: user,
  });
});

export { getAllUsers, getUserById, updateUser, deleteUser };
