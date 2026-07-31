import express, { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getMe,
  getUserById,
  updateUser,
} from "../controllers/userHandler.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { uploadImage } from "../controllers/uploadHandler.js";

import { fileURLToPath } from "node:url";
import path from "node:path";
import { file } from "zod";

const fileNamePath = fileURLToPath(import.meta.url);
const dirpath = path.dirname(fileNamePath);

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/me", authMiddleware, getMe);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

// profile upload
router.post("/profile", upload.single("profile"), uploadImage);
router.use("/profile/img", express.static(path.join(dirpath, "..", '/uploads/profile')));

export default router;
