import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", verifyJWT, authorizeRoles("admin", "owner"), getAllUsers);

router.post("/", verifyJWT, authorizeRoles("admin", "owner"), createUser);

router.patch("/:userId", verifyJWT, authorizeRoles("admin", "owner"), updateUser);

router.delete("/:userId", verifyJWT, authorizeRoles("admin", "owner"), deleteUser);

export default router;
