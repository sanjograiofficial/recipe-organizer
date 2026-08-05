import type { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  LoginUserValidationSchema,
  registerUserValidationSchema,
} from "../validators/userValidator.js";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) throw new Error("Secret key undefined");

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  // zod validation
  const { username, email, password } = registerUserValidationSchema.parse(
    req.body,
  );

  // password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  // check if a user with that email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  // create user with that email
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
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  // zod validation
  const { email, password } = LoginUserValidationSchema.parse(req.body);

  // check if the user with that email exists or not
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user)
    return res.status(404).json({
      message: "Invalid email or password",
    });

  // user exists, now checking if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({
      message: "Invalid email or password",
    });

  // generate a token for the logged in user
  const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
    expiresIn: "3d",
  });

  // remove password from user when giving response for security
  const { password: _, ...safeUser } = user;

  res.status(200).json({
    success: true,
    data: safeUser,
    token: token,
    expiresIn: "3d",
  });
});

export { registerUser, loginUser };
