import { Router } from "express";

import {
  createTestimonial,
  getAllTestimonials,
  getAllTestimonialsForAdmin,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus,
} from "../controllers/testimonial.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", getAllTestimonials);

router.get(
  "/admin/all",
  verifyJWT,
  authorizeRoles("admin", "owner"),
  getAllTestimonialsForAdmin,
);

router.get("/:id", getTestimonialById);

router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin", "owner"),
  createTestimonial,
);

router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles("admin", "owner"),
  updateTestimonial,
);

router.patch(
  "/:id/toggle-status",
  verifyJWT,
  authorizeRoles("admin", "owner"),
  toggleTestimonialStatus,
);

router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles("admin", "owner"),
  deleteTestimonial,
);

export default router;
