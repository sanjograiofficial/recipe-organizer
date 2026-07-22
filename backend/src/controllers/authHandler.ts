import type { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) throw new Error("Secret key undefined");

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        username: true,
        email: true,
      },
    });
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (e) {
    return res.status(400).json({
      message: "Failed to register user",
    });
  }
};
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user)
      return res.status(404).json({
        message: "Invalid email or password",
      });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({
        message: "Invalid email or password",
      });

    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: "3d",
    });
    const { password: _, ...safeUser } = user;

    res.status(200).json({
      success: true,
      data: safeUser,
      token: token,
      expiresIn: "3d",
    });
  } catch (e) {
    return res.status(401).json({
      message: "Failed to login",
    });
  }
};

export { registerUser, loginUser };
