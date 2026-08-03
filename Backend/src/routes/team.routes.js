import { Router } from "express";

import {
  createTeamMember,
  getAllTeamMembers,
  getAllTeamMembersAdmin,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/team.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", getAllTeamMembers);

router.get("/admin", verifyJWT, authorizeRoles("admin"), getAllTeamMembersAdmin);

router.get("/:teamId", verifyJWT, authorizeRoles("admin"), getTeamMemberById);

router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin"),
  upload.single("photo"),
  createTeamMember,
);

router.put(
  "/:teamId",
  verifyJWT,
  authorizeRoles("admin"),
  upload.single("photo"),
  updateTeamMember,
);

router.delete("/:teamId", verifyJWT, authorizeRoles("admin"), deleteTeamMember);

export default router;
