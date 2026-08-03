import express from "express";
import {
  getAdminStats,
  getUserActivity,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/stats", verifyJWT, authorizeRoles("admin"), getAdminStats);
router.get("/activity", verifyJWT, authorizeRoles("admin"), getUserActivity);

export default router;
