import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

import { addQuiz, updateQuiz } from "../controllers/quiz.controller.js";

const router = Router();

router.post(
  "/:lessonId",
  verifyJWT,
  authorizeRoles("admin"),
  validateObjectId("lessonId"),
  addQuiz,
);

router.patch(
  "/:lessonId",
  verifyJWT,
  authorizeRoles("admin"),
  validateObjectId("lessonId"),
  updateQuiz,
);

export default router;
