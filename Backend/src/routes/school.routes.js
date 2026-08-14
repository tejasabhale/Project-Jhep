import { Router } from "express";

import {
  createSchool,
  getAllSchools,
  getAllSchoolsForAdmin,
  getSchoolById,
  updateSchool,
  deleteSchool,
  toggleSchoolStatus,
} from "../controllers/school.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", getAllSchools);

router.get(
  "/admin/all",
  verifyJWT,
  authorizeRoles("admin", "owner"),
  getAllSchoolsForAdmin,
);

router.get("/:id", getSchoolById);

router.post("/", verifyJWT, authorizeRoles("admin", "owner"), createSchool);

router.patch("/:id", verifyJWT, authorizeRoles("admin", "owner"), updateSchool);

router.patch(
  "/:id/toggle-status",
  verifyJWT,
  authorizeRoles("admin", "owner"),
  toggleSchoolStatus,
);

router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles("admin", "owner"),
  deleteSchool,
);

export default router;
