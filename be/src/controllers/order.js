const Mail = require("../helpers/node-mailler");
const Order = require("../models/order");
const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const moment = require("moment");
const axios = require("axios");
require("dotenv").config();
const cron = require('node-cron');
const Coupon = require("../models/coupon");
const User = require("../models/user");
const { ObjectId } = require('mongodb');



const createOrder = async (req, res) => {
    try {
      const { userId, items, totalPrice, customerInfo, paymentMethod, shippingMessageDisplay, discount, couponCode } = req.body;
  
      const order = await Order.create({
        userId,
        items: items.map((item) => ({
          productId: item.productId,
          slug: item.slug || `product-${item.productId}`,  
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          color: item.variant?.color || item.color,
          size: item.variant?.size || item.size,
          weight: item.variant?.weight || item.weight,
          countInStock: item.variant?.countInStock || item.countInStock,
        })),
        totalPrice,
        customerInfo,
        paymentMethod,
        status: "pending", 
        paymentStatus: "cod", 
        shippingMessageDisplay,
        discount,
      });
  
      for (const item of items) {
        const product = await Product.findById(item.productId);
        const variant = product.variants.find((variant) => variant.sku === item.variantId);
        
        if (variant) {
          await Product.updateOne(
            { _id: item.productId, "variants.sku": item.variantId },
            { $inc: { "variants.$.countInStock": -item.quantity } },
            { new: true }
          );
        }
      }
  
      const user = await User.findById(userId);
      if (!user || !user.email) {
        throw new Error('User not found or email is missing.');
      }
  
      Mail.sendOrderConfirmation(user.email, order);
  
      if (couponCode) {
        const coupon = await Coupon.findOne({ code: couponCode });
        if (!coupon || !coupon.isActive || coupon.expirationDate < new Date()) {
          return res.status(400).json({ error: "Invalid or expired coupon code" });
        }
  
        coupon.usageCount += 1;
        coupon.usedBy.push(userId);
        await coupon.save();
      }
  
      return res.status(200).json({ 
        message: "Order created successfully", 
        orderId: order._id 
      });
  
    } catch (error) {
      console.error("Error creating order:", error.message);
      return res.status(500).json({ error: error.message });
    }
  };
  


const countOrdersByStatus = async () => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const orderCounts = {};
  orders.forEach((order) => {
    orderCounts[order._id] = order.count;
  });

  return orderCounts;
};

const getOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 1000,
      status,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const validStatuses = [
      "all-delivery",
      "all-complaint",
      "pending",
      "pendingPayment",
      "confirmed",
      "shipped",
      "received",
      "delivered",
      "canceled",
      "complaint",
      "refund_in_progress",
      "exchange_in_progress",
      "refund_completed",
      "exchange_completed",
      "canceled_complaint",
      "refund_initiated",
      "refund_done", 
      "all-refund", 
    ];

    const filter = {};

    if (status) {
      const statusArray = status
        .split(",")
        .map((s) => s.trim())
        .filter((s) => validStatuses.includes(s));
      if (statusArray.length > 0) {
        if (statusArray.includes("all-delivery")) {
          filter.status = {
            $in: ["pending", "pendingPayment", "shipped", "delivered", "received", "canceled"],
          };
        } else if (statusArray.includes("all-complaint")) {
          filter.status = {
            $in: ["complaint", "refund_in_progress", "exchange_in_progress", "refund_completed", "exchange_completed", "canceled_complaint"],
          };
        } else if (statusArray.includes("all-refund")) {
          filter.status = { $in: ["refund_initiated", "refund_done"] };
          filter.paymentMethod = "online"; 
        } else {
          filter.status = { $in: statusArray };
        }
      }
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(filter)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit));

    const totalOrders = await Order.countDocuments(filter);

    const orderCounts = await countOrdersByStatus();

    const totalDeliveredValue = await Order.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    const totalDeliveredAmount =
      totalDeliveredValue.length > 0 ? totalDeliveredValue[0].total : 0;

    return res.status(StatusCodes.OK).json({
      data: orders,
      meta: {
        totalItems: totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: Number(page),
        pageSize: Number(limit),
      },
      statusCounts: orderCounts,
      totalDeliveredAmount,
    });
  } catch (error) {
    console.error("Error in getOrders:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { userId, orderId } = req.params; // Lấy userId và orderId từ params

    // Tìm đơn hàng dựa trên orderId và userId
    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found or does not belong to the user" });
    }

    return res.status(StatusCodes.OK).json({ data: order });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};



