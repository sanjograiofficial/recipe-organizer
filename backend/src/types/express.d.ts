import "express";
import type { Roles } from "../generated/prisma/enums.ts";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      role: Roles;
    };
  }
}
