const { default: mongoose } = require("mongoose");
const Comment = require("../models/comment");
const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

const addComment = async (req, res) => {
  const { commentText, rating, userId, productSlug, orderId, ProductId } = req.body;

  // Kiểm tra các trường bắt buộc
  if (!productSlug || !commentText || !rating || !userId || !orderId || !ProductId) {
    return res.status(400).json({ message: "Thiếu các trường bắt buộc" });
  }

  try {
    // Kiểm tra xem người dùng có bình luận cho sản phẩm trong đơn hàng này chưa
    const existingComment = await Comment.findOne({ userId, orderId, productSlug });
    if (existingComment) {
      return res.status(400).json({ message: 'Bạn đã bình luận cho đơn hàng này rồi' });
    }

    // Kiểm tra xem người dùng và đơn hàng có tồn tại không
    const user = await User.findById(userId);
    const order = await Order.findById(orderId);
    const productId = await Product.findById(ProductId);

    if (!user || !order) {
      return res.status(404).json({ message: "Không tìm thấy người dùng hoặc đơn hàng" });
    }

    // Kiểm tra trạng thái của đơn hàng (phải là 'delivered' hoặc 'received')
    if (!["delivered", "received"].includes(order.status)) {
      return res.status(400).json({ message: "Bạn cần nhận đơn hàng trước khi bình luận" });
    }

    // Kiểm tra xem sản phẩm có trong đơn hàng hay không
    const product = order.items.find(item => item.slug === productSlug);
    if (!product) {
      return res.status(400).json({ message: "Sản phẩm này không có trong đơn hàng" });
    }

    // Tạo bình luận mới
    const newComment = new Comment({ 
      userId,
      commentText,
      rating,
      productSlug,  
      orderId,   
      productId,             
    });

    await newComment.save();

    res.status(201).json({
      message: "Bình luận đã được thêm thành công!",
      orderSlug: productSlug,  
      orderId: orderId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Không thể thêm bình luận" });
  }
};
 
const getCommentsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const comments = await Comment.find({ productId })
      .populate({
        path: "userId",
        select: "username email",
      });

    if (!comments || comments.length === 0) {
      return res.status(404).json({
        message: "Không có bình luận nào cho sản phẩm này",
      });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách bình luận",
      error: error.message,
    });
  }
}; 
const checkReviewedProducts = async (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      message: 'Payload không hợp lệ. Cần có mảng chứa orderId và productSlugs.',
    });
  }

  try {
    // Tìm các sản phẩm đã được đánh giá
    const reviewedProducts = await Comment.find({
      $or: data.map(item => ({
        orderId: item.orderId,
        productSlug: { $in: item.productSlugs },
      })),
    }).select('orderId productSlug -_id'); // Chỉ lấy orderId và productSlug

    res.status(200).json({
      message: 'Danh sách sản phẩm đã được đánh giá',
      reviewedProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Lỗi khi kiểm tra sản phẩm đã được đánh giá',
      error: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId, role } = req.user;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: "ID bình luận không hợp lệ" });
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Không tìm thấy bình luận" });
    }
 
    if (comment.userId.toString() !== userId && role !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền xóa bình luận này" });
    }

    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({ message: "Xóa bình luận thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa bình luận:", error);
    return res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};
 
const deleteCommentByAdmin = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Không tìm thấy bình luận" });
    }

    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({ message: "Xóa bình luận thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa bình luận:", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

module.exports = {
  addComment,
  getCommentsByProduct,
  deleteComment,
  deleteCommentByAdmin,
  checkReviewedProducts
};