const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 }) 

    if (!orders || orders.length === 0) {
      return res.status(StatusCodes.OK).json([]); 
    }

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!item.color || !item.size) {
          console.warn(`Order item missing color or size: ${item.name}`);
        }
      });
    });

    return res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    let { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      console.warn(`Order with id ${orderId} not found.`);
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }
    if ((status === "refund_completed" && order.status !== "refund_completed") || 
        (status === "canceled" && order.status !== "canceled")) {
      for (const item of order.items) {
        const product = await Product.findById(item.productId);

        if (product) {
          const variantIndex = product.variants.findIndex(
            (v) => v.color === item.color && v.size === item.size
          );

          if (variantIndex >= 0) {
            product.variants[variantIndex].countInStock += item.quantity;
          } else {
            product.countInStock += item.quantity;
          }

          await product.save();
        }
      } 
    }
    if (status === "delivered" && order.status !== "delivered") {
      order.paymentStatus = "pending";
    }
    if (status === "refund_done" && order.status !== "refund_done") {
      order.paymentStatus = "doneRefund";
    }
    if (status === "canceled" && order.status !== "canceled") {
      if(order.paymentMethod === 'online'){
        order.paymentStatus = "pendingRefund";
        status = 'refund_initiated'
      }
    }
    if (order.status !== status) {
      order.statusHistory.push(order.status);
      order.status = status;
      await order.save();
    }

    const Id = new ObjectId(order.userId);
    const user = await User.findOne({ _id: Id });

    if (!user || !user.email) {
      throw new Error('User not found or email is missing.');
    }
    
    const email = user.email;
    if (email) {
      await Mail.sendOrderStatusUpdate(email, order);
    } else {
      console.warn("Customer email not found. Skipping email notification.");
    }

    return res.status(StatusCodes.OK).json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const order = await Order.findOne({ _id: orderId });

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }
    if (!order.status === "pending") {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order delete successfully" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
const cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
    return res
      .status(400)
      .json({ message: "Thiếu hoặc sai định dạng orderId" });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        message: "Đơn hàng đã được xác nhận hoặc đang xử lý, không thể hủy",
      });
    }
    for (const item of order.items) {
      const product = await Product.findById(item.productId);

      if (product) {
        const variantIndex = product.variants.findIndex(
          (v) => v.color === item.color && v.size === item.size
        );

        if (variantIndex >= 0) {
          product.variants[variantIndex].countInStock += item.quantity;
        } else {
          product.countInStock += item.quantity;
        }

        await product.save(); 
      }
    }

    if (order.paymentMethod === "cod") {
      order.status = "canceled";
    } else if (order.paymentMethod === "online") {
      order.status = "refund_initiated";
      order.paymentStatus = "pendingRefund";
    }
    await order.save();
    if (order.customerInfo && order.customerInfo.email) {
      await Mail.sendOrderStatusUpdate(order.customerInfo.email, order);
    }

    res.status(200).json({ message: "Đơn hàng đã được hủy thành công", order });
  } catch (error) {
    console.error("Lỗi khi hủy đơn hàng:", error.message);
    res.status(500).json({
      message: "Có lỗi xảy ra khi hủy đơn hàng",
      error: error.message || error,
    });
  }
};

const confirmReceived = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only allow update if the status is 'received'
    if (order.status !== "received") {
      return res.status(400).json({
        message: "Only received orders can be confirmed as delivered",
      });
    }

    order.status = "delivered"; 
    order.paymentStatus = 'pending'
    await order.save();

    if (order.customerInfo && order.customerInfo.email) {
      console.log(`Sending status update email to ${order.customerInfo.email}`);
      await Mail.sendOrderStatusUpdate(order.customerInfo.email, order);
    } else {
      console.warn("Customer email not found. Skipping email notification.");
    }

    res.json({ message: "Order status updated to delivered" });
  } catch (error) {
    res.status(500).json({ message: "Error confirming order received" });
  }
};

const setDelivered = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Nếu trạng thái là "received" và chưa có `receivedAt`, thiết lập thời gian hiện tại
    if (order.status === "received" && !order.receivedAt) {
      order.receivedAt = new Date();
      console.log(
        `Đặt receivedAt cho đơn hàng ${order._id} là ${order.receivedAt}`
      );
    }

    // Cập nhật trạng thái thành "delivered" ngay khi người dùng xác nhận
    order.status = "delivered";
    await order.save();

    res.status(200).json({
      message: "Order status updated to delivered",
      order,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order to delivered", error });
  }
};
const returnOrder = async (req, res) => {
  const { orderId } = req.params; // Lấy orderId từ params
  const { reason } = req.body; // Lấy lý do từ body (loại hoàn trả không cần thiết nữa)

  try {
    const order = await Order.findById(orderId); // Tìm đơn hàng theo orderId

    // Nếu không tìm thấy đơn hàng
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    // Kiểm tra trạng thái của đơn hàng, chỉ cho phép khiếu nại nếu đã giao hoặc đã nhận
    if (order.status !== "delivered" && order.status !== "received") {
      return res.status(400).json({
        message: "Chỉ có thể khiếu nại đơn hàng đã giao hoặc đã nhận",
      });
    }

    // Cập nhật trạng thái đơn hàng thành "complainyt"
    order.status = "complaint";
    order.returnReason = reason; // Lưu lý do khiếu nại vào đơn hàng

    await order.save(); // Lưu lại thay đổi vào cơ sở dữ liệu

    // Trả về phản hồi thành công
    res.status(200).json({
      message: "Đơn hàng đã được xử lý với trạng thái khiếu nại thành công",
      order, // Trả lại thông tin đơn hàng đã cập nhật
    });
  } catch (error) {
    // Nếu có lỗi xảy ra
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi xử lý khiếu nại đơn hàng", error });
  }
};

