import instance from '@/api/axiosIntance';
import { toast } from '@medusajs/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../stores/key';

const useCommentMutation = () => {
  const queryClient = useQueryClient();

  // Thêm bình luận
  const createComment = useMutation({
    mutationFn: (data: {
      userId: string;
      productId: string;
      content: string;
      rating: number; // Thêm rating vào dữ liệu gửi đi
    }) => instance.post('/comments', data),

    onSuccess: async response => {
      const { productId } = response.data; // Lấy productId từ phản hồi
      // Refresh comments data cho sản phẩm
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FETCH_COMMENT_BY_PRODUCT, productId],
      });

      return response;
    },
    onError: (error: any) => {
      // Xử lý lỗi từ backend
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Unknown error occurred';

      // Kiểm tra các lỗi đặc biệt từ backend (khi người dùng chưa mua sản phẩm)
      if (
        error?.response?.data?.message ===
        'You must purchase the product before commenting'
      ) {
        toast.error('You must purchase the product before commenting.', {
          description:
            'Please ensure that you have bought the product before leaving a comment.',
        });
      } else if (error?.response?.data?.message === 'Missing required fields') {
        toast.error('Missing required fields.', {
          description: 'Please make sure all required fields are filled.',
        });
      } else {
        toast.error(` ${errorMessage}`, {
          description: 'Please try again later.',
        });
      }
    },
  });

  // Xóa bình luận
  const removeComment = useMutation({
    mutationFn: (commentId: string) => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage (hoặc sessionStorage nếu dùng)

      if (!token) {
        throw new Error('No token found');
      }

      return instance.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
        },
      });
    },

    onSuccess: async response => {
      const { productId } = response.data; // Truy cập productId từ dữ liệu phản hồi
      toast.success('Comment deleted successfully!', {
        description: 'Your comment has been deleted.',
        duration: 1000,
      });

      // Refresh comments data cho sản phẩm
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FETCH_COMMENT_BY_PRODUCT, productId],
      });

      return response;
    },
    onError: (error: any) => {
      toast.error(`Error deleting comment: ${error.message}`, {
        description: 'Please try again later.',
      });
    },
  });
  const removeCommentByAdmin = useMutation({
    mutationFn: (commentId: string) => {
      console.log('Comment ID to delete:', commentId); // Log ID trước khi gọi API
      return instance.delete(`/comments/${commentId}/admin`);
    },

    onSuccess: async response => {
      const { productId } = response.data || {};
      console.log('Response from server:', response.data); // Log phản hồi từ server

      if (productId) {
        toast.success('Comment deleted successfully!', {
          description: 'Your comment has been deleted.',
          duration: 1000,
        });

        // Refresh comments data cho sản phẩm
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.FETCH_COMMENT_BY_PRODUCT, productId],
        });
      } else {
        console.warn('Product ID missing in response.');
      }
      return response;
    },

    onError: (error: any) => {
      console.error('Error deleting comment:', error); // Log lỗi nếu xảy ra
      toast.error(`Error deleting comment: ${error.message}`, {
        description: 'Please try again later.',
      });
    },
  });

  return { createComment, removeComment, removeCommentByAdmin };
};

export default useCommentMutation;
