import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const { shippingAddress } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,

      name: item.product.name,

      price: item.product.price,

      quantity: item.quantity,

      image: item.product.images[0],
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      user: userId,

      items: orderItems,

      shippingAddress,

      totalAmount,
    });

    // Clear cart after order creation

    cart.items = [];

    await cart.save();

    res.status(201).json({
      message: "Order created successfully",

      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged In User Orders

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("items.product")
      .sort({
        createdAt: -1,
      });

    res.json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Order

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin Get All Orders

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({
      createdAt: -1,
    });

    res.json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin Update Order Status

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = req.body.status;

    await order.save();

    res.json({
      message: "Order status updated",

      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