const updateReturnReason = async (req, res) => {
  const { id } = req.params;
  const { returnReason, status } = req.body;

  // Kiểm tra định dạng id
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Thiếu hoặc sai định dạng id" });
  }

  try {
    const order = await Order.findById(id);

    // Kiểm tra nếu đơn hàng không tồn tại
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    // Kiểm tra lý do trả hàng
    if (!returnReason) {
      return res.status(400).json({ message: "Return reason is required." });
    }

    // Kiểm tra trạng thái có hợp lệ không
    if (!["complaint", "return_completed", "pendingPayment", "canceled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status for return." });
    }

    // Nếu trạng thái chuyển thành "canceled" và trước đó không phải "canceled"
   
    // Cập nhật trạng thái và lý do trả hàng
    order.returnReason = returnReason;
    order.status = status;

    // Thêm trạng thái mới vào lịch sử trạng thái
    order.statusHistory.push({ status, time: new Date() });

    await order.save();

    // Gửi email thông báo nếu cần
    if (order.customerInfo && order.customerInfo.email) {
      await Mail.sendOrderStatusUpdate(order.customerInfo.email, order);
    }
   
    
    res.status(200).json({
      message: "Order updated with return reason and status.",
      order,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error.message);
    res.status(500).json({
      message: "Có lỗi xảy ra khi cập nhật trạng thái đơn hàng",
      error: error.message || error,
    });
  }
};

cron.schedule('* * * * *', async () => {
  try {
    console.log("Cron job triggered at:", new Date());

    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 10 * 60 * 1000);

    // Tìm các đơn hàng có trạng thái 'pendingPayment' quá 1 phút
    const orders = await Order.find({
      status: 'pendingPayment',
      updatedAt: { $lt: oneMinuteAgo },
    });

    console.log("Orders to update:", orders.length);

    for (const order of orders) {
      console.log(`Processing order: ${order._id}`);

      // Tăng số lượng tồn kho cho các sản phẩm trong đơn hàng
      for (const item of order.items) {
        const product = await Product.findById(item.productId);

        if (product) {
          const variantIndex = product.variants.findIndex(
            (v) => v.color === item.color && v.size === item.size
          );

          if (variantIndex >= 0) {
            product.variants[variantIndex].countInStock += item.quantity;
            console.log(
              `Updated variant stock for product ${product._id}:`,
              product.variants[variantIndex]
            );
          } else {
            product.countInStock += item.quantity;
            console.log(
              `Updated main product stock for product ${product._id}:`,
              product.countInStock
            );
          }

          await product.save();
        } else {
          console.log(`Product not found for item: ${item.productId}`);
        }
      }

      order.status = 'canceled';
      order.statusHistory.push(JSON.stringify({ status: 'canceled', time: new Date() }));
      await order.save();

      console.log(`Order ${order._id} status updated to canceled.`);
    }
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});

const countSuccessfulOrders = async (req, res) => {
  try {
    const successfulOrdersCount = await Order.countDocuments({
      status: "delivered",
    });

    const totalDeliveredAmountResult = await Order.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, totalAmount: { $sum: "$totalPrice" } } },
    ]);

    const totalDeliveredAmount =
      totalDeliveredAmountResult[0]?.totalAmount || 0;

    return res.status(StatusCodes.OK).json({
      message: "Số lượng và tổng tiền của đơn hàng thành công",
      successfulOrders: successfulOrdersCount,
      totalDeliveredAmount,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
const getOrderByIdAdmin = async (req, res) => {
  try {
    const {  orderId } = req.params;
    const order = await Order.findOne({  _id: orderId });
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }
    return res.status(StatusCodes.OK).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getOrdersByUserIdWithOnlinePayment = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;  
    const skip = (page - 1) * limit;
    const totalOrders = await Order.countDocuments({ userId, paymentMethod: "online" }); 

    const orders = await Order.find({ userId, paymentMethod: "online" })
      .sort({ createdAt: -1 })
      .skip(skip) 
      .limit(Number(limit)); 
    if (!orders || orders.length === 0) {
      return res.status(StatusCodes.OK).json({ data: [], meta: { totalItems: 0, totalPages: 0, currentPage: 1, pageSize: 10 } });
    }

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!item.color || !item.size) {
          console.warn(`Order item missing color or size: ${item.name}`);
        }
      });
    });

    const totalPages = Math.ceil(totalOrders / limit);

    return res.status(StatusCodes.OK).json({
      data: orders,
      meta: {
        totalItems: totalOrders,
        totalPages: totalPages,
        currentPage: Number(page),
        pageSize: Number(limit),
      },
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  getOrderById,
  confirmReceived,
  getOrders,
  updateOrder,
  deleteOrder,
  createOrder,
  getOrdersByUserId,
  cancelOrder,
  setDelivered,
  returnOrder,
  updateReturnReason,
  countSuccessfulOrders,
  getOrderByIdAdmin,
  getOrdersByUserIdWithOnlinePayment,
};