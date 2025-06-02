// routers/comment.js
const express = require("express");
const { addComment, getCommentsByProduct, deleteComment, deleteCommentByAdmin, checkReviewedProducts } = require("../controllers/comment");
const authMiddleware = require("../middleware/authComment");
const router = express.Router();

// Thêm bình luận mới
router.post("/comments", addComment);

// Lấy bình luận theo sản phẩm
router.get("/comments/product/:productId", getCommentsByProduct);

// Xóa bình luận
router.delete('/comments/:commentId', authMiddleware, deleteComment);
router.delete('/comments/:commentId/admin', deleteCommentByAdmin);
router.post('/comments/check-reviewed', checkReviewedProducts);

module.exports = router;