import Order from "../models/Order.js";
import { sendOrderEmail, sendOrderConfirmationEmail } from "../utils/emailService.js";

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      status: "processing",
    });

    const createdOrder = await order.save();

    const customerEmail =
      shippingAddress?.email ||
      req.user?.email ||
      null;

    console.log("=== CREATE ORDER EMAIL DEBUG ===");
    console.log("shippingAddress.email:", shippingAddress?.email);
    console.log("req.user.email:", req.user?.email);
    console.log("customerEmail selected:", customerEmail);

    if (customerEmail) {
      sendOrderEmail(createdOrder, customerEmail);
    } else {
      console.log("❌ No customer email found — email not sent");
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Confirm an order by admin
// @route   PUT /api/orders/:id/confirm
// @access  Private/Admin
export const confirmOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = "confirmed";

    const confirmedOrder = await order.save();

    const customerEmail =
      confirmedOrder.shippingAddress?.email ||
      confirmedOrder.user?.email ||
      null;

    console.log("=== CONFIRM ORDER EMAIL DEBUG ===");
    console.log("shippingAddress.email:", confirmedOrder.shippingAddress?.email);
    console.log("user.email:", confirmedOrder.user?.email);
    console.log("customerEmail selected:", customerEmail);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS set:", !!process.env.EMAIL_PASS);

    if (customerEmail) {
      try {
        await sendOrderConfirmationEmail(confirmedOrder, customerEmail);
        console.log("✅ Email successfully sent to:", customerEmail);
      } catch (emailError) {
        console.error("❌ Email send failed:", emailError.message);
      }
    } else {
      console.warn("❌ No customer email found for order:", confirmedOrder._id);
    }

    res.json(confirmedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/user/my-orders
// @access  Private
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = async (req, res) => {
  try {
    console.log("=== DELETE ORDER API CALL ===");
    console.log("Received ID parameter:", req.params.id);
    const order = await Order.findById(req.params.id);
    if (!order) {
      console.log("❌ Order not found for ID:", req.params.id);
      return res.status(404).json({ message: "Order not found" });
    }
    await Order.findByIdAndDelete(req.params.id);
    console.log("✅ Order deleted successfully:", req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting order:", error.message);
    res.status(500).json({ message: error.message });
  }
};