const Order = require("../models/order");
const mongoose = require("mongoose");
require("dotenv").config();

const updatePaymentStatus = async (req, res) => {
  let { orderId, paymentStatus } = req.body;

  if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ message: "Invalid or missing Order ID" });
  }

  orderId = new mongoose.Types.ObjectId(orderId);
  console.log("orderId", orderId);

  if (!["paid", "pending", "failed", "pendingPayment"].includes(paymentStatus)) {
    return res.status(400).json({ message: "Invalid paymentStatus value" });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = paymentStatus;

    if (paymentStatus === "pending") {
      order.status = "pending";
    } else if (paymentStatus === "failed") {
      order.status = "pendingPayment";
    }

    await order.save();

    return res.status(200).json({
      message: `Order ${orderId} updated successfully`,
      order,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  updatePaymentStatus,
};
