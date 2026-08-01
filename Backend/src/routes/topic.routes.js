import { Router } from "express";

import {
  createTopic,
  getTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
} from "../controllers/topic.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import { getLessonsByTopic } from "../controllers/lesson.controller.js";

const router = Router();

router.get("/", getTopics);

router.get(
  "/:topicId/lessons",
  validateObjectId("topicId"),
  verifyJWT,
  getLessonsByTopic,
);

router.get("/:topicId", validateObjectId("topicId"), getTopicById);

router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin"),
  upload.single("thumbnail"),
  createTopic,
);

router.patch(
  "/:topicId",
  validateObjectId("topicId"),
  verifyJWT,
  authorizeRoles("admin"),
  upload.single("thumbnail"),
  updateTopic,
);

router.delete(
  "/:topicId",
  validateObjectId("topicId"),
  verifyJWT,
  authorizeRoles("admin"),
  deleteTopic,
);

export default router;
