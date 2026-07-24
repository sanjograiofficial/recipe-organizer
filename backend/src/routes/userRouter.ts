import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userHandler.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router
