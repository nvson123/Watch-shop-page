import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/api/axiosIntance';
import { toast } from '@medusajs/ui';

const useCartMutation = () => {
  const queryClient = useQueryClient();
  const addItemToCart = useMutation({
    mutationFn: (data: {
      userId: string;
      products: { productId: string; variantId: string; quantity: number }[];
    }) => instance.post('/cart/add-to-cart', data),

    onSuccess: () => {
      toast.success('Đã thêm sản phẩm vào giỏ hàng', {
        description: 'Sản phẩm của bạn đã được thêm vào giỏ hàng thành công!',
        duration: 100,
      });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      toast.error(`Có lỗi xảy ra: ${error.message}`, {
        description: 'Không thể thêm sản phẩm vào giỏ hàng, vui lòng thử lại.',
        duration: 2000,
      });
    },
  });

  const deleteItemFromCart = useMutation({
    mutationFn: ({
      userId,
      variantIds,
    }: {
      userId: string;
      variantIds: string[];
    }) =>
      instance.delete(`/cart/${userId}/product`, {
        data: { variantIds },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      toast.error(`Có lỗi xảy ra: ${error.message}`, {
        description: 'Không thể xóa sản phẩm khỏi giỏ hàng, vui lòng thử lại.',
        duration: 2000,
      });
    },
  });

  const updateQuantity = useMutation({
    mutationFn: (data: {
      userId: string;
      productId: string;
      variantId: string;
      quantity: number;
    }) => instance.patch('/cart/update-quantity', data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error || error.message || 'Có lỗi xảy ra';
      const errorDescription =
        error?.response?.data?.description ||
        'Không thể cập nhật số lượng, vui lòng thử lại.';
      toast.error(errorMessage, {
        description: errorDescription,
        duration: 2000,
      });
    },
  });

  const increaseQuantity = useMutation({
    mutationFn: (data: {
      userId: string;
      productId: string;
      variantId: string;
    }) => instance.patch('/cart/increase-quantity', data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Không thể tăng số lượng sản phẩm, vui lòng thử lại.';

      // Hiển thị thông báo lỗi
      toast.error(`Có lỗi xảy ra: ${errorMessage}`, {
        description: 'Không thể tăng số lượng sản phẩm, vui lòng thử lại.',
        duration: 2000,
      });

      // Nếu server trả về lỗi vượt quá số lượng tồn kho, làm mới lại giỏ hàng
      if (error?.response?.status === 400) {
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      }
    },
  });

  const decreaseQuantity = useMutation({
    mutationFn: (data: {
      userId: string;
      productId: string;
      variantId: string;
      confirm: boolean;
    }) => instance.patch('/cart/decrease-quantity', data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: error => {
      console.error(error);
    },
  });

  return {
    addItemToCart,
    deleteItemFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
  };
};

export default useCartMutation;
