import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/api/axiosIntance';
import { useNavigate } from '@tanstack/react-router';
import { toast } from '@medusajs/ui';
import { useSocket } from '../socket/useSocket';
import { useEffect } from 'react';

const useCheckoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const socket = useSocket();

  const createOrder = useMutation({
    mutationFn: data => instance.post('/orders', data),

    onSuccess: async result => {
      const { data } = result;

      // Gửi sự kiện đến server
      socket.emit('admin-update-product', data);

      // Kiểm tra phản hồi nếu là URL
      if (typeof data === 'string' && data.includes('http')) {
        location.href = data;
      } else {
        const { orderId } = data;
        if (!orderId) {
          console.error('Order ID is missing in the response.');
          return;
        }
        await queryClient.invalidateQueries({ queryKey: ['cart'] });
        navigate({
          to: '/thanks',
          search: {
            status: '1',
            apptransid: `${orderId}-thanks`,
          },
        });
      }
    },

    onError: error => {
      toast.error(`Checkout failed: ${error.message}`);
    },
  });

  useEffect(() => {
    // Lắng nghe phản hồi từ server
    const handleProductUpdated = updatedProduct => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    };

    socket.on('product-updated', handleProductUpdated);

    // Hủy lắng nghe khi component bị unmount
    return () => {
      socket.off('product-updated', handleProductUpdated);
    };
  }, [socket, queryClient]);

  const updateOrderStatus = useMutation({
    mutationFn: ({ orderId, status }) =>
      instance.put(`/orders/${orderId}`, { status }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
    },

    onError: error => {
      toast.error(`Failed to update status: ${error.message}`);
    },
  });

  return { createOrder, updateOrderStatus };
};

export default useCheckoutMutation;
