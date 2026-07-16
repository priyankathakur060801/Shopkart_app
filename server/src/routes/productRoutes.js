import express from "express";

import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ================= PUBLIC ROUTES =================

// Get all products
router.get("/", getProducts);

// Get single product
router.get("/:id", getProduct);

// ================= ADMIN ROUTES =================

// Add product
router.post("/", protect, admin, upload.array("images", 5), addProduct);
// Update product
router.put("/:id", protect, admin, upload.array("images", 5), updateProduct);
// Delete product
router.delete("/:id", protect, admin, deleteProduct);

export default router;
