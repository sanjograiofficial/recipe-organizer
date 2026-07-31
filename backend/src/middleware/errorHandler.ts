// middleware/errorHandler.ts
import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma/client.js";
import { ZodError } from "zod";
import multer from "multer";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  // Prisma Known Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(409).json({
          success: false,
          message: `Duplicate value for ${err.meta?.target}`,
        });

      case "P2025":
        return res.status(404).json({
          success: false,
          message: "Record not found",
        });

      case "P2003":
        return res.status(400).json({
          success: false,
          message: "Foreign key constraint failed",
        });

      default:
        return res.status(400).json({
          success: false,
          message: err.message,
        });
    }
  }

  // Prisma Validation Error
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      message: "Invalid Prisma query",
    });
  }

  // Zod Validation Error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Multer Error
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
      code: err.code,
    });
  }

  // Custom App Error
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Unknown Error
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
export default errorHandler;
