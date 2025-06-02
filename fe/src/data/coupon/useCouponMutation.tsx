import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from '@medusajs/ui';
import instance from '@/api/axiosIntance';

const useCouponMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Tạo mã giảm giá
  const createCoupon = useMutation({
    mutationFn: (data: {
      code: string;
      discount: number;
      minOrder: number;
      expirationDate: string;
      startDate: string | null; 
      maxDiscountAmount: number | null;
      isActive: boolean;
      isFreeShipping: boolean;
    }) => instance.post<{ id: string }>('/create-coupon', data),
  
    onSuccess: async (result) => {
      toast.success('Create successful', {
        description: 'Create coupon successful',
        duration: 1000,
      });
  
      await queryClient.invalidateQueries({
        queryKey: ['coupon'],
      });
  
      void navigate({
        to: '/dashboard/coupon',
      });
  
      return result;
    },
    onError: (error) => {
      toast.error(`Error creating coupon: ${error.message}`);
    },
  });
  

  // Xóa mã giảm giá
  const deleteCoupon = useMutation({
    mutationFn: async (_id: string) => {
      try {
        return await instance.delete(`/delete-coupon/${_id}`);
      } catch (error) {
        throw new Error('API call failed');
      }
    },
    onSuccess: async () => {
      toast.success('Delete successful', {
        description: 'Delete coupon successful',
        duration: 1000,
      });

      await queryClient.invalidateQueries({
        queryKey: ['coupon'],
      });
    },
    onError: (error) => {
      toast.error(`Error deleting coupon: ${error.message}`);
    },
  });

  // Chỉnh sửa mã giảm giá
  const editCoupon = useMutation({
    mutationFn: async (data: {
      _id: string;
      code: string;
      discount: number;
      expirationDate: string;
      startDate: string; // Thêm startDate
      maxDiscountAmount?: number; // Thêm maxDiscountAmount (không bắt buộc)
      minOrder?: number; // Thêm minOrder (không bắt buộc)
      isActive: boolean;
      isFreeShipping: boolean;
    }) => {
      const { _id, ...updateData } = data; // Tách _id để sử dụng trong URL
      try {
        const response = await instance.put(`/update-coupon/${_id}`, updateData);
        console.log("Response data:", response.data); // Log phản hồi từ API để debug
        return response.data;
      } catch (error: any) {
        console.error("Error updating coupon:", error.response?.data || error.message);
        throw error; // Ném lỗi để trigger onError
      }
    },
    onSuccess: () => {
      toast.success("Coupon updated successfully");
      queryClient.invalidateQueries({
        queryKey: ['coupon'],
      }); 
    },
    onError: (error: any) => {
      toast.error(`Error updating coupon: ${error.response?.data?.error || error.message}`);
    },
  });  
  
  return { createCoupon, deleteCoupon, editCoupon };
};

export default useCouponMutation;
