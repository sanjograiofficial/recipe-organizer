import { Router } from "express";
import { deleteStep, updateStep } from "../controllers/stepHandler.js";

const router = Router();

router.put("/:id", updateStep);
router.delete("/:id", deleteStep);

export default router;
