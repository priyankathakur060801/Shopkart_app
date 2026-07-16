import PDFDocument from "pdfkit";
import Order from "../models/Order.js";

export const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // User can download only their own invoice
    if (
      req.user.role !== "admin" &&
      order.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Invoice-${order._id}.pdf`,
    );

    doc.pipe(res);

    // ===============================
    // HEADER
    // ===============================

    doc.fontSize(26).fillColor("#1976d2").text("ShopKart", { align: "center" });

    doc
      .fontSize(18)
      .fillColor("black")
      .text("TAX INVOICE", { align: "center" });

    doc.moveDown();

    // ===============================
    // INVOICE DETAILS
    // ===============================

    doc.fontSize(12).fillColor("black");

    doc.text(`Invoice No : INV-${order._id.toString().slice(-8)}`);
    doc.text(`Order ID : ${order._id}`);
    doc.text(`Date : ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.text(`Payment Status : ${order.paymentStatus}`);
    doc.text(`Order Status : ${order.orderStatus}`);

    doc.moveDown();

    // ===============================
    // CUSTOMER DETAILS
    // ===============================

    doc.fontSize(15).fillColor("#1976d2").text("Customer Details");

    doc.moveDown(0.5);

    doc.fontSize(12).fillColor("black");

    doc.text(`Name : ${order.user.name}`);
    doc.text(`Email : ${order.user.email}`);

    if (order.shippingAddress) {
      doc.text(
        `Address : ${order.shippingAddress.address}, ${order.shippingAddress.city}`,
      );

      doc.text(
        `${order.shippingAddress.state} - ${order.shippingAddress.pincode}`,
      );
    }

    doc.moveDown();

    // ===============================
    // TABLE HEADER
    // ===============================

    const tableTop = doc.y;

    doc.rect(50, tableTop, 500, 25).fill("#1976d2");

    doc
      .fillColor("white")
      .fontSize(12)
      .text("Product", 60, tableTop + 7);

    doc.text("Qty", 300, tableTop + 7);

    doc.text("Price", 360, tableTop + 7);

    doc.text("Total", 470, tableTop + 7);

    doc.moveDown(2);

    let y = tableTop + 35;

    // ===============================
    // TABLE ROWS
    // ===============================

    doc.fillColor("black");

    order.items.forEach((item) => {
      doc.text(item.product.name, 60, y);

      doc.text(item.quantity.toString(), 300, y);

      doc.text(`₹${item.price}`, 360, y);

      doc.text(`₹${item.quantity * item.price}`, 470, y);

      y += 25;
    });

    // ===============================
    // TOTAL
    // ===============================

    y += 20;

    doc
      .fontSize(16)
      .fillColor("#1976d2")
      .text(`Grand Total : ₹${order.totalAmount}`, 330, y);

    // ===============================
    // FOOTER
    // ===============================

    doc.moveDown(5);

    doc
      .fontSize(11)
      .fillColor("gray")
      .text("Thank you for shopping with ShopKart!", {
        align: "center",
      });

    doc.text(
      "This is a computer generated invoice and does not require a signature.",
      {
        align: "center",
      },
    );

    doc.end();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Invoice generation failed",
    });
  }
};
