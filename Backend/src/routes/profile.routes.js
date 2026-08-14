import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  changePassword,
  getCurrentUser,
  updateProfile,
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/me", verifyJWT, getCurrentUser);
router.patch("/update", verifyJWT, updateProfile);
router.patch("/change-password", verifyJWT, changePassword)

export default router;