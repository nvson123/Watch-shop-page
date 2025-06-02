// Định nghĩa kiểu Comment
type User = {
    _id: string;
    name: string;
    email: string;
  };
  
  type Comment = {
    _id: string;
    user: User; // Thông tin người dùng để lại bình luận
    productId: string; // ID của sản phẩm mà bình luận thuộc về
    content: string; // Nội dung bình luận
    rating: number; // Đánh giá (nếu có thể)
    createdAt: string; // Thời gian tạo bình luận
    updatedAt: string; // Thời gian cập nhật bình luận (nếu có)
    status: 'active' | 'inactive' | 'deleted'; // Trạng thái bình luận
  };
  
  // Cập nhật kiểu API trả về để tương thích với Comment
  type CommentResponse = {
    data: Comment[];
    status: number;
  };