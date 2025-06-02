import instance from '@/api/axiosIntance';
import { QUERY_KEY } from '@/data/stores/key.ts'; // Đảm bảo bạn có query key cho bài viết
import { toast } from '@medusajs/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useBlogMutation = () => {
  const queryClient = useQueryClient();

  const createPost = useMutation({
  mutationFn: (data: {
    title: string;
    content: string;
    author: string;
    tags: string[];
    thumbnail: string;
    slug: string;
    createdAt: string; // Changed to string to ensure ISO format
    updatedAt: string; // Changed to string to ensure ISO format
  }) => instance.post<{ id: string }>('/posts', data),

  onSuccess: async (result, variables, context) => {
    toast.success('Tạo bài viết thành công', {
      description: 'Bài viết đã được tạo thành công',
      duration: 1000,
    });

    // Invalidate the query to refetch the list of posts
    await queryClient.invalidateQueries([QUERY_KEY.FETCH_POSTS]);

    // Điều hướng sau khi bài viết được tạo thành công
    
  },

  onError: (error) => {
    const message = error.response?.data?.message || 'Lỗi không xác định';
    toast.error(`Lỗi khi tạo bài viết: ${message}`);
    console.error('Chi tiết lỗi:', error);
  },
});


  // Xóa bài viết
  const deletePost = useMutation({
    mutationFn: async (_id: string) => {
      try {
        // Gửi yêu cầu DELETE để xóa bài viết
        return await instance.delete(`/posts/${_id}`);
      } catch (error) {
        throw new Error('Lỗi gọi API');
      }
    },
    onSuccess: async () => {
      toast.success('Xóa bài viết thành công', {
        description: 'Bài viết đã được xóa thành công',
        duration: 1000,
      });

      // Sau khi xóa thành công, làm mới lại danh sách bài viết
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FETCH_POSTS], // Đảm bảo rằng bạn có query key cho bài viết
      });
    },
    onError: error => {
      toast.error(`Lỗi khi xóa bài viết: ${error.message}`);
    },
  });

  return { createPost, deletePost };
};

export default useBlogMutation;
