const express = require("express");
const { upload } = require("../config/multer");
const {
  addPost,
  getAllPosts,
  getPostBySlug,
  getRelatedPostsByTag,
  deletePost,
  uploadBlog,
} = require("../controllers/blog");
const router = express.Router();

// Middleware để parse JSON
router.use(express.json()); // Giúp parse req.body

// Đổi từ GET sang POST cho thêm bài viết
router.post(`/posts`, addPost);
router.post(`/upload-thumbnail-blog`, upload.single("thumbnail"), uploadBlog);
router.get(`/posts`, getAllPosts);
router.get(`/detailblog/:slug`, getPostBySlug);
router.get(`/relatedposts/:tag`, getRelatedPostsByTag);
router.delete(`/posts/:postId`, deletePost);
module.exports = router;