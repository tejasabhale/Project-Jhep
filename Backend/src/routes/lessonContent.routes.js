import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";
import {
  createLessonContent,
  deleteLessonContent,
  getAllLessonContents,
  getLessonContentById,
  getLessonContents,
  updateLessonContent,
} from "../controllers/lessonContent.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin"),
  upload.single("file"),
  validateObjectId("lesson", "body"),
  createLessonContent,
);

router.get("/", verifyJWT, authorizeRoles("admin"), getAllLessonContents);

router.get(
  "/:lessonId",
  validateObjectId("lessonId"),
  verifyJWT,
  getLessonContents,
);

router.patch(
  "/:contentId",
  verifyJWT,
  authorizeRoles("admin"),
  validateObjectId("contentId"),
  upload.single("file"),
  updateLessonContent,
);

router.get(
  "/content/:contentId",
  validateObjectId("contentId"),
  verifyJWT,
  getLessonContentById,
);

router.delete(
  "/:contentId",
  verifyJWT,
  authorizeRoles("admin"),
  validateObjectId("contentId"),
  deleteLessonContent,
);

export default router;
