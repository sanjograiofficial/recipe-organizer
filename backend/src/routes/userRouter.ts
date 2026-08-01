import express, { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getMe,
  getUserById,
  updateUser,
  uploadProfile,
} from "../controllers/userHandler.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

import { fileURLToPath } from "node:url";
import path from "node:path";
import { file } from "zod";

const fileNamePath = fileURLToPath(import.meta.url);
const dirpath = path.dirname(fileNamePath);

const router = Router();

router.get("/", getAllUsers);
router.get("/me", authMiddleware, getMe);
router.get("/:id", getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

// profile upload
router.put(
  "/:id/profile",
  authMiddleware,
  upload.single("profile"),
  uploadProfile,
);

export default router;
