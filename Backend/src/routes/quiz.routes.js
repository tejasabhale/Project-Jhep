import { Router } from "express";

import {
  createQuiz,
  getQuizByLesson,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quiz.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

const router = Router();

router.post(
  "/:lessonId",
  verifyJWT,
  authorizeRoles("admin"),
  validateObjectId("lessonId"),
  createQuiz,
);

router.get(
  "/:lessonId",
  verifyJWT,
  validateObjectId("lessonId"),
  getQuizByLesson,
);

router.patch(
  "/:lessonId",
  verifyJWT,
  authorizeRoles("admin"),
  validateObjectId("lessonId"),
  updateQuiz,
);

router.delete(
  "/:lessonId",
  verifyJWT,
  authorizeRoles("admin"),
  validateObjectId("lessonId"),
  deleteQuiz,
);

export default router;
