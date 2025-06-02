import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@medusajs/ui';
import instance from '@/api/axiosIntance';

const useCustomerMutation = () => {
  const queryClient = useQueryClient();

  const createCustomer = useMutation({
    mutationFn: async data => {
      return instance.post('/create-customer', data);
    },
    onSuccess: async () => {
      toast.success('Thêm thông tin địa chỉ thành công!', {
        description: 'Thông tin địa chỉ đã được thêm thành công.',
        duration: 1000,
      });
      await queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: error => {
      toast.error(`Lỗi khi thêm địa chỉ: ${error.message}`);
    },
  });

  const editCustomer = useMutation({
    mutationFn: async data => {
      const { id, userId, ...updateData } = data;
      return instance.put(`/edit-customer/${id}/${userId}`, updateData);
    },
    onSuccess: async () => {
      toast.success('Cập nhật thông tin địa chỉ thành công!', {
        duration: 1000,
      });
      await queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: error => {
      toast.error(`Lỗi khi cập nhật thông tin địa chỉ: ${error.message}`);
    },
  });

  // Xóa khách hàng
  const deleteCustomer = useMutation({
    mutationFn: async ({ id }) => {
      return instance.delete(`/delete-customer/${id}`);
    },
    onSuccess: async () => {
      toast.success('Xóa thông tin địa chỉ thành công!', {
        description: 'Thông tin địa chỉ đã được xoá thành công',
        duration: 1000,
      });
      await queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: error => {
      toast.error(`Lỗi khi xóa địa chỉ: ${error.message}`);
    },
  });

  return { createCustomer, editCustomer, deleteCustomer };
};

export default useCustomerMutation;
