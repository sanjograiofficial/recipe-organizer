import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) throw new Error("Secret key undefined");

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({
      message: "Token is missing",
    });

  if (!authHeader.startsWith("Bearer "))
    return res.status(401).json({
      message: "Invalid token",
    });
  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      message: "Token is missing",
    });
  try {
    const decoded = jwt.verify(token, secretKey) as { id: number };
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware