import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../controllers/cartController.js";
const router = express.Router();

router.post("/", protect, addToCart);

router.get("/", protect, getCart);
router.put("/:productId", protect, updateCartQuantity);

router.delete("/:productId", protect, removeFromCart);

export default router;
