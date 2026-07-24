import type { NextFunction, Request, Response } from "express";
import { Prisma } from "../generated/prisma/client.js";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2025":
        return res.status(404).json({
          success: false,
          message: "Record not found",
        });

      case "P2002":
        return res.status(409).json({
          success: false,
          message: "A record with this value already exists",
        });

      default:
        return res.status(400).json({
          success: false,
          message: err.message,
        });
    }
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export default errorHandler;
