import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User create order
router.post("/", protect, createOrder);

// User get own orders
router.get("/myorders", protect, getMyOrders);
// Admin get all orders
router.get("/admin/all", protect, admin, getAllOrders);

// Admin update order status
router.put("/admin/:id", protect, admin, updateOrderStatus);

// Get single order
router.get("/:id", protect, getOrderById);



export default router;
