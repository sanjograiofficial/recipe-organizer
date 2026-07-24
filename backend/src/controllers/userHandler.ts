import type { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import { hasSubscribers } from "node:diagnostics_channel";

const getAllUsers = async (req: Request, res: Response) => {
  try {
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
  } catch (e) {
    res.status(400).json({
      message: "Failed to fetch users",
      error: e,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      message: "Failed to fetch user",
      error: e,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.user?.id;
  const { username, email, password } = req.body;
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username,
        email,
        password: hashedPassword!,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
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
  } catch (e) {
    res.status(400).json({
      message: "Failed to delete user",
      error: e,
    });
  }
};

export { getAllUsers, getUserById, updateUser, deleteUser };
