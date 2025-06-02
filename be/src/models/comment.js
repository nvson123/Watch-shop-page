const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Liên kết đến người dùng
      required: true,
    },
    email: {
      type: String,
      required: false,
      select: false,
    },
    commentText: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Giá trị đánh giá từ 1 đến 5 sao
    },
    productSlug: {
      type: String,
      required: true, // Lưu slug của đơn hàng
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // Liên kết đến đơn hàng
      required: true, // Lưu ID của đơn hàng
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true, 
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Comment", commentSchema);