import express from "express";
import User from "../models/User.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getDashboard,
  getUsers,
  updateUserRole,
} from "../controllers/adminController.js";

const router = express.Router();

router.get(
"/dashboard",
protect,
admin,
getDashboard
);
router.get("/users", protect, admin, getUsers);
router.put("/users/:id", protect, admin, updateUserRole);

export default router;
