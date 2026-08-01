import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

import {
  createLessonContent,
  getLessonContents,
  getLessonContentById,
  updateLessonContent,
  deleteLessonContent,
} from "../controllers/adminContent.controller.js";

const router = Router();

router.use(verifyJWT);
router.use(verifyAdmin);

router.post("/", createLessonContent);

router.get("/", getLessonContents);

router.get("/:id", getLessonContentById);

router.patch("/:id", updateLessonContent);

router.delete("/:id", deleteLessonContent);

export default router;
