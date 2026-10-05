import { Router } from "express";

import {
  createQuiz,
  getQuizByLesson,
  getQuizById,
  submitQuiz,
  getAllQuizzes,
  getQuizByIdAdmin,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quiz.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = Router();

// Student
router.get("/lesson/:lessonId", verifyJWT, getQuizByLesson);

// Admin & Content Management
router.get(
  "/admin",
  verifyJWT,
  authorizeRoles("admin", "owner", "content_creator"),
  getAllQuizzes,
);

router.get(
  "/admin/:quizId",
  verifyJWT,
  authorizeRoles("admin", "owner", "content_creator"),
  validateObjectId("quizId"),
  getQuizByIdAdmin,
);

router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin", "owner", "content_creator"),
  createQuiz,
);

router.patch(
  "/:quizId",
  verifyJWT,
  authorizeRoles("admin", "owner", "content_creator"),
  validateObjectId("quizId"),
  updateQuiz,
);

router.put(
  "/:quizId",
  verifyJWT,
  authorizeRoles("admin", "owner", "content_creator"),
  validateObjectId("quizId"),
  updateQuiz,
);

router.delete(
  "/:quizId",
  verifyJWT,
  authorizeRoles("admin", "owner", "content_creator"),
  validateObjectId("quizId"),
  deleteQuiz,
);

// Student - Submit Quiz
router.post(
  "/:quizId/submit",
  verifyJWT,
  validateObjectId("quizId"),
  submitQuiz,
);

// Student - Get Published Quiz
router.get("/:quizId", verifyJWT, validateObjectId("quizId"), getQuizById);

export default router;
