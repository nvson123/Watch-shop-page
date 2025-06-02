const Post = require("../models/blog");
const CreateSlugByTitle = require("../config/slug");
const addPost = async (req, res) => {
  try {
    // Lấy dữ liệu từ req.body
    const { title, content, author, tags, thumbnail } = req.body;

    // Kiểm tra xem dữ liệu bắt buộc có đủ không
    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ message: "Title, content, and author are required." });
    }

    // Tạo slug từ title
    const slug = CreateSlugByTitle(title);

    // Tạo đối tượng bài viết mới
    const post = new Post({
      title,
      content,
      author,
      tags, // Mảng tags nếu có
      thumbnail, // Ảnh đại diện nếu có
      slug, // Slug tự tạo từ tiêu đề
      createdAt: new Date(), // Tạo thời gian hiện tại
      updatedAt: new Date(), // Lưu thời gian chỉnh sửa gần nhất
    });

    // Lưu bài viết vào cơ sở dữ liệu
    const data = await post.save();

    // Trả về phản hồi thành công
    return res.status(201).json({
      message: "Tạo bài viết thành công",
      data,
    });
  } catch (error) {
    // Trả về lỗi nếu có
    return res
      .status(500)
      .json({ message: error.message || "Có lỗi xảy ra khi tạo bài viết." });
  }
};
const getAllPosts = async (req, res) => {
  try {
    // Lấy tất cả bài viết từ cơ sở dữ liệu
    const posts = await Post.find(); // Có thể thêm điều kiện lọc nếu cần

    // Kiểm tra nếu không có bài viết nào
    if (!posts || posts.length === 0) {
      return res.status(404).json({
        message: "Không có bài viết nào được tìm thấy.",
      });
    }

    // Trả về danh sách bài viết
    return res.status(200).json({
      message: "Lấy danh sách bài viết thành công.",
      data: posts,
    });
  } catch (error) {
    // Trả về lỗi nếu có
    return res.status(500).json({
      message: error.message || "Có lỗi xảy ra khi lấy danh sách bài viết.",
    });
  }
};
const getPostBySlug = async (req, res) => {
  try {
    // Lấy slug từ tham số URL
    const { slug } = req.params;

    // Tìm bài viết theo slug trong cơ sở dữ liệu
    const post = await Post.findOne({ slug: req.params.slug });

    // Kiểm tra nếu không tìm thấy bài viết
    if (!post) {
      return res.status(404).json({
        message: "Bài viết không tồn tại.",
      });
    }

    // Trả về chi tiết bài viết
    return res.status(200).json({
      message: "Lấy chi tiết bài viết thành công.",
      data: post,
    });
  } catch (error) {
    // Trả về lỗi nếu có
    return res.status(500).json({
      message: error.message || "Có lỗi xảy ra khi lấy chi tiết bài viết.",
    });
  }
};
const getRelatedPostsByTag = async (req, res) => {
  try {
    // Lấy tag từ tham số URL hoặc body
    const { tag } = req.params;

    // Tìm các bài viết có thẻ tương tự trong cơ sở dữ liệu
    const relatedPosts = await Post.find({ tags: tag }).limit(5); // Giới hạn số lượng bài viết liên quan

    // Kiểm tra nếu không tìm thấy bài viết nào có thẻ tương tự
    if (relatedPosts.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy bài viết liên quan.",
      });
    }

    // Trả về danh sách bài viết liên quan
    return res.status(200).json({
      message: "Lấy các bài viết liên quan thành công.",
      data: relatedPosts,
    });
  } catch (error) {
    // Trả về lỗi nếu có
    return res.status(500).json({
      message: error.message || "Có lỗi xảy ra khi lấy bài viết liên quan.",
    });
  }
};
const deletePost = async (req, res) => {
  try {
    // Lấy id bài viết từ URL
    const { postId } = req.params;

    // Tìm và xóa bài viết trong cơ sở dữ liệu
    const post = await Post.findByIdAndDelete(postId);

    // Kiểm tra nếu bài viết không tồn tại
    if (!post) {
      return res.status(404).json({
        message: "Bài viết không tồn tại.",
      });
    }

    // Trả về thông báo thành công
    return res.status(200).json({
      message: "Bài viết đã được xóa thành công.",
    });
  } catch (error) {
    // Trả về lỗi nếu có
    return res.status(500).json({
      message: error.message || "Có lỗi xảy ra khi xóa bài viết.",
    });
  }
};
const uploadBlog = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json(file.path);
};

module.exports = {
  addPost,
  getAllPosts,
  getPostBySlug,
  getRelatedPostsByTag,
  deletePost,
  uploadBlog,
};