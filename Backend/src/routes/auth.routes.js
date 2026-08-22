import { Router } from "express";
import {
  forgotPassword,
  getSession,
  login,
  logout,
  refreshAccessToken,
  register,
  resendOtp,
  resetPassword,
  verifyOtp,
} from "../controllers/auth.controller.js";
import {
  authRateLimiter,
  forgotPasswordLimiter,
  loginRateLimiter,
  resetPasswordLimiter,
} from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/session", getSession);
router.post("/refresh-access-token", refreshAccessToken);
router.post("/resend-otp", resendOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
