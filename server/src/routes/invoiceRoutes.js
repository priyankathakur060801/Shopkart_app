import express from "express";
import { downloadInvoice } from "../controllers/invoiceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Download Invoice
router.get("/:id", protect, downloadInvoice);

export default router;
