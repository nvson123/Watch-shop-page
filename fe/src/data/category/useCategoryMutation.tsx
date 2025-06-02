import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/data/stores/key.ts';
import instance from '@/api/axiosIntance';
import { toast } from '@medusajs/ui';
import { useNavigate } from '@tanstack/react-router';

// Hook để thực hiện CRUD cho danh mục
const useCategoryMutation = (
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Tạo danh mục (Create Category)
  const createCategory = useMutation({
    mutationFn: (data: Category) => instance.post('/categories', data),

    onSuccess: async result => {
      toast.success('Create successful', {
        description: 'Create category successful!',
        duration: 1000,
      });

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FETCH_CATEGORIES],
      });

      void navigate({
        to: '/dashboard/category',
      });

      return result;
    },
  });

  // Cập nhật danh mục (Update Category)
  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Category }) =>
      instance.put(`/categorys/${id}`, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FETCH_CATEGORIES],
      });
    },
  });

  // Xóa danh mục (Delete Category)
  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      // 1. Lấy danh mục gốc
      const rootCategory = await instance.get('/categories/danh-muc-goc-a');
      if (!rootCategory?.data?._id) {
        throw new Error("Không tìm thấy danh mục gốc!");
      }
      if (id === rootCategory.data._id) {
        throw new Error("Không thể xóa danh mục gốc!");
      }
      const updateResult = await instance.put(`/categories/update-products`, {
        categoryId: id,
        newCategoryId: rootCategory.data._id,
      });
  
      if (!updateResult || updateResult.status !== 200) {
        throw new Error("Cập nhật sản phẩm về danh mục gốc thất bại!");
      }
  
      return instance.delete(`/categorys/${id}`);
    },

    onSuccess: async () => {
      toast.success("Xóa danh mục thành công!");
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FETCH_CATEGORIES],
      });
    },
  
    // 6. Xử lý lỗi
    onError: (error) => {
      console.error("Lỗi khi xóa danh mục:", error);
  
      if (error.message === "Không thể xóa danh mục gốc!") {
        toast.error(error.message);
      } else if (error.response?.status === 404) {
        toast.error("Không tìm thấy danh mục cần xóa!");
      } else if (error.response?.status === 500) {
        toast.error("Lỗi máy chủ, vui lòng thử lại sau!");
      } else {
        toast.error("Xóa danh mục thất bại!");
      }
    },
  });
  ; 

  return { createCategory, updateCategory, deleteCategory };
};

export default useCategoryMutation;
