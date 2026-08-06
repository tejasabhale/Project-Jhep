import { Router } from "express";

import {
  createLesson,
  deleteLesson,
  getLessonById,
  updateLesson,
  getLessonsByTopic,
  getAllLessons,
} from "../controllers/lesson.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", verifyJWT, getAllLessons);

router.get("/topic/:topicId", validateObjectId("topicId"), getLessonsByTopic);

router.get(
  "/:lessonId",
  validateObjectId("lessonId"),
  verifyJWT,
  getLessonById,
);

router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin", "owner"),
  upload.single("thumbnail"),
  validateObjectId("topicId", "body"),
  createLesson,
);

router.patch(
  "/:lessonId",
  verifyJWT,
  authorizeRoles("admin", "owner"),
  upload.single("thumbnail"),
  validateObjectId("lessonId"),
  updateLesson,
);

router.delete(
  "/:lessonId",
  verifyJWT,
  authorizeRoles("admin", "owner"),
  validateObjectId("lessonId"),
  deleteLesson,
);

export default router;
